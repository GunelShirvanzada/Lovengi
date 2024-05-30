import React, { useRef, useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "./Modal";
import { userActions } from "../store/shopping-cart/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const loginEmailRef = useRef(null);
  const loginPasswordRef = useRef(null);
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(userActions.setUser(JSON.parse(storedUser)));
      navigate("/home");
    }
  }, [dispatch, navigate]);

  const handleSuccess = () => {
    const email = loginEmailRef.current.value;
    const password = loginPasswordRef.current.value;
    const name = localStorage.getItem('name')

    dispatch(userActions.setUser({ name, email,  password }));
    localStorage.setItem("user", JSON.stringify({ name, email, password }));

    toggleModal();
    navigate('/home');
    window.location.reload()
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const email = loginEmailRef.current.value;
    const password = loginPasswordRef.current.value;

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
      setModal({
        isOpen: true,
        title: 'Uğurlu',
        body: 'Uğurla daxil oldunuz!',
        onConfirm: handleSuccess
      });
    } else {
      setModal({
        isOpen: true,
        title: 'Xəta',
        body: 'Email və ya şifrə yanlışdır.',
      });
    }
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Daxil ol" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="12" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input className="register_input"
                    type="email"
                    placeholder="Email"
                    required
                    ref={loginEmailRef}
                  />
                </div>
                <div className="form__group">
                  <input className="register_input"
                    type="password"
                    placeholder="Şifrə"
                    required
                    ref={loginPasswordRef}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Daxil ol
                </button>
              </form>
              <Link to="/register" className="registerstyle">Hesabınız yoxdur? Hesab yaradın.</Link>
            </Col>
          </Row>
        </Container>
        <CustomModal isOpen={modal.isOpen} toggle={toggleModal} title={modal.title} body={modal.body} onConfirm={modal.onConfirm} />
      </section>
    </Helmet>
  );
};

export default Login;

