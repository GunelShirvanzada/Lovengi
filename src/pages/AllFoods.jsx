import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";

import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";

import "../styles/all-foods.css";
import "../styles/pagination.css";

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [sortOption, setSortOption] = useState("default");

  const searchedProduct = products.filter((item) => {
    if (searchTerm === "") {
      return item;
    } 
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortProducts = (products, option) => {
    switch (option) {
      case "ascending":
        return products.sort((a, b) => a.title.localeCompare(b.title));
      case "descending":
        return products.sort((a, b) => b.title.localeCompare(a.title));
      case "high-price":
        return products.sort((a, b) => b.price - a.price);
      case "low-price":
        return products.sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts([...searchedProduct], sortOption);

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = sortedProducts.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(sortedProducts.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <Helmet title="All-Foods">
      <CommonSection title="Bütün yeməklər" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between ">
                <input
                  type="text"
                  placeholder="Axtardığım...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              <div className="sorting__widget text-end">
                <select className="w-50" onChange={handleSortChange}>
                  <option value="default">Standart</option>
                  <option value="ascending">Əlifba sırası ilə, A-Z</option>
                  <option value="descending">Əlifba sırası ilə, Z-A</option>
                  <option value="high-price">Yüksək Qiymətdən</option>
                  <option value="low-price">Aşağı Qiymətdən</option>
                </select>
              </div>
            </Col>

            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Əvvəlki"}
                nextLabel={"Sonrakı"}
                containerClassName="paginationBttns"
                activeClassName="active"
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;