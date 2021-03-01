import React, { useState, useEffect } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';
import Slide_Task_1 from '../Slide/Slide_Task_1';
import Slide_Task_2 from '../Slide/Slide_Task_2';
import Slide_Task_3 from '../Slide/Slide_Task_3';

const StickySlider = () => {
  const [swiper, updateSwiper] = useState(null);
  const [translate, updateTranslate] = useState(0);
  const [transition, updateTransition] = useState(0);

  const params = {
    slidesPerView: 2
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
      <div>
        <Slide_Task_1
          translate={translate}
          transition={transition}
          color={"#aac3bf"}
        >
          Task 1
        </Slide_Task_1>
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
        <Slide_Task_3
          translate={translate}
          transition={transition}
          color={"#d5a29c"}
        >
          Task 3
        </Slide_Task_3>
      </div>
    </Swiper>
  );
};

export default StickySlider;