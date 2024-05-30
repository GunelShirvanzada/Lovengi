import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import ReactPaginate from 'react-paginate';

import heroImg from "../assets/images/hero.png";
import "../styles/hero-section.css";

import { Link } from "react-router-dom";

import Category from "../components/UI/category/Category.jsx";

import "../styles/home.css";

import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";

import products from "../assets/fake-data/products.js";

import ProductCard from "../components/UI/product-card/ProductCard.jsx";

import whyImg from "../assets/images/location.png";

import networkImg from "../assets/images/network.png";

import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";

const featureData = [
  {
    title: "Sürətli Çatdırılma",
    imgUrl: featureImg01,
    desc: "İstədiyiniz yeməyi sürətli və effektiv şəkildə qapınıza çatdırırıq. Sifarişinizin çatdırılma vaxtı ortalama 30-40 dəqiqə aralığında olacaq.",
  },
  {
    title: "Dadlı Yeməklər",
    imgUrl: featureImg02,
    desc: "Lezzətə dair ən yaxşı seçimlər! Bizim möhtəşəm dadlı yeməklərimizlə təcrübəninizi zənginləşdirin.",
  },
  {
    title: "Asan Sifariş",
    imgUrl: featureImg03,
    desc: "Yeməklərinizi sifariş etmək artıq daha asandır! Sürətli və sadə sifariş prosesimizlə lezzəti evinizə gətirin.",
  },
];

const Home = () => {
  const [category, setCategory] = useState("SORBA");
  const [allProducts, setAllProducts] = useState(products);

  //* pagination1
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (category === "SORBA") {
      const filteredProducts = products.filter(
        (item) => item.category === "Şorba"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "SALAT") {
      const filteredProducts = products.filter(
        (item) => item.category === "Salat"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "YEMEK") {
      const filteredProducts = products.filter(
        (item) => item.category === "Əsas yemək"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "ICKI") {
      const filteredProducts = products.filter(
        (item) => item.category === "İçki"
      );

      setAllProducts(filteredProducts);
    }
    setCurrentPage(1);
  }, [category]);

  

  //* pagination2
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allProducts.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(allProducts.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <Helmet title="Home">

      <section className="onepage">

        <Container>

          <Row>

            <Col lg="6" md="6">

              <div className="hero__content  ">

                <h5 className="mb-3">Sifariş etmək üçün asan yollar</h5>

                <h1 className="mb-4 hero__title">
                  <span>ACMISINIZ?</span> Gözləyin, <br /> yeməyiniz
                  <span> qapınıza gəlir.</span>
                </h1>

                <p>
                  Siz yalnızca sifarişinizi verin, qalanını biz həll edək. Sürətli və rahat xidmətimizlə lezzəti evinizə gətirək!
                </p>

                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    <a href="#yemeklerimiz">Sifariş et <i class="ri-arrow-right-s-line"></i></a>
                  </button>
                  {/* checkout */}
                  <button className="all__foods-btn">
                    <Link to="/foods">Bütün yeməklərə baxın</Link>
                  </button>
                </div>

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-car-line"></i>
                    </span>{" "}
                    Çatdırılma ödənişi yoxdur
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-shield-check-line"></i>
                    </span>{" "}
                    100% təhlükəsiz ödəniş
                  </p>

                </div>

              </div>

            </Col>

            <Col lg="6" md="6">

              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>

            </Col>

          </Row>

        </Container>

      </section>

      <section className="pt-0">
        <Category />
      </section>

      <section className="teklif">

        <Container>

          <Row>

            <Col lg="12" className="text-center">

              <h5 className="feature__subtitle mb-4">Biz nə təklif edirik?</h5>
              <h2 className="feature__title">Siz evinizdə oturun</h2>
              <h2 className="feature__title">
                biz <span>həll edəcəyik</span>
              </h2>

              <p className="mb-1 mt-4 feature__text">
                Yemək sifarişləriniz üçün məhsuldar restoranlarımızın geniş və zəngin menyularından <br /> istifadə edərək, istədiyiniz lezzəti və keyfi evinizdə rahatlığla yaşayın.
              </p>

              <p className="feature__text">
                Biz, təcrübəli şeflerimiz və təmizlik, təhlükəsizlik standartlarına sadiq <br /> işçilərimizlə, sizə mükəmməl yemək hazırlamaq üçün buradayıq.{" "}
              </p>

            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
                  <img
                    src={item.imgUrl}
                    alt="feature-img"
                    className="w-25 mb-3"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}

          </Row>

        </Container>

      </section>

      <section id="yemeklerimiz">

        <Container>

          <Row>

            <Col lg="12" className="text-center">
              <h2>Yeməklərimiz</h2>
            </Col>

            <Col lg="12">

              <div className="food__category d-flex align-items-center justify-content-center gap-4">

                <button className={`all__btn  ${category === "SORBA" ? "foodBtnActive" : ""} `} onClick={() => setCategory("SORBA")} >
                  Şorbalar
                </button>

                <button className={`d-flex align-items-center gap-2 ${category === "SALAT" ? "foodBtnActive" : ""} `} onClick={() => setCategory("SALAT")} >
                  Salatlar
                </button>

                <button className={`d-flex align-items-center gap-2 ${category === "YEMEK" ? "foodBtnActive" : ""} `} onClick={() => setCategory("YEMEK")} >
                  Əsas Yeməklər
                </button>

                <button className={`d-flex align-items-center gap-2 ${category === "ICKI" ? "foodBtnActive" : ""} `} onClick={() => setCategory("ICKI")} >
                  İçkilər
                </button>

              </div>

            </Col>

            {allProducts.length === 0 ? (
              <p>There are no products available.</p>
            ) : (
              currentItems.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                  <ProductCard item={item} />
                </Col>
              ))
            )}

          </Row>

          {pageCount > 1 && (
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
              previousLabel={"Əvvəlki"}
              nextLabel={"Sonrakı"}
              containerClassName=" paginationBttns"
              activeClassName="active"
            />
          )}
        </Container>

      </section>

      <section className="why__choose-us">

        <Container>

          <Row>

            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className="w-100" />
            </Col>

            <Col lg="6" md="6">

              <div className="why__tasty-treat">

                <h2 className="tasty__treat-title mb-4">
                  Niyə <span>Lovengi?</span>
                </h2>

                <p className="tasty__treat-desc">
                  "Bizim məqsədimiz, sevdiklərinizlə daha çox vaxt keçirmək və onlarla paylaşa biləcəyiniz ən ləzzətli yeməkləri sizə təqdim etməkdir. Lovengi, sevdiklərinizlə təəssüflərdən uzaq, zövqlü və sevinc dolu anlar yaşamanızı təmin edir. Biz, sizin yemək macəranızın bir hissəsi olmaq üçün buradayıq. Sifarişinizlə sevgi dolu anlar yaradın!"
                </p>

                <ListGroup className="mt-4">

                  <ListGroupItem className="border-0 ps-0">

                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i> Təzə və dadlı yeməklər
                    </p>

                    <p className="choose__us-desc">
                      Gündəlik təzəlik və dad ilə müşahidə edilmiş yemək seçimlərimizdən zövq alın.
                    </p>

                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i> Yüksək ketfiyyətdə dəstək
                    </p>
                    <p className="choose__us-desc">
                      Müştərilərə sürətli və effektiv şəkildə kömək etmək üçün buradayıq. Sizə keyfiyyətli məhsullar və xidmətlər təqdim etməkdən məmnunluq duyuruq.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i>İstənilən yerdən sifariş edin
                    </p>
                    <p className="choose__us-desc">
                      Bizim platformamız sizə istənilən yerdən, istənilən zaman rahatlıqla sifariş etmə imkanı təmin edir.
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="reyTestimonial">

        <Container>

          <Row>

            <Col lg="6" md="6">

              <div className="testimonial ">

                <h5 className="testimonial__subtitle mb-4">Rəylər</h5>
                <h2 className="testimonial__title mb-4">
                  Haqqımızda <span>müştərilərimizin</span> fikirləri
                </h2>

                <p className="testimonial__desc">
                  Müştərilərimizin fikirləri bizim üçün ən böyük motivasiyadır. Onların fikirləri bizə daim özümüzü inkişaf etdirməyə imkanı verir.
                </p>

                <TestimonialSlider />

              </div>

            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" />
            </Col>

          </Row>

        </Container>

      </section>

    </Helmet>
  );
};

export default Home;
