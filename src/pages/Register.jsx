import React, { useRef, useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "./Modal";

const Register = () => {
  const signupNameRef = useRef();
  const signupPasswordRef = useRef();
  const signupEmailRef = useRef();
  const navigate = useNavigate();
  const [modal, setModal] = useState({ isOpen: false, title: '', body: '', onConfirm: null });

  const toggleModal = () => {
    setModal({ ...modal, isOpen: !modal.isOpen });
  };

  useEffect(() => {
    if (modal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modal.isOpen]);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return regex.test(password);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const name = signupNameRef.current.value;
    const email = signupEmailRef.current.value;
    const password = signupPasswordRef.current.value;

    if (!validatePassword(password)) {
      setModal({
        isOpen: true,
        title: 'Xəta',
        body: 'Şifrə ən azı 8 simvol uzunluğunda olmalı, bir böyük hərf və bir rəqəm daxil etməlidir.',
        onConfirm: toggleModal
      });
      return;
    }

    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    setModal({
      isOpen: true,
      title: 'Uğurlu',
      body: 'Qeydiyyat uğurla tamamlandı!',
      onConfirm: () => {
        toggleModal();
        navigate('/login');
      }
    });
  };

  return (
    <Helmet title="Signup">
      <CommonSection title="Qeydiyyat" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="12" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input className="register_input"
                    type="text"
                    placeholder="Adınız"
                    required
                    ref={signupNameRef}
                  />
                </div>
                <div className="form__group">
                  <input className="register_input"
                    type="email"
                    placeholder="Email"
                    required
                    ref={signupEmailRef}
                  />
                </div>
                <div className="form__group">
                  <input className="register_input"
                    type="password"
                    placeholder="Şifrə"
                    required
                    ref={signupPasswordRef}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Qeydiyyatdan keçin
                </button>
              </form>
              <Link to="/login" className="registerstyle">Hesabınız var? Daxil olun</Link>
            </Col>
          </Row>
        </Container>
        <CustomModal isOpen={modal.isOpen} toggle={toggleModal} title={modal.title} body={modal.body} onConfirm={modal.onConfirm} />
      </section>
    </Helmet>
  );
};

export default Register;
