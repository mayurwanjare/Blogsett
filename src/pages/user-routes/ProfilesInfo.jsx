import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Spinner } from 'reactstrap'
import { getCurrentUserDetail } from '../../auth'

function ProfilesInfo() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = getCurrentUserDetail();
    if (data) {
      setUser({
        name: data.name,
        email: data.email,
        about: data.about,
        joined: data.addedDate || data.joined || "",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=764ba2&color=fff&size=128`
      });
    }
    setLoading(false);
  }, [])

  return (
    <Base>
      <div style={{ minHeight: "90vh", background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)", paddingTop: "40px" }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={7}>
              <Card className="shadow border-0" style={{ borderRadius: "18px" }}>
                <CardBody className="text-center">
                  {loading ? (
                    <Spinner color="primary" />
                  ) : user ? (
                    <>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: "110px", height: "110px", borderRadius: "50%", marginBottom: "18px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
                      />
                      <CardTitle tag="h2" style={{ fontWeight: 700, color: "#764ba2" }}>{user.name}</CardTitle>
                      <CardText style={{ color: "#555", fontSize: "1.1rem" }}>{user.about}</CardText>
                      <hr />
                      <Row className="mb-3">
                        <Col xs={6} className="text-end fw-bold" style={{ color: "#333" }}>Email:</Col>
                        <Col xs={6} className="text-start">{user.email}</Col>
                      </Row>
                      <Row>
                        <Col xs={6} className="text-end fw-bold" style={{ color: "#333" }}>Joined:</Col>
                        <Col xs={6} className="text-start">{user.joined ? new Date(user.joined).toLocaleDateString() : ""}</Col>
                      </Row>
                      <Button color="primary" className="mt-4 px-4" style={{ borderRadius: "8px", fontWeight: 600 }}>
                        Edit Profile
                      </Button>
                    </>
                  ) : (
                    <CardText className="text-danger">Could not load user details.</CardText>
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

export default ProfilesInfo