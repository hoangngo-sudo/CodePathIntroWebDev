function Slider() {
  const slides = document.querySelector(".slides");
  const slideElements = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");

  if (!slides || slideElements.length === 0) return;
  
  let currentIndex = 0;
  const maxIndex = slideElements.length - 1;
  
  // Update button states based on current position
  function updateButtonStates() {
    // Disable prev button at beginning
    if (currentIndex === 0) {
      prevButton.classList.add("disabled");
    } else {
      prevButton.classList.remove("disabled");
    }
    
    // Disable next button at end
    if (currentIndex === maxIndex) {
      nextButton.classList.add("disabled");
    } else {
      nextButton.classList.remove("disabled");
    }
  }
  
  // Initial button state
  updateButtonStates();
  
  // Previous button click handler
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        slides.scrollTo({
          left: currentIndex * slideElements[0].offsetWidth,
          behavior: 'smooth'
        });
        updateButtonStates();
      }
    });
  }
  
  // Next button click handler
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        slides.scrollTo({
          left: currentIndex * slideElements[0].offsetWidth,
          behavior: 'smooth'
        });
        updateButtonStates();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", Slider);