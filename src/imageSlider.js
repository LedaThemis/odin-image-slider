import './imageSlider.css';

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
      } else {
        imgElement.style.display = 'none';
      }
    });
  };

  const helpers = (() => {
    const prevImage = () => {
      if (CURRENT_IMAGE_ID === imageList.length - 1) {
        CURRENT_IMAGE_ID = 0;
      } else {
        CURRENT_IMAGE_ID++;
      }
    };
    const nextImage = () => {
      if (CURRENT_IMAGE_ID === 0) {
        CURRENT_IMAGE_ID = imageList.length - 1;
      } else {
        CURRENT_IMAGE_ID--;
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

    return {
      handleNextButtonClick,
      handlePreviousButtonClick,
    };
  })();

  const DOM = (() => {
    const nextButton = document.querySelector('#next-button');
    const previousButton = document.querySelector('#previous-button');

    nextButton.addEventListener('click', DOMHandlers.handleNextButtonClick);
    previousButton.addEventListener('click', DOMHandlers.handlePreviousButtonClick);
  })();

  populateImageContainer(imageList);
};

export default imageSlider;
