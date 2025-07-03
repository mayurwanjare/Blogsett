import Base from "../components/Base"
import { Container, Row, Col, Card, CardBody } from "reactstrap"

const Services = () => {
    return (
        <Base>
            <div style={{ minHeight: "90vh", background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)", paddingTop: "40px" }}>
                <Container>
                    <h1 className="text-center mb-5" style={{ fontWeight: 700, color: "#3b3b3b" }}>Our Services</h1>
                    <Row className="justify-content-center">
                        <Col md={4} className="mb-4">
                            <Card className="shadow-sm border-0 h-100" style={{ borderRadius: "16px" }}>
                                <CardBody className="text-center">
                                    <span role="img" aria-label="blog" style={{ fontSize: "2.5rem" }}>📝</span>
                                    <h4 className="mt-3 mb-2" style={{ fontWeight: 600 }}>Easy Blogging</h4>
                                    <p style={{ color: "#555" }}>
                                        Create, edit, and publish your blogs with our user-friendly editor. Share your stories and ideas with the world in just a few clicks.
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card className="shadow-sm border-0 h-100" style={{ borderRadius: "16px" }}>
                                <CardBody className="text-center">
                                    <span role="img" aria-label="community" style={{ fontSize: "2.5rem" }}>🌐</span>
                                    <h4 className="mt-3 mb-2" style={{ fontWeight: 600 }}>Community Support</h4>
                                    <p style={{ color: "#555" }}>
                                        Connect with a vibrant community of writers and readers. Get feedback, comments, and grow your network.
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card className="shadow-sm border-0 h-100" style={{ borderRadius: "16px" }}>
                                <CardBody className="text-center">
                                    <span role="img" aria-label="analytics" style={{ fontSize: "2.5rem" }}>📊</span>
                                    <h4 className="mt-3 mb-2" style={{ fontWeight: 600 }}>Insights & Analytics</h4>
                                    <p style={{ color: "#555" }}>
                                        Track your blog’s performance with detailed analytics. Understand your audience and improve your content.
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Base>
    )
}

export default Services;