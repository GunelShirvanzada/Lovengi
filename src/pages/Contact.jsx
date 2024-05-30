import React, { useState } from 'react';
import '../styles/contact.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneNumber = '994556989246';
        const message = `
        Ad: ${formData.name}; 
        %0AEmail: ${formData.email}; 
        %0ATelefon: ${formData.phone}; 
        %0AMesaj: ${formData.message}`;
        
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappURL, '_blank');
    };

    return (
        <Helmet title='Contact'>
            <CommonSection title = 'Əlaqə' />
            <section>
                <div className='contact'>

                    <div className="contact-form">
                        <h2>Bizimlə Əlaqə</h2>

                        <form onSubmit={handleSubmit}>
                            <input className='contact_input'
                                type="text"
                                id="name"
                                name="name"
                                placeholder='Ad və Soyad'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <input className='contact_input'
                                type="email"
                                id="email"
                                name="email"
                                placeholder='E-poçt'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <input className='contact_input'
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder='Mobil nömrə'
                                maxLength='13'
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <textarea 
                                id="message"
                                name="message"
                                placeholder='Mesaj'
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>

                            <button type="submit">Göndər</button>

                        </form>

                    </div>

                </div>

            </section>

        </Helmet>
    );
};

export default ContactForm;