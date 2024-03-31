import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you have CSS styles for your slider
import reactSVG from "./assets/react.svg"


function Slider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [numberOfSlides, setNumberOfSlides] = useState(5);

  useEffect(() => {
    const handleSlideChange = () => {
      console.log('slide changed !');
      const activeDot = document.querySelector('.nav-dot.active');
      if (activeDot) activeDot.classList.remove('active');
      const newActiveDot = document.querySelector(`.nav-dot[data-slide="${activeSlide + 1}"]`);
      if (newActiveDot) newActiveDot.classList.add('active');
    };

    const nextSlide = () => {
      setActiveSlide(prevSlide => {
        const nextSlideIndex = prevSlide + 1;
        if (nextSlideIndex >= numberOfSlides || nextSlideIndex <= -1) {
          firstSlide();
        } else {
          goToSlide(nextSlideIndex);
        }
        return nextSlideIndex;
      });
    };

    const prevSlide = () => {
      setActiveSlide(prevSlide => {
        const prevSlideIndex = prevSlide - 1;
        if (prevSlideIndex < 0) {
          lastSlide();
        } else {
          goToSlide(prevSlideIndex);
        }
        return prevSlideIndex;
      });
    };

    const firstSlide = () => {
      setActiveSlide(0);
    };

    const lastSlide = () => {
      setActiveSlide(numberOfSlides - 1);
    };

    const goToSlide = (slideIndex) => {
      setActiveSlide(slideIndex);
    };

    // Attach event listeners
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.slide) - 1);
      });
    });

    const nextBtn = document.querySelector('.next-btn');
    nextBtn.addEventListener('click', nextSlide);

    const prevBtn = document.querySelector('.prev-btn');
    prevBtn.addEventListener('click', prevSlide);

    // Cleanup function
    return () => {
      // Remove event listeners to prevent memory leaks
      navDots.forEach(dot => {
        dot.removeEventListener('click', () => {
          goToSlide(parseInt(dot.dataset.slide) - 1);
        });
      });
      nextBtn.removeEventListener('click', nextSlide);
      prevBtn.removeEventListener('click', prevSlide);
    };

  }, [activeSlide, numberOfSlides]);

  return (
    <div className="wrapper">
      <div className="prev-btn">
        <span className="fa fa-angle-up"></span>
      </div>
      <div className="next-btn">
        <span className="fa fa-angle-down"></span>
      </div>
      <div className="nav-dots">
        {Array.from({ length: numberOfSlides }, (_, index) => (
          <div key={index + 1} className={`nav-dot${activeSlide === index ? ' active' : ''}`} data-slide={index + 1}></div>
        ))}
      </div>
      {Array.from({ length: numberOfSlides }, (_, index) => (
        <div key={index + 1} className={`panel${activeSlide === index ? ' _active' : ''}`} data-slide={index + 1}>
          <div className="trans-layer" id={'layer-' + (index + 1)}></div>
          <section className="section" id={'section-' + (index + 1)}>
            <div className="section-content">
              <h1>{activeSlide === 0 ? (    <>
      <img src={reactSVG} alt="React 1" />
      
      {/* Add more images as needed */}
    </>): `Section ${index + 1}`}</h1>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}

export default Slider;
