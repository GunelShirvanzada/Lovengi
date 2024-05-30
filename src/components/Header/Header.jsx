import React, { useRef, useEffect, useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Container } from "reactstrap";
import logo from "../../assets/images/logo lovengi2.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/shopping-cart/userSlice";
import { cartActions } from "../../store/shopping-cart/cartSlice";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import { wishListActions } from "../../store/shopping-cart/wishListSlice";
import "../../styles/header.css";

const nav__links = [
  {
    display: "Ana Səhifə",
    path: "/home",
  },
  {
    display: "Yeməklər",
    path: "/foods",
  },
  {
    display: "Sevimlilər",
    path: "/wishlist",
  },
  {
    display: "Səbət",
    path: "/cart",
  },
  {
    display: "Əlaqə",
    path: "/contact",
  },
];

const chatbotResponses = {
  "salam": "Salam! Necə kömək edə bilərəm?",
  "Default": "Bağışlayın, bu suala cavab verə bilmirəm.",

  "əlaqə": "Bizimlə əlaqə saxlamaq üçün info@example.com adresinə e-poçt göndərə bilərsiniz.",
  "endirim": "Hazırda xüsusi endirimlər mövcud deyil.",
  "iş saatı": "Bizim iş saatlarımız hər gün saat 9:00-dan 21:00-dəkdir.",
  "çatdırılma": "Çatdırılma vaxtı 30-60 dəqiqə arasında dəyişir.",

  "elaqe": "Bizimlə əlaqə saxlamaq üçün info@example.com adresinə e-poçt göndərə bilərsiniz.",
  "is saatı": "Bizim iş saatlarımız hər gün saat 9:00-dan 21:00-dəkdir.",
  "catdırılma": "Çatdırılma vaxtı 30-60 dəqiqə arasında dəyişir.",
};

const getChatbotResponse = (message, totalQuantity) => {
  if (message === "səbətimdə neçə məhsul var") {
    return `Səbətinizdə toplam ${totalQuantity} məhsul var.`;
  } else if (message === 'sebetimde nece mehsul var') {
    return `Səbətinizdə toplam ${totalQuantity} məhsul var.`;
  }
  return chatbotResponses[message] || chatbotResponses["Default"];
};

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //* Bot mesaj 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const [botMessage, setBotMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleHelpClick = () => {
    setShowBot(true); // "Help" clickle
  };

  const handleBotInputChange = (event) => {
    setBotMessage(event.target.value);
  };

  const handleBotSendClick = () => {
    if (botMessage.trim() === "") return;

    const newMessages = [...messages, { role: "user", content: botMessage }];
    setMessages(newMessages);

    const response = getChatbotResponse(botMessage, totalQuantity);
    setMessages([...newMessages, { role: "assistant", content: response }]);
    setBotMessage("");
  };
  const handleBotCloseClick = () => {
    setShowBot(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };


  // logout edib sebet ve vishlisti temizlemek
  const handleLogout = () => {
    dispatch(userActions.clearUser());
    dispatch(cartActions.clearCart())
    dispatch(wishListActions.clearWishlist());
  };
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex justify-content-between">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : "nav__item"
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav account and sebet ========= */}
          <div className="nav__right d-flex gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            {/* Account */}
            {user ? (
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="user-dropdown">
                <DropdownToggle className="dropdown-toggle" caret>
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Profil Şəkli" className="header-profile-image" />
                  ) : (
                    user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()
                  )}
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu'>
                  <DropdownItem className='dropdown-item' onClick={handleProfileClick}>
                  <i class="fa-regular fa-pen-to-square"></i> Profil
                  </DropdownItem>
                  <DropdownItem className='dropdown-item' onClick={handleHelpClick}>
                  <i class="fa-regular fa-circle-question"></i> Dəstək
                  </DropdownItem>
                  <DropdownItem divider className="divider" />
                  <DropdownItem className='dropdown-item' onClick={handleLogout}>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i> Çıxış
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <span className="user">
                <NavLink to="/login">
                  <i className="ri-user-line"></i>
                </NavLink>
              </span>
            )}

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>

        {/* Bot qutusu */}
        {showBot && (
          <div className="bot-message-box">
            <button className="bot-close-button" onClick={handleBotCloseClick}><i class="fa-regular fa-circle-xmark"></i></button>
            <p>Salam, necə kömək edə bilərəm?</p>
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Mesajınızı yazın..."
              className="bot-input"
              value={botMessage}
              onChange={handleBotInputChange}
            />
            <button
              className="bot-send-button"
              onClick={handleBotSendClick}
            >
              Göndər
            </button>
          </div>
        )}

      </Container>
    </header>
  );
};

export default Header;
