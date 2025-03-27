document.addEventListener("DOMContentLoaded", function () {
  // Use event delegation instead of attaching to every image
  document.addEventListener("click", function (event) {
    if (event.target.tagName === "IMG" && event.target.closest(".image-grid")) {
      event.preventDefault();
      // Small delay to prevent jank during rapid interactions
      requestAnimationFrame(function () {
        zoom.to({ element: event.target });
      });
    }
  });
});

//--------------------------------------------------//
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".image-grid img");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src && !img.src) {
            img.src = img.dataset.src;
            observer.unobserve(img); // Stop observing once loaded
          }
        }
      });
    },
    { rootMargin: "100px" }
  );

  images.forEach((img) => observer.observe(img));
});

//--------------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
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
});