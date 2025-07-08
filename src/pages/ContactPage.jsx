import React, { useState } from "react";
import Base from "../components/Base";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e, field) => {
    setContact({ ...contact, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    let errs = {};
    if (!contact.name) errs.name = "Name is required";
    if (!contact.email) errs.email = "Email is required";
    if (!contact.message) errs.message = "Message is required";
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      toast.success("Thank you for contacting us!");
      setContact({ name: "", email: "", message: "" });
    }
  };

  return (
    <Base>
      <div style={{ minHeight: "90vh", background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)", paddingTop: "40px" }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={7}>
              <Card className="shadow border-0" style={{ borderRadius: "18px" }}>
                <CardBody>
                  <h2 className="text-center mb-4" style={{ color: "#764ba2", fontWeight: 700 }}>Contact Us</h2>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        type="text"
                        id="name"
                        value={contact.name}
                        onChange={e => handleChange(e, "name")}
                        invalid={!!errors.name}
                        placeholder="Enter your name"
                        style={{ borderRadius: "8px", padding: "12px" }}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        value={contact.email}
                        onChange={e => handleChange(e, "email")}
                        invalid={!!errors.email}
                        placeholder="Enter your email"
                        style={{ borderRadius: "8px", padding: "12px" }}
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="message">Message</Label>
                      <Input
                        type="textarea"
                        id="message"
                        value={contact.message}
                        onChange={e => handleChange(e, "message")}
                        invalid={!!errors.message}
                        placeholder="Type your message here"
                        style={{ borderRadius: "8px", padding: "12px", minHeight: "120px" }}
                      />
                      <FormFeedback>{errors.message}</FormFeedback>
                    </FormGroup>
                    <div className="text-center mt-4">
                      <Button color="primary" style={{ borderRadius: "8px", padding: "10px 32px", fontWeight: 600 }}>
                        Send Message
                      </Button>
                    </div>
                  </Form>
                  <hr className="my-4" />
                  <div className="text-center" style={{ color: "#555" }}>
                    <p>
                      <b>Email:</b> support@blogsett.com<br />
                      <b>Phone:</b> +91 8146926191
                    </p>
                    <p>
                      We usually respond within 24 hours.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default ContactPage;