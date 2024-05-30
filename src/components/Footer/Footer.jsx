import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import logo from "../../assets/images/logo lovengi2.png";
import "../../styles/footer.css";


const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subscribedEmails, setSubscribedEmails] = useState([]);

  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem("subscribedEmails")) || [];
    setSubscribedEmails(storedEmails);
  }, []);

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Zəhmət olmasa, email daxil edin.");
      return;
    }

    // Emailin düzgün formatda olub-olmadığını yoxlayın
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Zəhmət olmasa, düzgün email formatında daxil edin.");
      return;
    }

    // Local yaddaşda emailin var olub-olmadığını yoxlayın
    if (subscribedEmails.includes(email)) {
      setMessage("Bu email artıq abunədir.");
      return;
    }

    // Emaili local yaddaşa saxlamaq
    const updatedEmails = [...subscribedEmails, email];
    setSubscribedEmails(updatedEmails);
    localStorage.setItem("subscribedEmails", JSON.stringify(updatedEmails));
    setEmail("");
    setMessage("Abunəlik uğurlu oldu!")
  };
  return (
    <footer className="footer">

      <Container>

        <Row className='footerAllOne'>
          <Col lg="4" md="4" sm="6">
            <div className="footer__logo text-start">
              <img src={logo} alt="logo" />
              <p>Lezzətli yeməklər, sizi sevgi ilə bir araya gətirir.</p>
            </div>
          </Col>

          <Col lg="2" md="4" sm="6">
            <h5 className="footer__title">Çatdırılma vaxtı</h5>
            <ListGroup className="deliver__time-list">
              <ListGroupItem className="delivery__time-item border-0 ps-0">
                <span>Bazar ertəsi - Şənbə</span>
                <p>10:00 - 23:00</p>
              </ListGroupItem>
              <ListGroupItem className="delivery__time-item border-0 ps-0">
                <span>Bazar günü</span>
                <p>İstirahət günü</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Əlaqə</h5>
            <ListGroup className="deliver__time-list">
              <ListGroupItem className="delivery__time-item border-0 ps-0">
                <p><span>Ünvan:</span> Bakı, Nizami Gəncəvi küçəsi</p>
              </ListGroupItem>
              <ListGroupItem className="delivery__time-item border-0 ps-0">
                <p><span>Telefon:</span> 012 345 67 89</p>
              </ListGroupItem>
              <ListGroupItem className="delivery__time-item border-0 ps-0">
                <p><span>Email:</span> lovengi@gmail.com</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Xəbərlər</h5>
            <p className="newsText">Xəbərlər üçün abunə olun</p>

            <div className="newsletter">
              <input
                type="email"
                placeholder="Email daxil edin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span onClick={handleSubscribe}>
                <i className="ri-send-plane-line"></i>
              </span>

            </div>

            {message && <p className="footermessage">{message}</p>}
            {subscribedEmails.length > 0 && (
              <div className="subscribed-emails">
                <h5 className="emailsTitle">Abunə olan maillər:</h5>
                <div className="abune">
                  <ul className="emailsList">
                    {subscribedEmails.map((email, index) => (
                      <li key={index}>{email}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Col>
        </Row>

        <Row className='finish'>
          <Col lg="6" md="6" sm="6" xs='12'>
            <div className="social__links">
              <p className="socialText">Sosial Şəbəkələrimiz: </p>
              <span>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </span>
              <span>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <i className="ri-facebook-line"></i>
                </a>
              </span>
              <span>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                  <i className="ri-youtube-line"></i>
                </a>
              </span>
            </div>
          </Col>

          <Col lg="6" md="6" sm="6" xs='12'>
            <p className="copyright__text">
              Bakı - 2024
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;