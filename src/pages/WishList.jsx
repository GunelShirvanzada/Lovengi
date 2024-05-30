import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { useSelector } from 'react-redux';
import ProductCard from '../components/UI/product-card/ProductCard';

const WishList = () => {
    const wishListItems = useSelector((state) => state.wishlist.items);
    return (
        <Helmet title='Wishlist'>
            <CommonSection title='Sevimlilər' />
            <section>
                <div className='container'>
                    {wishListItems.length === 0 ? (
                        <p>Sevimlilər siyahısı boşdur.</p>
                    ) : (
                        <div className="product__list">
                            {wishListItems.map((item) => (
                                <ProductCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Helmet>
    )
}

export default WishList