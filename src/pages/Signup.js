import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from 'react-toastify';

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    signUp(data).then((resp) => {
      toast.success("User is registered successfully! User id: " + resp.id);
      setData({
        name: "",
        email: "",
        password: "",
        about: "",
      });
    }).catch((error) => {
      setError({
        errors: error,
        isError: true
      });
    });
  };

  return (
    <Base>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col sm={{ size: 7, offset: 0 }}>
              <Card
                style={{
                  borderRadius: "18px",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
                  background: "rgba(255,255,255,0.97)",
                  border: "none"
                }}
              >
                <CardHeader
                  style={{
                    background: "transparent",
                    borderBottom: "none",
                    textAlign: "center"
                  }}
                >
                  <h2 style={{ color: "#185a9d", fontWeight: 700, letterSpacing: 1 }}>Create Your Account</h2>
                  <p style={{ color: "#555", fontSize: "1.1rem" }}>Join BlogSett and start sharing your stories!</p>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={submitForm}>
                    <FormGroup>
                      <Label for="name" style={{ fontWeight: 500, color: "#333" }}>Name</Label>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        id="name"
                        onChange={(e) => handleChange(e, 'name')}
                        value={data.name}
                        invalid={error.errors?.response?.data?.name ? true : false}
                        style={{
                          borderRadius: "8px",
                          padding: "12px",
                          fontSize: "1.1rem"
                        }}
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.name}
                      </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label for="email" style={{ fontWeight: 500, color: "#333" }}>Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        onChange={(e) => handleChange(e, 'email')}
                        value={data.email}
                        invalid={error.errors?.response?.data?.email ? true : false}
                        style={{
                          borderRadius: "8px",
                          padding: "12px",
                          fontSize: "1.1rem"
                        }}
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.email}
                      </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label for="password" style={{ fontWeight: 500, color: "#333" }}>Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        onChange={(e) => handleChange(e, 'password')}
                        value={data.password}
                        invalid={error.errors?.response?.data?.password ? true : false}
                        style={{
                          borderRadius: "8px",
                          padding: "12px",
                          fontSize: "1.1rem"
                        }}
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.password}
                      </FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label for="about" style={{ fontWeight: 500, color: "#333" }}>About</Label>
                      <Input
                        type="textarea"
                        placeholder="Tell us about yourself"
                        id="about"
                        onChange={(e) => handleChange(e, 'about')}
                        style={{
                          height: "120px",
                          borderRadius: "8px",
                          padding: "12px",
                          fontSize: "1.1rem"
                        }}
                        value={data.about}
                        invalid={error.errors?.response?.data?.about ? true : false}
                      />
                      <FormFeedback>
                        {error.errors?.response?.data?.about}
                      </FormFeedback>
                    </FormGroup>

                    <Container className="text-center mt-4">
                      <Button
                        color="primary"
                        outline
                        style={{
                          padding: "10px 32px",
                          borderRadius: "8px",
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          letterSpacing: 1
                        }}
                      >
                        Register
                      </Button>
                      <Button
                        color="secondary"
                        outline
                        type="reset"
                        className="ms-2"
                        style={{
                          padding: "10px 32px",
                          borderRadius: "8px",
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          letterSpacing: 1
                        }}
                        onClick={() =>
                          setData({
                            name: "",
                            email: "",
                            password: "",
                            about: "",
                          })
                        }
                      >
                        Reset
                      </Button>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default Signup;