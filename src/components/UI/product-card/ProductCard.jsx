import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { wishListActions } from "../../../store/shopping-cart/wishListSlice";
import "../../../styles/product-card.css";

const ProductCard = (props) => {
  const { id, title, image01, price } = props.item;
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    const isItemInWishlist = wishlistItems.some((item) => item.id === id);
    setIsWishlist(isItemInWishlist);
  }, [wishlistItems, id]);

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image01,
        price,
      })
    );
  };

  const handleWishlistToggle = () => {
    if (isWishlist) {
      dispatch(wishListActions.removeItem(id));
    } else {
      dispatch(wishListActions.addItem({ id, title, image01, price }));
    }
    setIsWishlist((prev) => !prev);
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={image01} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <div className="product_title">
          <h5>
            <Link to={`/foods/${id}`}>{title}</Link>
          </h5>
        </div>

        <div className="product_text">
          <div className="wishlist__icon">
            {isWishlist ? (
              <i className="fa-solid fa-heart" onClick={handleWishlistToggle}></i>
            ) : (
              <i className="fa-regular fa-heart" onClick={handleWishlistToggle}></i>
            )}
          </div>
          <div className="product__price">
            {price} <i className="fa-solid fa-manat-sign"></i>
          </div>

          <button className="addTOCart__btn" onClick={addToCart}>
            Səbətə əlavə et
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
