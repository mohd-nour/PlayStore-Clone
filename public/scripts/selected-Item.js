window.onload = pageLoad;
var isOpen = false;

function pageLoad() {
  var leftBtn = document.getElementById("scrollLeft");
  var rightBtn = document.getElementById("scrollRight");
  var readmore = document.getElementById("read-more");
  var showHidden = document.getElementsByClassName("showHidden")[0];
  var readMoreReviews = document.getElementById("read-more-reviews");
  if (leftBtn) {
    leftBtn.onclick = scrollLeft;
  }
  if (rightBtn) {
    rightBtn.onclick = scrollRight;
  }
  if (readmore) {
    readmore.onclick = readMore;
  }
  if (showHidden) {
    showHidden.onclick = showContent;
  }
  if (readMoreReviews) {
    readMoreReviews.onclick = readAllReviews;
  }
}

function scrollRight() {
  slider = document.getElementsByClassName("slider-container")[0];
  width = slider.scrollWidth;
  xCoord = slider.scrollLeft;
  if (xCoord < width - 80) {
    slider.scroll({
      top: 0,
      left: xCoord + 80,
      behavior: "smooth",
    });
  }
}

function scrollLeft() {
  slider = document.getElementsByClassName("slider-container")[0];
  width = slider.scrollWidth;
  xCoord = slider.scrollLeft;
  if (xCoord > 80) {
    slider.scroll({
      top: 0,
      left: xCoord - 80,
      behavior: "smooth",
    });
  }
}

function readMore() {
  var desc = document.getElementsByClassName("description-text")[0];
  if (isOpen) {
    desc.style.maxHeight = "140px";
    document.getElementById("read-more").innerHTML = "READ MORE";
    isOpen = false;
  } else {
    desc.style.maxHeight = "100%";
    document.getElementById("read-more").innerHTML = "COLLAPSE";
    isOpen = true;
  }
}

function showContent(event) {
  event.target.style.display = "none";
  document.getElementById("hidden1").style.display = "contents";
}

function readAllReviews() {
  document.getElementsByClassName("review-list")[0].style.height = "auto";
  document.getElementById("read-more-reviews").style.display = "none";
}
