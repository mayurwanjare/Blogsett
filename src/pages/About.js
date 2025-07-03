import { Button, Container, Row, Col } from "reactstrap";
import Base from "../components/Base";
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
import bg from '../assets/web-background.jpg';

const About = () => {
    return (
      <div
      style={{
                    minHeight: "100vh",
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                }}
      >
        <Base>
        
            <div
                
            >
                <div className="container text-center mt-5 about-page" style={{ background: "rgba(0,0,0,0.5)", borderRadius: "10px" }}>
                    <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem', color: "#fff" }}>
                        Welcome to BlogSett
                    </h1>
                    <h2 style={{ color: "#fff" }}>“Write. Share. Inspire.”</h2>
                    <p style={{ color: "#fff" }}>
                        “Explore stories, tutorials, and thoughts from amazing minds.” <br />
                        “Discover, write, and share your stories with the world.” <br />
                    </p>
                    
                </div>
                <div className="text-center mt-4" style={{ padding: '20px' }}>
                  <Button color="warning" className="mt-3" style={{ fontSize: '1.2rem', padding: '10px 20px' }} outline>
                        <a href="/user/dashboard" style={{ color: 'black', textDecoration: 'none' }}>
                            Create Your Blog
                        </a>
                    </Button>
                </div>
                <div className="about-page" style={{ padding: '60px 0' }}>
      <Container>
        <Row className="mb-5" >
          <Col>
            <h1 className="text-center" style={{color:'white'}}>About Us</h1>
            <p className="text-center" style={{color:'white'}}>Empowering creators through stories, tutorials, and ideas.</p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md="6">
            <h3 style={{color:'white'}}>🌟 Our Mission</h3>
            <p style={{color:'white'}}>
              At <strong>[BlogSett]</strong>, we believe everyone has a story worth sharing. Whether it’s a technical tutorial, personal journey, or creative thought — we provide a platform for authentic expression.
            </p>
          </Col>
          <Col md="6">
            <h3 style={{color:'white'}}>🧠 What We Offer</h3>
            <ul style={{color:'white'}}>
              <li>Free, clean blogging tools</li>
              <li>Diverse content categories</li>
              <li>Community-driven feedback</li>
              <li>Performance insights</li>
              <li>Global reach and discovery</li>
            </ul>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h3 style={{color:'white'}}>🚀 Why We Started</h3>
            <p style={{color:'white'}}>
              In a fast-paced digital world, we craved a space where long-form, thoughtful writing still matters. This blog was created to bring writers, developers, and thinkers together — without the noise.
            </p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h3 style={{color:'white'}}>✍️ Who Can Blog Here?</h3>
            <p style={{color:'white'}}>Anyone. No experience needed.</p>
            <ul style={{color:'white'}}>
              <li>Students sharing knowledge</li>
              <li>Techies writing tutorials</li>
              <li>Travelers posting experiences</li>
              <li>Writers expressing views</li>
            </ul>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h3 style={{color:'white'}}>👨‍💻 Meet the Creator</h3>
            <p style={{color:'white'}}>
              Hey, I’m <strong>Mayur Wanjare</strong> — a fullstack developer passionate about backend systems, clean UI, and meaningful content. I built this platform to simplify and empower blogging for everyone.
            </p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h3 style={{color:'white'}}>🤝 Join Us</h3>
            <p style={{color:'white'}}>
              Want to contribute, collaborate, or explore how it’s built?  
              <br />
              👉 <a href="/contact">Contact Us</a> or <a href="/signup">Get Started</a>
            </p>
            <p className="mt-3" style={{color:'white'}}>
      🔗 Follow us on:
      <br />
      <a href="https://instagram.com/_.mayur___" target="_blank" rel="noopener noreferrer">
        📸 Instagram
      </a>
      {' | '}
      <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer">
        👍 Facebook
      </a>
    </p>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <h4 >🧡 Thank You</h4>
            <p >To every reader, writer, and builder — this space exists because of you.</p>
          </Col>
        </Row>
        <Row className="mt-5">
  <Col className="text-center">
    <p>Connect with us:</p>
    <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer" className="me-3">
      <FaFacebook size={30} color="#4267B2" />
    </a>
    <a href="https://instagram.com/_.mayur___" target="_blank" rel="noopener noreferrer" className="mx-3">
      <FaInstagram size={30} color="#E1306C" />
    </a>
    <a href="https://instagram.com/_.mayur___" target="_blank" rel="noopener noreferrer" className="ms-3">
      <FaGithub size={30} color="#E1306C" />
    </a>
  </Col>
</Row>
        
      </Container>
    </div>
            </div>
        </Base>
      </div>
    );
};

export default About;