// Initialize the slider
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

function Slider() {
  // Set up initial position
  if (slides && slide.length > 0) {
    // Make first slide visible
    slides.scrollLeft = 0;

    // Set up button click handlers
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        const slideWidth = slide[0].clientWidth;
        slides.scrollBy({
          left: -slideWidth,
        });
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        const slideWidth = slide[0].clientWidth;
        slides.scrollBy({
          left: slideWidth,
        });
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", Slider);
