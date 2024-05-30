import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../assets/fake-data/products';
import { Col, Row } from 'reactstrap';
import ProductCard from '../components/UI/product-card/ProductCard';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';

const CategoryProducts = () => {
    const { categoryTwo } = useParams();
    const filteredProducts = products.filter(product => product.categoryTwo === categoryTwo);

    return (
        <Helmet title='CategoryProduct'>
            <CommonSection title={ `${categoryTwo}`} />
            <section>
                <div className='container'>
                    <h1>{categoryTwo}</h1>
                    <div>
                        <Row>
                            {filteredProducts.map(product => (
                                <Col lg="3" md="4" sm="6" xs="6" key={product.id} className="mt-5">
                                    <ProductCard item={product} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </section>
        </Helmet>
    );
};

export default CategoryProducts;
