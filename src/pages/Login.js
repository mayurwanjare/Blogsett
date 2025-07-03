import { Label, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row, Button } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from 'react-toastify'
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const [loginDetail, setLoginDetail] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event, feild) => {
        let actualValue = event.target.value
        setLoginDetail({
            ...loginDetail,
            [feild]: actualValue
        })
    }

    const handleReset = (event) => {
        setLoginDetail({
            username: "",
            password: ""
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Validation
        if (loginDetail.username.trim() === '' || loginDetail.password.trim() === '') {
            toast.error("Username or password is required !!");
            return;
        }
        // Submit the data to server to generate token
        loginUser(loginDetail)
            .then((jwtTokenData) => {
                doLogin(jwtTokenData, () => {
                    navigate("/user/dashboard")
                });
                toast.success("Login Success");
            })
            .catch((error) => {
                if (error.response?.status === 400 || error.response?.status === 404) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Something went wrong on server !!");
                }
            });
    };

    return (
        <Base>
            <div
                style={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Container>
                    <Row className="justify-content-center">
                        <Col sm={{ size: 6, offset: 0 }}>
                            <Card
                                style={{
                                    borderRadius: "18px",
                                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
                                    background: "rgba(255,255,255,0.95)",
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
                                    <h2 style={{ color: "#764ba2", fontWeight: 700, letterSpacing: 1 }}>Login to BlogSett</h2>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={handleFormSubmit}>
                                        <FormGroup>
                                            <Label for="email" style={{ fontWeight: 500, color: "#333" }}>
                                                Email
                                            </Label>
                                            <Input
                                                type="text"
                                                id="email"
                                                value={loginDetail.username}
                                                onChange={(e) => handleChange(e, 'username')}
                                                placeholder="Enter your email"
                                                style={{
                                                    borderRadius: "8px",
                                                    padding: "12px",
                                                    fontSize: "1.1rem"
                                                }}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password" style={{ fontWeight: 500, color: "#333" }}>
                                                Password
                                            </Label>
                                            <Input
                                                type="password"
                                                id="password"
                                                value={loginDetail.password}
                                                onChange={(e) => handleChange(e, 'password')}
                                                placeholder="Enter your password"
                                                style={{
                                                    borderRadius: "8px",
                                                    padding: "12px",
                                                    fontSize: "1.1rem"
                                                }}
                                            />
                                        </FormGroup>
                                        <Container className="text-center mt-4">
                                            <Button
                                                color="primary"
                                                style={{
                                                    padding: "10px 32px",
                                                    borderRadius: "8px",
                                                    fontWeight: 600,
                                                    fontSize: "1.1rem",
                                                    letterSpacing: 1
                                                }}
                                                outline
                                            >
                                                Login
                                            </Button>
                                            <Button
                                                onClick={handleReset}
                                                className="ms-2"
                                                color="secondary"
                                                outline
                                                style={{
                                                    padding: "10px 32px",
                                                    borderRadius: "8px",
                                                    fontWeight: 600,
                                                    fontSize: "1.1rem",
                                                    letterSpacing: 1
                                                }}
                                            >
                                                Reset
                                            </Button>
                                            <div className="mt-3">
                                                <span style={{ color: "#555", fontSize: "1rem" }}>Don't have an account?</span>
                                                <Link to="/signup">
                                                    <Button color="success" className="ms-2" style={{ borderRadius: "8px", fontWeight: 600 }}>
                                                        Sign Up
                                                    </Button>
                                                </Link>
                                            </div>
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

export default Login;