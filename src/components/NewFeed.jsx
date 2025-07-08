import React, { useEffect, useState } from 'react'
import { loadAllPosts, loadAllPostsByCategory } from '../services/post-services';
import { loadAllCategories } from '../services/category-service';
import { Button, Col, Row, Input, FormGroup, Label } from 'reactstrap';
import Post from './Post';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

function NewFeed() {
    const pageSize = 5;

    const [postContent, setPostContent] = useState({
        content: [],
        totalPage: '',
        totalElements: '',
        lastPage: false,
        pageNumber: 0
    });

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load categories
        loadAllCategories().then(data => setCategories(data));
        // Load initial posts
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        setLoading(true);
        loadAllPosts(0, pageSize).then((data) => {
            setPostContent({
                ...data,
                content: data.content
            });
            setLoading(false);
        }).catch((error) => {
            toast.error("Error in loading posts from server");
            setLoading(false);
        });
    };

    const fetchPostsByCategory = (categoryId, pageNumber = 0) => {
        setLoading(true);
        loadAllPostsByCategory(categoryId, pageNumber, pageSize).then((data) => {
            setPostContent({
                ...data,
                content: data.content,
                pageNumber: data.pageNumber
            });
            setLoading(false);
        }).catch((error) => {
            toast.error("Error in loading posts by category");
            setLoading(false);
        });
    };

    const handleCategoryChange = (e) => {
        const catId = e.target.value;
        setSelectedCategory(catId);
        if (catId === "") {
            fetchPosts();
        } else {
            fetchPostsByCategory(catId, 0);
        }
    };

    const changePageInfinite = () => {
        if (selectedCategory) {
            // Category pagination
            const nextPage = postContent.pageNumber + 1;
            loadAllPostsByCategory(selectedCategory, nextPage, pageSize).then((data) => {
                setPostContent(prev => ({
                    ...data,
                    content: [...prev.content, ...data.content]
                }));
            }).catch(error => {
                toast.error("Error in loading posts by category");
            });
        } else {
            // All posts pagination
            const nextPage = postContent.pageNumber + 1;
            loadAllPosts(nextPage, pageSize).then((data) => {
                setPostContent(prev => ({
                    ...data,
                    content: [...prev.content, ...data.content]
                }));
            }).catch(error => {
                toast.error("Error in loading posts");
            });
        }
    }

    return (
        <div className="container-fluid">
            <Row>
                <Col md={{ size: 10, offset: 1 }} >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1>
                            Blogs Count (
                            {postContent
                                ? postContent.totalElements || postContent.totalElement || postContent.content.length || 0
                                : 0}
                            )
                        </h1>
                        <Button color="warning" outline style={{fontSize:"1rem",padding:"8px 18px"}} href="/user/dashboard">
  Create Your Blog
</Button>
                    </div>
                    <FormGroup className="mb-4">
                        <Label for="categorySelect" style={{ fontWeight: 600 }}>Filter by Category</Label>
                        <Input
                            type="select"
                            id="categorySelect"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option value={cat.categoryId} key={cat.categoryId}>{cat.categoryTitle}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <h3 className="text-muted">Latest Blogs</h3>
                    {loading ? (
                        <div className="text-center my-5">
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <InfiniteScroll
                            dataLength={postContent.content ? postContent.content.length : 0}
                            next={changePageInfinite}
                            hasMore={!postContent.lastPage}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                            className="post-list"
                        >
                            {
                                postContent && postContent.content && postContent.content.length > 0 ? (
                                    postContent.content.map((post) => (
                                        <Post {...post} key={post.id} />
                                    ))
                                ) : (
                                    <div className="text-center text-muted my-5">No posts found.</div>
                                )
                            }
                        </InfiniteScroll>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default NewFeed