document.querySelectorAll(".fa-thumbs-up").forEach((elem, index) => {
  elem.id = "up-" + index;
  elem.onclick = rate;
});
document.querySelectorAll(".fa-thumbs-down").forEach((elem, index) => {
  elem.id = "down-" + index;
  elem.onclick = derate;
});

function rate(event) {
  var i = event.target.id.substring(3);
  var like = document.querySelectorAll(".fa-thumbs-up")[i];
  if (like.classList.contains("clicked")) {
    like.classList.remove("clicked");
    var nbLikes = like.parentElement.children[1];
    var newlikes = parseInt(nbLikes.innerText) - 1;
    nbLikes.innerText = newlikes;
  } else {
    like.classList.add("clicked");
    var nbLikes = like.parentElement.children[1];
    var newlikes = parseInt(nbLikes.innerText) + 1;
    nbLikes.innerText = newlikes;
  }
}

function derate(event) {
  var i = event.target.id.substring(5);
  var dislike = document.querySelectorAll(".fa-thumbs-down")[i];
  if (dislike.classList.contains("clicked")) {
    dislike.classList.remove("clicked");
    var nbLikes = dislike.parentElement.children[1];
    var newlikes = parseInt(nbLikes.innerText) - 1;
    nbLikes.innerText = newlikes;
  } else {
    dislike.classList.add("clicked");
    var nbLikes = dislike.parentElement.children[1];
    var newlikes = parseInt(nbLikes.innerText) + 1;
    nbLikes.innerText = newlikes;
  }
}
