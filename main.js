"use strict";
{
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("main-image");
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  const thumbnailContainer = document.querySelector(".container");
  let activeIndex = 0;
  let visibleStartIndex = 0;
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
    updateVisibleThumbnails();
  }

  function updateVisibleThumbnails() {
    const totalThumbnails = thumbnails.length;
    let startIndex = activeIndex - 1;

    if (startIndex < 0) startIndex = totalThumbnails - 1;
    if (startIndex + 2 >= totalThumbnails) startIndex = 0;

    thumbnails.forEach((thumb, i) => {
      if (
        i === startIndex ||
        i === (startIndex + 1) % totalThumbnails ||
        i === (startIndex + 2) % totalThumbnails
      ) {
        thumb.style.display = "inline-block";
      } else {
        thumb.style.display = "none";
      }
    });
  }

  //サムネイルクリックしたときに画像が切り替わる
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => switchImage(index));
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

  // //サムネイルのカルーセル用の矢印ボタン
  // const thumbNext = document.createElement("button");
  // thumbNext.textContent = ">";
  // thumbNext.classList.add("thumb-nav");
  // const thumbPrev = document.createElement("button");
  // thumbPrev.textContent = "<";
  // thumbPrev.classList.add("thumb-nav");

  // thumbnailContainer.parentNode.insertBefore(thumbPrev, thumbnailContainer);
  // thumbnailContainer.parentNode.insertBefore(
  //   thumbNext,
  //   thumbnailContainer.nextSibling
  // );

  // thumbNext.addEventListener("click", () => {
  //   if (visibleStartIndex + 3 < thumbnails.length) {
  //     visibleStartIndex++;
  //     updateVisibleThumbnails();
  //   }
  // });

  // thumbPrev.addEventListener("click", () => {
  //   if (visibleStartIndex > 0) {
  //     visibleStartIndex--;
  //     updateVisibleThumbnails();
  //   }
  // });

  //初期化
  switchImage(0);
  updateVisibleThumbnails();
}
