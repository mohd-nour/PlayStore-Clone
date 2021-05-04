function getRating(rating) {

  alert("here");

  starsTotal = 5;

  starPercentage = (rating / starsTotal) * 100;

  return starPercentageRounded = Math.round(starPercentage / 10) * 10 + "%";
}
