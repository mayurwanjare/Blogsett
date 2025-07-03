import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap";
import Base from "../components/Base";
import { useState, useEffect } from "react";
import { createComment, loadPost } from "../services/post-services";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";
import { isLoggedIn } from "../auth";
import { FaUserCircle } from 'react-icons/fa';


const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState({ content: '' });

    

    useEffect(() => {
        loadPost(postId)
            .then(data => {
                setPost(data);
            }).catch(error => {
                toast.error("Error loading post");
            });
    }, [postId]);

    const printDate = (numbers) => {
        return new Date(numbers).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const submitPost = () => {
        if (!isLoggedIn()) {
            toast.error("You need to login to add a comment");
            return;
        }
        if (comment.content.trim() === '') {
            toast.error("Comment cannot be empty");
            return;
        }
        createComment(comment, postId)
            .then(data => {
                toast.success("Comment added...");
                setComment({ content: '' });
                loadPost(postId)
                    .then(updatedPost => setPost(updatedPost))
                    .catch(() => toast.error("Error reloading post"));
            }).catch(() => {
                toast.error("Error adding comment");
            });
    };

    return (
        <Base>
            <Container className="mt-4">
                <div className="mb-3">
                    <Link to="/" className="text-decoration-none text-primary fw-bold">Home</Link>
                    {post && (
                        <>
                            <span className="mx-2 text-muted">/</span>
                            <span className="fw-semibold">{post.title}</span>
                        </>
                    )}
                </div>
                <Row>
                    <Col md={{ size: 10, offset: 1 }}>
                        <Card className="mt-3 shadow border-0" style={{ borderRadius: '18px', background: '#f9f9f9' }}>
                            {post && (
                                <CardBody>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div>
                                            <span className="badge bg-primary me-2">{post.category.categoryTitle}</span>
                                            <span className="text-muted" style={{ fontSize: '0.95rem' }}>
                                                {printDate(post.addedDate)}
                                            </span>
                                        </div>
                                        <span className="text-muted" style={{ fontSize: '0.95rem' }}>
                                            Posted by <b>{post.user.name}</b>
                                        </span>
                                    </div>
                                    <h1 className="mb-3" style={{ fontWeight: 700, color: "#2d2d2d" }}>{post.title}</h1>
                                    <div className="image-container my-4 text-center" style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
                                        <img
                                            src={BASE_URL + '/post/image/' + post.imageName}
                                            alt={post.title}
                                            className="img-fluid"
                                            style={{ width: '100%', objectFit: 'cover', maxHeight: '350px' }}
                                        />
                                    </div>
                                    <CardText
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                        className="mt-4"
                                        style={{ fontSize: '1.15rem', color: '#444', lineHeight: 1.7 }}
                                    />
                                </CardBody>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col md={{ size: 8, offset: 2 }}>
                        <h3 className="mb-4 text-primary">Comments ({post ? post.comments.length : 0})</h3>
                        {post && post.comments.length === 0 && (
                            <Card className="mb-3 border-0 shadow-sm">
                                <CardBody>
                                    <CardText className="text-muted">No comments yet. Be the first to comment!</CardText>
                                </CardBody>
                            </Card>
                        )}
                        {post && post.comments.map((c, index) => (
    <Card className="mb-3 border-0 shadow-sm" key={index} style={{ borderLeft: '4px solid #ffc107' }}>
        <CardBody className="d-flex align-items-start">
            <FaUserCircle size={36} className="me-3" color="#6c757d" />
            <div>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: '#2d2d2d' }}>
                    {c.user?.name || "Anonymous"}
                </div>
                <CardText style={{ fontSize: '1.05rem', marginTop: '2px' }}>
                    {c.content}
                </CardText>
            </div>
        </CardBody>
    </Card>
))}
                        <Card className="mt-4 border-0 shadow-sm">
                            <CardBody>
                                <Input
                                    type="textarea"
                                    placeholder="Write a comment..."
                                    value={comment.content}
                                    onChange={(event) => setComment({ content: event.target.value })}
                                    style={{ minHeight: '80px', fontSize: '1.05rem' }}
                                />
                                <Button onClick={submitPost} className="mt-3 px-4" color="primary">
                                    Add Comment
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default PostPage;