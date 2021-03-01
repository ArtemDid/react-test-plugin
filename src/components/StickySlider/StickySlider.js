import React, { useState, useEffect } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
import Slide from '../Slide/Slide';
import Slide_Task_2 from '../Slide/Slide_Task_2';


import data from '../../data';

const StickySlider = () => {
  const [swiper, updateSwiper] = useState(null);
  const [translate, updateTranslate] = useState(0);
  const [transition, updateTransition] = useState(0);

  const params = {
    slidesPerView: 3,
  };

  useEffect(() => {
    if (swiper) {
      swiper.on('setTranslate', (t) => {
        updateTranslate(t);
      });
      swiper.on('setTransition', (t) => {
        updateTransition(t);
      });
    }
  }, [swiper]);

  return (
    <Swiper getSwiper={updateSwiper} {...params}>
      {/* {data.map((item, idx) => (
        <div key={idx}>
          <Slide
            translate={translate}
            transition={transition}
            color={item.color}
          >
            {item.title}
          </Slide>
        </div>
      ))} */}

      <div>
        <Slide
          translate={translate}
          transition={transition}
          color={"#aac3bf"}
        >
          Task 1
        </Slide>
      </div>
      <div>
        <Slide_Task_2
          translate={translate}
          transition={transition}
          color={"#c9b1bd"}
        >
          Task 2
        </Slide_Task_2>
      </div>
      <div>
        <Slide
          translate={translate}
          transition={transition}
          color={"#d5a29c"}
        >
          Task 3
        </Slide>
      </div>
    </Swiper>
  );
};

export default StickySlider;