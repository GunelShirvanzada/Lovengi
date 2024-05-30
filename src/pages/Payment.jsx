import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import '../styles/Payment.css';
import { MdErrorOutline } from "react-icons/md";
import { useDispatch } from "react-redux"; 
import { cartActions } from "../store/shopping-cart/cartSlice";
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';

const PaymentForm = () => {
    const dispatch = useDispatch(); 
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    const validateCardDetails = () => {
        const { number, expiry, cvc, name } = state;
        const cardNumberRegex = /^[0-9]{16}$/;
        const expiryRegex = /^(0[1-9]|1[0-2])[0-9]{2}$/;
        const cvcRegex = /^[0-9]{3}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!cardNumberRegex.test(number)) {
            setErrorMessage('Kart nömrəsi yanlışdır.');
            return false;
        }
        if (!expiryRegex.test(expiry)) {
            setErrorMessage('Son istifadə tarixi yanlışdır.');
            return false;
        }
        if (!cvcRegex.test(cvc)) {
            setErrorMessage('CVV yanlışdır.');
            return false;
        }
        if (!nameRegex.test(name)) {
            setErrorMessage('Ad və soyad yanlışdır.');
            return false;
        }
        return true;
    }

    const handlePayment = async () => {
        setErrorMessage('');
        setPaymentSuccess(false);
        if (validateCardDetails()) {
          setLoading(true);

          setTimeout(() => {
            setLoading(false);
            setPaymentSuccess(true);
            dispatch(cartActions.clearCart()); // Sepeti boşaltmaq
          }, 2000);
        }
    };

    return (
        <Helmet title='Payment-Pay'>
            <CommonSection title='Ödəniş' />
            <section>
                <div className="container">
                    <div className="cardAll">
                        <div className='cardinfo'>
                            <Cards
                                number={state.number}
                                expiry={state.expiry}
                                cvc={state.cvc}
                                name={state.name}
                                focused={state.focus}
                            />
                            <form className='payment-form'>
                                <input
                                    type="text"
                                    name="number"
                                    placeholder="Kartın nömrəsi"
                                    maxLength="16"
                                    value={state.number}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Ad Soyad"
                                    maxLength="24"
                                    name="name"
                                    value={state.name}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    required
                                />
                                <div className="cardcolum">
                                    <input
                                        type="text"
                                        placeholder="İstifadə tarixi"
                                        maxLength="4"
                                        name="expiry"
                                        value={state.expiry}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        maxLength="3"
                                        name="cvc"
                                        value={state.cvc}
                                        onChange={handleInputChange}
                                        onFocus={handleInputFocus}
                                        required
                                    />
                                </div>

                                <div className="cardPay">
                                    <button className='paymentBtn' type="button" onClick={handlePayment} disabled={loading}>
                                        {loading ? 'Yüklənir...' : 'Ödəniş et'}
                                    </button>
                                </div>

                                {paymentSuccess && <div className="success-message">Ödəmə uğurla tamamlandı!</div>}
                                {errorMessage && <div className="error-message"><span className='erroricon'><MdErrorOutline /></span> {errorMessage}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    );
}

export default PaymentForm;