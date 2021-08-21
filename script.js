const gameBoard = document.querySelector(".gameBoard");
const gameImg = document.querySelectorAll(".game-img");
const result = document.querySelector("#result");
const scoreText = document.querySelector(".score-text");
const score = document.querySelector(".score");
const newBtn = document.querySelector(".new-btn");
let photoArray = []; // collects the selected photos
let overlayArray = []; // collects the selected photos' overlays
let choosenArray = []; // collects the matched photos
// for (var i = gameBoard.children.length; i >= 0; i--) {
//   gameBoard.appendChild(gameBoard.children[(Math.random() * i) | 0]);
// }
//
//
//
// Here starts the game
for (let i = 0; i < gameImg.length; i++) {
  // take each image-wrapper and check click event
  gameImg[i].addEventListener("click", function () {
    // function to check if the game is finished
    function checkGameFinish() {
      if (choosenArray.length === gameBoard.children.length) {
        scoreText.textContent = "You got'em all!🎉";
        gameBoard.style.display = "none";
        scoreText.classList.add("set-text");
        newBtn.style.display = "block";
      }
    }
    // function to check matchings
    function checkMatch() {
      if (
        // if they are really different but have same picture
        photoArray[0].parentElement !== photoArray[1].parentElement &&
        photoArray[0].getAttribute("src") === photoArray[1].getAttribute("src")
      ) {
        // collect all matched images for future use
        choosenArray.push(
          photoArray[0].parentElement,
          photoArray[1].parentElement
        );
        // set scores and score text
        scoreText.textContent = "WE got a Match!🥂";
        result.textContent = choosenArray.length;

        checkGameFinish(); // check if the game is finished
      } else {
        // if not same picture
        scoreText.textContent = "Try again!🤧";
        // rotate the image to the back and overlay to the front when not matched
        photoArray[0].style.transform = "rotateY(180deg)";
        overlayArray[0].style.transform = "rotateY(0deg)";
        photoArray[1].style.transform = "rotateY(180deg)";
        overlayArray[1].style.transform = "rotateY(0deg)";
      }
      photoArray = [];
      overlayArray = [];
    }
    // take all children of the wrapper class
    const gamePhotos = gameImg[i].children;
    // take out the photo element
    const gamePhoto = gamePhotos[0];
    // take out the overlay element
    const gameImgOverlay = gamePhotos[1];
    // when clicked turn the picture around to see
    gamePhoto.style.transform = "rotateY(0deg)";
    // and rotate the overlay to the back
    gameImgOverlay.style.transform = "rotateY(-180deg)";
    // if the image is not matched yet then take it
    if (!choosenArray.includes(gamePhoto.parentElement)) {
      photoArray.push(gamePhoto);
      overlayArray.push(gameImgOverlay);
    }
    // check for matching when 2 photos are selected and they are not already matched
    if (
      photoArray.length === 2 &&
      !choosenArray.includes(photoArray[0].parentElement) &&
      !choosenArray.includes(photoArray[1].parentElement)
    ) {
      setTimeout(checkMatch, 550);
    }
  });
}

newBtn.addEventListener("click", function () {
  location.reload();
});
