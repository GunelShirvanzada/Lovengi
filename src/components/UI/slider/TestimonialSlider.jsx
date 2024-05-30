import React from "react";
import Slider from "react-slick";

import ava01 from "../../../assets/images/ava-1.jpg";
import ava02 from "../../../assets/images/ava-2.jpg";
import ava03 from "../../../assets/images/ava-3.jpg";

import "../../../styles/slider.css";

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>

      <div>

        <p className="review__text">
          "Sifariş etdiyim kabab və şorba möhtəşəm idi! Yeməklər təzə və dadlı idi. Saytın təklif etdiyi milli yeməklər mənə təsir etdi və möhtəşəm bir təcrübə yaşadım. Həmçinin, təchizat və çatdırılma prosesi də çox sürətli və effektiv idi. Təşəkkür edirəm!"
        </p>

        <div className=" slider__content d-flex align-items-center gap-3 ">
          <img src={ava02} alt="avatar" className=" rounded" />
          <h6>Ləman Allahverdiyeva</h6>
        </div>

      </div>

      <div>

        <p className="review__text">
          "Sifariş etdiyim bütün yeməklər çox lezzətli və təzə idi. Yemək sifariş saytı çox rahat və intizamlı işləyir. Mənə çatdırılan hər bir yemək tam vaxtında və isti şəkildə gəldi. Təşəkkür edirəm!"
        </p>

        <div className="slider__content d-flex align-items-center gap-3 ">
          <img src={ava01} alt="avatar" className=" rounded" />
          <h6>Ayxan Əmirov</h6>
        </div>

      </div>

      <div>

        <p className="review__text">
          "Bu sayt üzərindən sifariş etdiyim ləvəngi toyuğun dadı mükəmməldi! Yeməklər çox təzə idi və mənim gözləntilərimdən daha yuxarı oldu. Azərbaycan milli mətbəxinin ən gözəl təamlarını burada tapmaq mənə sevinc yaşatdı. Çatdırılma prosesi də çox sürətli və mükəmməl idi. Təşəkkür edirəm."
        </p>

        <div className="slider__content d-flex align-items-center gap-3 ">
          <img src={ava03} alt="avatar" className=" rounded" />
          <h6>Murad Orucov</h6>
        </div>

      </div>

    </Slider>
  );
};

export default TestimonialSlider;
