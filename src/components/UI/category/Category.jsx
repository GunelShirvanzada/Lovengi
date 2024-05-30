import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { GiChickenOven, GiPieSlice, GiSteak } from 'react-icons/gi'; // GiCookie ikonu eklendi

import "../../../styles/category.css";
import { PiBreadLight } from 'react-icons/pi';

const categoryData = [
  {
    display: "Xəmir Yeməklər",
    icon: <PiBreadLight />,
    categoryTwo: "Xəmir Yeməklər",
  },
  {
    display: "Şirniyyatlar",
    icon: <GiPieSlice />,
    categoryTwo: "Şirniyyatlar",
  },
  {
    display: "Toyuq Yeməkləri",
    icon: <GiChickenOven />,
    categoryTwo: "Toyuq Yeməkləri",
  },
  {
    display: "Ətli Yeməkləri",
    icon:  <GiSteak />,
    categoryTwo: "Ətli Yeməklər",
  },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryTwo) => {
    navigate(`/category/${categoryTwo}`);
  };

  return (
    <Container>
      <Row>
        {categoryData.map((item, index) => (
          <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={index}>
            <div
              className="category__item d-flex align-items-center gap-3"
              onClick={() => handleCategoryClick(item.categoryTwo)}
              style={{ cursor: 'pointer' }}
            >
              <div className="category__icon">
                {item.icon}
              </div>
              <h6 className='category__text_icon'>{item.display}</h6>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Category;