"use strict";
{
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("main-image");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  let activeIndex = 0;
  let intervalId;

  function switchImage(index) {
    activeIndex = index;
    mainImage.src = thumbnails[index].src;
    thumbnails.forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add("active");
      } else {
        thumb.classList.remove("active");
      }
    });
  }
  //サムネイルクリックしたときに画像が切り替わる
  thumbnails.forEach((thumbnails, index) => {
    thumbnails.addEventListener("click", () => switchImage(index));
  });

  //画像の自動切り替え
  function autoSwitch() {
    activeIndex = (activeIndex + 1) % thumbnails.length;
    switchImage(activeIndex);
  }

  function startAutoSwitch() {
    intervalId = setInterval(autoSwitch, 3000);
  }
  function stopAutoSwitch() {
    clearInterval(intervalId);
  }

  startAutoSwitch();
  mainImage.addEventListener("mouseenter", stopAutoSwitch);
  mainImage.addEventListener("mouseleave", startAutoSwitch);

  function updateSlide(direction) {
    activeIndex =
      (activeIndex + direction + thumbnails.length) % thumbnails.length;
    switchImage(activeIndex);
    stopAutoSwitch();
    startAutoSwitch();
  }
  //矢印をクリックで画像
  next.addEventListener("click", () => updateSlide(1));
  prev.addEventListener("click", () => updateSlide(-1));
}
