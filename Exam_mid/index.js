const hamburger = document.querySelector(".hamburger");
const menu = document.getElementById("nav-items");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

document.addEventListener("click", function(e){
  if(!menu.contains(e.target) && !hamburger.contains(e.target)){
    menu.classList.remove("active");
  }
});
$(document).ready(function () {
  const $track = $("#carousel-track");
  const $cards = $(".feature");
  const totalCards = $cards.length;
  let currentIndex = 0;
  let autoPlayTimer;

  // Function to move the track
  function updateCarousel() {
    // Get width of a card (including the gap)
    const cardWidth = $cards.outerWidth(true);
    const newPosition = -(currentIndex * cardWidth);

    $track.css("transform", `translateX(${newPosition}px)`);

    // Dynamic Counter: Updates "Showing 1 of 4"
    $("#slide-counter").text(`Showing ${currentIndex + 1} of ${totalCards}`);
  }

  // Next Button Logic with Infinite Loop
  $("#nextBtn").on("click", function () {
    currentIndex++;
    if (currentIndex >= totalCards) {
      currentIndex = 0; // Infinite: loop back to first
    }
    updateCarousel();
  });

  // Prev Button Logic with Infinite Loop
  $("#prevBtn").on("click", function () {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalCards - 1; // Infinite: loop to last
    }
    updateCarousel();
  });

  // --- AI-Enhanced Feature: Auto-play & Pause on Hover ---
  
  function startAutoPlay() {
    autoPlayTimer = setInterval(function () {
      $("#nextBtn").click(); // Triggers the next button click
    }, 5000); // 5 seconds
  }

  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  // Start on load
  startAutoPlay();

  // Pause when mouse is over any product card
  $(".feature").on("mouseenter", function () {
    stopAutoPlay();
  });

  // Resume when mouse leaves
  $(".feature").on("mouseleave", function () {
    startAutoPlay();
  });

  // Adjust positioning if user resizes browser window
  $(window).on("resize", function () {
    updateCarousel();
  });
});


