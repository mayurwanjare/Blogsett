import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadPost, updatePost, uploadPostImage } from "../services/post-services";
import { loadAllCategories } from "../services/category-service";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Spinner, FormFeedback } from "reactstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const UpdatePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [post, setPost] = useState({
    title: "",
    content: "",
    category: { categoryId: "" }
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    // Fetch categories
    loadAllCategories().then(data => setCategories(data));
    // Fetch post data
    loadPost(postId)
      .then(data => {
        setPost({
          title: data.title,
          content: data.content,
          category: { categoryId: data.category?.categoryId || "" }
        });
        setPreviewImage(data.imageName ? `/api/posts/image/${data.imageName}` : "");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load post");
        setLoading(false);
      });
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      setPost(prev => ({
        ...prev,
        category: { categoryId: value }
      }));
    } else {
      setPost(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleContentChange = (newContent) => {
    setPost(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = {};
    if (!post.title) errs.title = "Title is required";
    if (!post.content) errs.content = "Content is required";
    if (!post.category.categoryId) errs.category = "Category is required";
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      updatePost(postId, post)
        .then((updated) => {
          // If image is selected, upload it
          if (image) {
            uploadPostImage(image, postId)
              .then(() => {
                toast.success("Post updated successfully!");
                navigate("/user/dashboard");
              })
              .catch(() => {
                toast.error("Post updated but image upload failed");
                navigate("/user/dashboard");
              });
          } else {
            toast.success("Post updated successfully!");
            navigate("/user/dashboard");
          }
        })
        .catch(() => toast.error("Failed to update post"));
    }
  };

  return (
    <Base>
      <div style={{ minHeight: "90vh", background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)", paddingTop: "40px" }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow border-0" style={{ borderRadius: "18px" }}>
                <CardBody>
                  <h2 style={{ fontWeight: 700, color: "#764ba2" }}>Update Blog Post</h2>
                  {loading ? (
                    <div className="text-center my-5">
                      <Spinner color="primary" />
                    </div>
                  ) : (
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label for="title">Title</Label>
                        <Input
                          type="text"
                          id="title"
                          name="title"
                          value={post.title}
                          onChange={handleChange}
                          invalid={!!errors.title}
                          placeholder="Enter post title"
                          style={{ borderRadius: "8px", padding: "12px" }}
                        />
                        <FormFeedback>{errors.title}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label for="category">Category</Label>
                        <Input
                          type="select"
                          id="category"
                          name="categoryId"
                          value={post.category.categoryId}
                          onChange={handleChange}
                          invalid={!!errors.category}
                          style={{ borderRadius: "8px", padding: "12px" }}
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => (
                            <option value={cat.categoryId} key={cat.categoryId}>{cat.categoryTitle}</option>
                          ))}
                        </Input>
                        <FormFeedback>{errors.category}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label for="content">Content</Label>
                        <JoditEditor
                          ref={editor}
                          value={post.content}
                          tabIndex={1}
                          onBlur={handleContentChange}
                        />
                        {errors.content && <div className="invalid-feedback d-block">{errors.content}</div>}
                      </FormGroup>
                      <FormGroup>
                        <Label for="image">Post Image</Label>
                        <Input
                          type="file"
                          id="image"
                          name="image"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                        {previewImage && (
                          <div className="mt-2">
                            <img
                              src={previewImage}
                              alt="Preview"
                              style={{ maxWidth: "200px", borderRadius: "8px" }}
                            />
                          </div>
                        )}
                      </FormGroup>
                      <div className="text-center mt-4">
                        <Button
                          color="primary"
                          style={{ borderRadius: "8px", padding: "10px 32px", fontWeight: 600 }}
                          type="submit"
                        >
                          Update Post
                        </Button>
                        <Button
                          color="secondary"
                          style={{ borderRadius: "8px", padding: "10px 32px", fontWeight: 600, marginLeft: "16px" }}
                          type="button"
                          onClick={() => navigate("/user/dashboard")}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default UpdatePost;