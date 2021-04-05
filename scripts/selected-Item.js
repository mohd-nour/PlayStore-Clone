window.onload = pageLoad;

function pageLoad() {
  var leftBtn = document.getElementById("scrollLeft");
  var rightBtn = document.getElementById("scrollRight");
  leftBtn.onclick = scrollLeft;
  rightBtn.onclick = scrollRight;
}

function scrollRight() {
  slider = document.getElementsByClassName("slider-container")[0];
  width = slider.scrollWidth;
  xCoord = slider.scrollLeft;
  if (xCoord < width - 80) {
    slider.scroll({
      top: 0,
      left: xCoord + 80,
      behavior: 'smooth',
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
      behavior: 'smooth',
    });
  }
}
