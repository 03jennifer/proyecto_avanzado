function autoplayCarousel() {
  const carouselEl = document.getElementById("carousel");
  const slideContainerEl = carouselEl.querySelector("#car-cont");
  const slideEl = carouselEl.querySelector(".caro");
  let slideWidth = slideEl.offsetWidth;

  // Add click handlers
  document.querySelector("#back-button").addEventListener("click", () => navigate("backward"));
  document.querySelector("#forward-button").addEventListener("click", () => navigate("forward"));
  
  document.querySelectorAll(".slide-indicator").forEach((dot, index) => {
    dot.addEventListener("click", () => navigate(index));
    dot.addEventListener("mouseenter", () => clearInterval(autoplay));
  });

  // Add keyboard handlers
  document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
      clearInterval(autoplay);
      navigate("backward");
    } else if (e.code === "ArrowRight") {
      clearInterval(autoplay);
      navigate("forward");
    }
  });

  // Add resize handler
  window.addEventListener("resize", () => {
    slideWidth = slideEl.offsetWidth;
  });

  // Autoplay
  let autoplay = setInterval(() => navigate("forward"), 10000);

  slideContainerEl.addEventListener("mouseenter", () => clearInterval(autoplay));

  // Slide transition
  const getNewScrollPosition = (arg) => {
    const gap = 10;
    const maxScrollLeft = slideContainerEl.scrollWidth - slideWidth;

    if (arg === "forward") {
      const x = slideContainerEl.scrollLeft + slideWidth + gap;
      return x <= maxScrollLeft ? x : 0; // Reset to first slide after the last one
    } else if (arg === "backward") {
      const x = slideContainerEl.scrollLeft - slideWidth - gap;
      return x >= 0 ? x : maxScrollLeft; // Go to last slide when going backward from the first
    } else if (typeof arg === "number") {
      const x = arg * (slideWidth + gap);
      return x;
    }
  };

  const navigate = (arg) => {
    slideContainerEl.scrollLeft = getNewScrollPosition(arg);
  };

  // Slide indicators
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const slideIndex = entry.target.dataset.slideindex;
        carouselEl.querySelector(".slide-indicator.active").classList.remove("active");
        carouselEl.querySelectorAll(".slide-indicator")[slideIndex].classList.add("active");
      }
    });
  }, { root: slideContainerEl, threshold: 0.1 });

  document.querySelectorAll(".caro").forEach((slide) => {
    slideObserver.observe(slide);
  });

  // Reset autoplay interval after user interaction
  function restartAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => navigate("forward"), 10000);
  }

  // Restart autoplay after mouse enters the carousel
  slideContainerEl.addEventListener("mouseenter", restartAutoplay);
}

autoplayCarousel();
