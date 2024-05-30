import React from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import '../styles/cart.css'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Cart">

      <CommonSection title="Səbətim" />

      <section>

        <Container>

          <Row>

            <Col lg="12">

              {cartItems.length === 0 ? (
                <h5 className="text-center">Səbətiniz boşdur.</h5>
              ) : (
                <table className="table table-bordered">

                  <thead>
                    <tr>
                      <th>Şəkil</th>
                      <th>Ad</th>
                      <th>Qiymət</th>
                      <th>Miqdar</th>
                      <th>Silmək</th>
                    </tr>
                  </thead>

                  <tbody className="tbodysize">
                    {cartItems.map((item) => (
                      <Tr item={item} key={item.id} />
                    ))}
                  </tbody>

                </table>
              )}

              <div className="mt-4">

                <h5 className="yekunCart">
                  <span className="cart_text">Yekun məbləğ:</span>
                  <span className="cart__subp">{totalAmount} <i class="fa-solid fa-manat-sign"></i></span>
                </h5>

                <br />

                <div className="cart__page-btn">

                  <button className="addTOCart__btn_cart me-4">
                    <Link to="/foods">Sifarişə davam edin</Link>
                  </button>

                  <button className="addTOCart__btn_cart">
                    <Link to="/checkout">Ödəməyə keçid edin</Link>
                  </button>

                </div>

              </div>

            </Col>

          </Row>
        </Container>

      </section>

    </Helmet>
  );
};

const Tr = (props) => {
  const { id, image01, title, price, quantity } = props.item;
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };

  return (
    <tr>

      <td className="text-center cart__img-box">
        <img src={image01} alt="" />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">{price} <i class="fa-solid fa-manat-sign"></i></td>
      <td className="text-center">{quantity} ədəd</td>
      <td className="text-center cart__item-del">
        <i class="ri-delete-bin-line" onClick={deleteItem}></i>
      </td>

    </tr>
  );
};

export default Cart;
