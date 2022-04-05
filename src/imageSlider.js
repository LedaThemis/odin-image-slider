import './imageSlider.css';

import prevArrow from './icons/arrow_back.svg';
import nextArrow from './icons/arrow_forward.svg';

import dot from './icons/dot.svg';
import dotFilled from './icons/dot_filled.svg';

import forest from './images/forest.jpg';
import lake from './images/lake.jpg';
import mountain from './images/mountain.jpg';
import park from './images/park.jpg';
import sky from './images/sky.jpg';

const imageSlider = () => {
  let CURRENT_IMAGE_ID = 0;
  const imageList = [forest, lake, mountain, park, sky];

  const getImageHTML = (src) => {
    const img = document.createElement('img');
    img.src = src;

    return img;
  };

  const getDotHTML = (isFilled, id) => {
    const button = document.createElement('button');
    button.classList.add('navigation-dots');
    const img = document.createElement('img');
    img.classList.add('navigation-icons');

    if (isFilled) {
      img.src = dotFilled;
    } else {
      img.src = dot;
    }

    button.appendChild(img);
    button.addEventListener('click', (e) => DOMHandlers.handleDotClick(e, id));

    return button;
  };

  const populateImageContainer = (imageList) => {
    const imageContainer = document.querySelector('#image-container');
    imageContainer.replaceChildren();
    imageList.forEach((imageSource) => {
      imageContainer.appendChild(getImageHTML(imageSource));
    });
    renderImages(imageList);
  };

  const renderImages = () => {
    const imageContainer = document.querySelector('#image-container');
    imageContainer.childNodes.forEach((imgElement, i) => {
      if (CURRENT_IMAGE_ID === i) {
        imgElement.style.display = '';
        imgElement.classList.add('displayed-image');
        setTimeout(() => {
          imgElement.classList.remove('displayed-image');
        }, 10);
      } else {
        imgElement.style.display = 'none';
        imgElement.classList.remove('displayed-image');
      }
    });

    renderDots(imageList.length);
  };

  const renderDots = (count) => {
    const dotsContainer = document.querySelector('#dots-container');
    dotsContainer.replaceChildren();

    for (let i = 0; i < count; i++) {
      const isFilled = i === CURRENT_IMAGE_ID;
      const dotHTML = getDotHTML(isFilled, i);
      dotsContainer.appendChild(dotHTML);
    }
  };

  const helpers = (() => {
    const prevImage = () => {
      if (CURRENT_IMAGE_ID === 0) {
        CURRENT_IMAGE_ID = imageList.length - 1;
      } else {
        CURRENT_IMAGE_ID--;
      }
    };
    const nextImage = () => {
      if (CURRENT_IMAGE_ID === imageList.length - 1) {
        CURRENT_IMAGE_ID = 0;
      } else {
        CURRENT_IMAGE_ID++;
      }
    };
    return {
      prevImage,
      nextImage,
    };
  })();

  const DOMHandlers = (() => {
    const handleNextButtonClick = () => {
      helpers.nextImage();
      renderImages(imageList);
    };

    const handlePreviousButtonClick = () => {
      helpers.prevImage();
      renderImages(imageList);
    };

    const handleDotClick = (e, id) => {
      CURRENT_IMAGE_ID = id;
      renderImages(imageList);
    };

    return {
      handleNextButtonClick,
      handlePreviousButtonClick,
      handleDotClick,
    };
  })();

  const DOM = (() => {
    const nextButtonImage = document.querySelector('#next-button > img');
    const previousButtonImage = document.querySelector('#previous-button > img');
    nextButtonImage.src = nextArrow;
    previousButtonImage.src = prevArrow;

    const nextButton = document.querySelector('#next-button');
    const previousButton = document.querySelector('#previous-button');

    nextButton.addEventListener('click', DOMHandlers.handleNextButtonClick);
    previousButton.addEventListener('click', DOMHandlers.handlePreviousButtonClick);
  })();

  populateImageContainer(imageList);
  renderDots(imageList.length);

  //   setInterval(() => {
  //     helpers.nextImage();
  //     renderImages(imageList);
  //   }, 5000);
};

export default imageSlider;
