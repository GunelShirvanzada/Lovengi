import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { userActions } from '../store/shopping-cart/userSlice';
import '../styles/profile.css';
import userphoto from '../assets/images/useraccount.png'

import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleImageModal = () => setIsImageModalOpen(!isImageModalOpen);
  const togglePasswordModal = () => setIsPasswordModalOpen(!isPasswordModalOpen);

  const handleSave = () => {
    dispatch(userActions.updateUser({ name, email, phone, address, profileImage }));
    toggleModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChangePassword = () => {
    try {
      dispatch(userActions.updatePassword({ currentPassword, newPassword }));
      setAlertMessage('Şifrəniz uğurla dəyişdirildi');
      setAlertType('success');
      togglePasswordModal();
    } catch (error) {
      setAlertMessage('Cari şifrə yanlışdır');
      setAlertType('danger');
    }
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const renderProfileImage = () => {
    if (profileImage) {
      return <img src={profileImage} alt="Profil Resmi" className="profile-image" onClick={toggleImageModal} />;
    } else if (name) {
      const initial = name.charAt(0).toUpperCase();
      return <div className="profile-initial" onClick={toggleImageModal}>{initial}</div>;
    } else {
      return <img src={userphoto} alt="Profil Resmi" className="profile-image"/>;
    }
  };

  return (
    <Helmet title='Profil'>
      <CommonSection title='Hesab' />
      <section>
        <div className="container">
          <div className="profil-container">
            <Row className="profile-row">
              <Col lg="4" sm='12' className='profiltop'>
                <h2 className="profile-title">Profil</h2>
                {renderProfileImage()}
              </Col>

              <Col lg="8" sm='12'className="profile-details">
                <p className='basliq'><strong className='strongTitle'>Ad:</strong> {user?.name || "Ad əlavə edilməyib"}</p>
                <p className='basliq'><strong className='strongTitle'>Email:</strong> {user?.email || "Email əlavə edilməyib"}</p>
                <p className='basliq'><strong className='strongTitle'>Telefon:</strong> {user?.phone || "Telefon əlavə edilməyib"}</p>
                <p className='basliq'><strong className='strongTitle'>Ünvan:</strong> {user?.address || "Ünvan əlavə edilməyib"}</p>

                <div className="profilAllBtn">
                  <Button className="edit-profile-btn" onClick={toggleModal}>Profil Redaktəsi</Button>
                  <Button className="edit-profile-btn" onClick={togglePasswordModal}>Parolu Dəyiş</Button>
                </div>
              </Col>
            </Row>

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>Profil Redaktəsi</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="name">Ad</Label>
                    <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="phone">Telefon</Label>
                    <Input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="address">Ünvan</Label>
                    <Input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </FormGroup>
                  <Button className='modal_butonlari' onClick={handleSave}>Yadda saxla</Button>
                </Form>
              </ModalBody>
            </Modal>

            <Modal isOpen={isImageModalOpen} toggle={toggleImageModal}>
              <ModalHeader toggle={toggleImageModal}>Profil Şəkli Dəyiş</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="profileImage">Yeni Profil Şəkli Seç</Label>
                    <Input type="file" id="profileImage" onChange={handleImageChange} />
                  </FormGroup>
                  <Button className='modal_butonlari' onClick={() => { handleSave(); toggleImageModal(); }}>Yadda saxla</Button>
                </Form>
              </ModalBody>
            </Modal>

            <Modal isOpen={isPasswordModalOpen} toggle={togglePasswordModal}>
              <ModalHeader toggle={togglePasswordModal}>Parolu Dəyiş</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="currentPassword">Cari Parol</Label>
                    <Input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="newPassword">Yeni Parol</Label>
                    <Input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </FormGroup>
                  <div className="yaddasaxlaParol">
                    <Button className='modal_butonlari' onClick={handleChangePassword}>Yadda saxla</Button>
                    {alertMessage && (
                      <div className={alertType === 'success' ? 'alert-success-custom' : 'alert-danger-custom'}>
                        {alertMessage}
                      </div>
                    )}
                  </div>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Profile;
