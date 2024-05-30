import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import Payment from './Payment';

import "../styles/checkout.css";

const Checkout = () => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [showPayment, setShowPayment] = useState(false); 

  const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 5;

  const totalAmount = cartTotalAmount + Number(shippingCost);

  const submitHandler = (e) => {
    e.preventDefault();
    const userShippingAddress = {
      name: enterName,
      email: enterEmail,
      phone: enterNumber,
      country: enterCountry,
      city: enterCity,
    };

    shippingInfo.push(userShippingAddress);
    console.log(shippingInfo);

    // Ödəniş səhifəsini göstərmək üçün showPayment dəyişənini true et
    setShowPayment(true);
  };

  if (showPayment) {
    return <Payment />;
  }

  return (
    <Helmet title="Checkout">
      <CommonSection title="Ödəniş" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Çatdırılma ünvanı</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Adınızı daxil edin"
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    placeholder="E-poçtunuzu daxil edin"
                    required
                    onChange={(e) => setEnterEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Əlaqə nömrəsi"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Küçənin adı"
                    required
                    onChange={(e) => setEnterCountry(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Binanın nömrəsi"
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Ödəniş
                </button>
              </form>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Məbləğ: <span>{cartTotalAmount} <i className="fa-solid fa-manat-sign"></i></span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Çatdırılma: <span>{shippingCost} <i className="fa-solid fa-manat-sign"></i></span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Yekun məbləğ: <span>{totalAmount} <i className="fa-solid fa-manat-sign"></i></span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;