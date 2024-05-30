import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import "../styles/product-details.css";

const FoodDetails = () => {
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find((product) => product.id === id);
  const [previewImg, setPreviewImg] = useState(product.image01);
  const { title, price, category, desc, image01 } = product;

  const relatedProduct = products.filter((item) => category === item.category);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(id)) || [];
    setReviews(storedReviews);
  }, [id]);

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
      })
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newReview = {
      name: enteredName,
      email: enteredEmail,
      message: reviewMsg,
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(id, JSON.stringify(updatedReviews));

    setEnteredName("");
    setEnteredEmail("");
    setReviewMsg("");
  };

  useEffect(() => {
    setPreviewImg(product.image01);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={title} />
      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image01)}
                >
                  <img src={product.image01} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(product.image02)}
                >
                  <img src={product.image02} alt="" className="w-50" />
                </div>
                <div
                  className="img__item"
                  onClick={() => setPreviewImg(product.image03)}
                >
                  <img src={product.image03} alt="" className="w-50" />
                </div>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  Qiyməti: <span>{price} <i className="fa-solid fa-manat-sign"></i></span>
                </p>
                <p className="category mb-5">
                  Kateqoriya: <span>{category}</span>
                </p>

                <button onClick={addItem} className="addTOCart__btn">
                  Səbətə əlavə et
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6
                  className={` ${tab === "desc" ? "tab__active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Açıqlaması
                </h6>
                <h6
                  className={` ${tab === "rev" ? "tab__active" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Rəylər
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content">
                  <p>{desc}</p>
                </div>
              ) : (
                <div className="tab__form mb-3">
                  {reviews.map((review, index) => (
                    <div className="review" key={index}>
                      <p className="user__name mb-0">{review.name}</p>
                      <p className="feedback__text">{review.message}</p>
                    </div>
                  ))}

                  <form className="form" onSubmit={submitHandler}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Adınızı daxil edin"
                        value={enteredName}
                        onChange={(e) => setEnteredName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="E-poçtunuzu daxil edin"
                        value={enteredEmail}
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <textarea
                        rows={4}
                        type="text"
                        style={{
                          resize: "none",
                          overflow: "auto",
                          scrollbarWidth: "thin",
                          scrollbarColor: "rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1)",
                        }}
                        placeholder="Rəyinizi yazın"
                        value={reviewMsg}
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="addTOCart__btn">
                      Göndər
                    </button>
                  </form>
                </div>
              )}
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">Sizə maraqlı gələ bilər</h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;