import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost'
import { Container, Row, Col, Card, CardBody, Spinner, Button, Badge } from 'reactstrap'
import { loadAllPostsByUser, deletePost } from '../../services/post-services'
import { getCurrentUserDetail } from '../../auth'
import Post from '../../components/Post'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Userdashboard = () => {
  const [userPosts, setUserPosts] = useState({
    content: [],
    totalElements: 0,
    lastPage: false,
    pageNumber: 0
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserPosts = () => {
    const user = getCurrentUserDetail();
    if (user && user.id) {
      setLoading(true);
      loadAllPostsByUser(user.id, 0, 5).then(data => {
        setUserPosts(data);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchUserPosts();
    // eslint-disable-next-line
  }, []);

  // Delete post handler
  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(postId)
        .then(() => {
          toast.success("Post deleted successfully!");
          fetchUserPosts();
        })
        .catch(() => toast.error("Failed to delete post"));
    }
  };

  // Redirect to UpdatePost page
  const handleEdit = (postId) => {
    navigate(`/update-post/${postId}`);
  };

  return (
    <Base>
      <div
        style={{
          minHeight: "90vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)",
          paddingTop: "40px",
          paddingBottom: "40px"
        }}
      >
        <Container>
          {/* Welcome Section */}
          <Row className="justify-content-center mb-4">
            <Col md={10}>
              <Card className="shadow border-0" style={{ borderRadius: "18px", background: "#fff6e9" }}>
                <CardBody className="d-flex flex-column flex-md-row align-items-center justify-content-between">
                  <div>
                    <h2 style={{ fontWeight: 700, color: "#764ba2" }}>Welcome Back, <span style={{ color: "#ff9800" }}>{getCurrentUserDetail()?.name || "User"}</span>!</h2>
                    <p className="text-muted mb-0">
                      Ready to share your next story or update your blogs?
                    </p>
                  </div>
                  <div className="mt-3 mt-md-0">
                    <Badge color="primary" pill style={{ fontSize: "1.1rem", padding: "12px 20px" }}>
                      Total Blogs: {userPosts.content ? userPosts.content.length : 0}
                    </Badge>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Add Post Section */}
          <Row className="justify-content-center mb-4">
            <Col md={8}>
              <Card className="shadow border-0" style={{ borderRadius: "18px" }}>
                <CardBody>
                  <h4 style={{ fontWeight: 600, color: "#764ba2" }}>Create a New Blog Post</h4>
                  <AddPost />
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* User Blogs Section */}
          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="shadow border-0" style={{ borderRadius: "18px" }}>
                <CardBody>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h4 style={{ fontWeight: 600, color: "#333" }}>Your Recent Blogs</h4>
                    <Button
                      color="success"
                      outline
                      size="sm"
                      onClick={fetchUserPosts}
                      style={{ borderRadius: "8px" }}
                    >
                      Refresh
                    </Button>
                  </div>
                  {loading ? (
                    <div className="text-center my-5">
                      <Spinner color="primary" />
                    </div>
                  ) : userPosts.content && userPosts.content.length > 0 ? (
                    userPosts.content.map(post => (
                      <Card key={post.postId} className="mb-4 shadow-sm border-0" style={{ borderRadius: "14px" }}>
                        <CardBody>
                          <Post {...post} />
                          <div className="d-flex justify-content-end mt-2">
                            <Button
                              color="danger"
                              size="sm"
                              className="me-2"
                              style={{ borderRadius: "6px" }}
                              onClick={() => handleDelete(post.postId)}
                            >
                              Delete
                            </Button>
                            <Button
                              color="primary"
                              size="sm"
                              style={{ borderRadius: "6px" }}
                              onClick={() => handleEdit(post.postId)}
                            >
                              Edit
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center text-muted my-5">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                        alt="No Blogs"
                        style={{ width: "90px", opacity: 0.7, marginBottom: "12px" }}
                      />
                      <div>You haven't posted any blogs yet.</div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  )
}

export default Userdashboard