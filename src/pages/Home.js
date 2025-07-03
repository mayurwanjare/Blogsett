import { Container, Row, Col, Button } from "reactstrap";
import Base from "../components/Base";
import NewFeed from "../components/NewFeed";

const Home = () => {
    return (
        <Base>
            {/* Hero Section */}
            <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                padding: "48px 0 32px 0",
                borderRadius: "0 0 32px 32px",
                marginBottom: "32px"
            }}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={8}>
                            <h1 style={{ fontWeight: 700, fontSize: "2.8rem" }}>Welcome to BlogSett</h1>
                            <p style={{ fontSize: "1.25rem", marginTop: "12px" }}>
                                Discover, write, and share amazing stories and tutorials. Join our community of creators!
                            </p>
                            <Button color="warning" size="lg" className="mt-3" href="/signup">
                                Get Started
                            </Button>
                        </Col>
                        
                    </Row>
                </Container>
            </div>
            {/* Feed Section */}
            <Container>
                <NewFeed />
            </Container>
        </Base>
    );
};

export default Home;