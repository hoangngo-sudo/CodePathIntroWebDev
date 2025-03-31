/*** Dark Mode ***/
document.addEventListener("DOMContentLoaded", function () {
  // Select the theme button
  let themeBtn = document.querySelector("#theme-btn");
  let darkmode = localStorage.getItem("darkmode");
  // Create a callback function

  const toggleThemeMode = () => {
    const currDarkmode = localStorage.getItem("darkmode");
    if (currDarkmode !== "active") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  };

  const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkmode", "active");
  };

  const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkmode", "null");
  };

  if (darkmode === "active") {
    enableDarkMode();
  }

  // Register a 'click' event listener for the theme button,
  // and tell it to use toggleThemeMode as its callback function
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleThemeMode);
  }
  //----------------------------------------------------//
  /*** Smooth Scrolling ***/
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    });
  });

  //----------------------------------------------------//

  /*** Image Modal ***/
  const modal = document.getElementById("imageModal");
  if (modal) {
    const modalImg = modal.querySelector(".modal-img");
    const closeBtn = modal.querySelector(".modal-close");
    const gridImages = document.querySelectorAll(
      ".image-grid img, .image-grid-span img"
    );

    // Function to open modal with specific image
    const openModal = (imgSrc, imgAlt) => {
      modalImg.src = imgSrc;
      modalImg.alt = imgAlt || "Image";
      modalImg.onload = () => {
        modal.classList.add("show");
      };
      document.body.style.overflow = "hidden";
    };

    // Function to close modal
    const closeModal = () => {
      modal.classList.remove("show");
      setTimeout(() => {
        modalImg.src = "";
      }, 300);
      document.body.style.overflow = "";
    };

    // Set up click handlers for grid images
    gridImages.forEach((img) => {
      img.addEventListener("click", function () {
        const fullSrc = this.getAttribute("data-src") || this.src;
        openModal(fullSrc, this.alt);
      });
    });

    // Close modal when clicking the close button
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    // Close modal when clicking outside the image
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
      }
    });

    // Mobile swipe to close
    let touchStartY = 0;
    let touchEndY = 0;

    modal.addEventListener(
      "touchstart",
      (e) => {
        touchStartY = e.changedTouches[0].screenY;
      },
      false
    );

    modal.addEventListener(
      "touchend",
      (e) => {
        touchEndY = e.changedTouches[0].screenY;
        if (touchEndY - touchStartY > 50) {
          closeModal();
        }
      },
      false
    );
  }

  //----------------------------------------------------//
  /*** Fade-In Animation Observer ***/
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

  //----------------------------------------------------//
  /*** Image Preloading ***/
  // Define the preloadImages function
  function preloadImages(array, waitForOtherResources, timeout) {
    var loaded = false,
      list = preloadImages.list || [],
      imgs = array.slice(0),
      t = timeout || 15 * 1000,
      timer;

    if (!preloadImages.list) {
      preloadImages.list = [];
    }

    if (!waitForOtherResources || document.readyState === "complete") {
      loadNow();
    } else {
      window.addEventListener("load", function () {
        clearTimeout(timer);
        loadNow();
      });
      // In case window.addEventListener doesn't get called (sometimes some resource gets stuck)
      // then preload the images anyway after timeout
      timer = setTimeout(loadNow, t);
    }

    function loadNow() {
      if (!loaded) {
        loaded = true;
        for (var i = 0; i < imgs.length; i++) {
          var img = new Image();
          img.onload =
            img.onerror =
            img.onabort =
              function () {
                var index = list.indexOf(this);
                if (index !== -1) {
                  // Remove image from the array once it's loaded
                  // for memory consumption reasons
                  list.splice(index, 1);
                }
              };
          list.push(img);
          img.src = imgs[i];
        }
      }
    }
  }

  // Preload high-resolution images for gallery
  function preloadGalleryImages() {
    // First, preload the visible images (initial view)
    const gridImages = document.querySelectorAll(
      ".image-grid img, .image-grid-span img"
    );
    const priorityImages = [];
    const secondaryImages = [];
    const lazyImages = [];

    gridImages.forEach((img, index) => {
      const fullSrc = img.getAttribute("data-src");
      if (fullSrc) {
        if (index < 6) {
          // First 6 images are priority
          priorityImages.push(fullSrc);
        } else if (index < 12) {
          // Next 6 are secondary
          secondaryImages.push(fullSrc);
        } else {
          // Rest are lazy loaded
          lazyImages.push(fullSrc);
        }
      }
    });

    // Preload priority images immediately
    if (priorityImages.length > 0) {
      preloadImages(priorityImages, false);
    }

    // Preload secondary images after a small delay
    if (secondaryImages.length > 0) {
      setTimeout(() => {
        preloadImages(secondaryImages, false);
      }, 2000);
    }

    // Preload remaining images after user has had time to interact
    if (lazyImages.length > 0) {
      setTimeout(() => {
        preloadImages(lazyImages, true);
      }, 5000);
    }
  }

  // Preload slider images
  function preloadSliderImages() {
    const sliderImages = document.querySelectorAll(".slider .slide");
    const sliderSrcs = Array.from(sliderImages).map((img) => img.src);

    if (sliderSrcs.length > 0) {
      preloadImages(sliderSrcs, true);
    }
  }

  // Initialize preloading
  setTimeout(preloadGalleryImages, 500); // Short delay to prioritize critical resources
  setTimeout(preloadSliderImages, 2000); // Delay slider preload

  // Add lazy load functionality to images that come into view
  const lazyImageOptions = {
    root: null,
    rootMargin: "200px", // Start loading when images are 200px from viewport
    threshold: 0.1,
  };

  const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const fullSrc = img.getAttribute("data-src");

        if (fullSrc) {
          // Preload the full resolution image
          preloadImages([fullSrc], false);
        }

        lazyImageObserver.unobserve(img);
      }
    });
  }, lazyImageOptions);

  // Observe all grid images for lazy loading their full-res versions
  gridImages.forEach((img) => {
    if (img.getAttribute("loading") === "lazy") {
      lazyImageObserver.observe(img);
    }
  });
});
