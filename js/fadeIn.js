const fadeInElements = document.querySelectorAll(".fade-in");

const options = {
  root: null, // Use the viewport as the container
  rootMargin: "0px",
  threshold: 0.05, // Trigger when 5% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible"); // Fade in
      entry.target.classList.remove("hidden"); // Ensure hidden class is removed
    } else {
      entry.target.classList.remove("visible"); // Fade out
      entry.target.classList.add("hidden"); // Ensure hidden class is added
    }
  });
}, options);

fadeInElements.forEach((element) => {
  observer.observe(element); // Observe each fade-in element
});
