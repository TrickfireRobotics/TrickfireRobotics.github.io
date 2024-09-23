let imgIdx = 0;

//Gets all images and sets the one at the initial index to display.
const images = $("#galleryImagesContainer img");
images.get(imgIdx).style.display = "inline-block";

//Set click event listeners to set the current image
$("#backArrow").click(function () {
  setCurrImage(-1);
});

$("#forwardArrow").click(function () {
  setCurrImage(1);
});

function setCurrImage(idxMod) {
  //Modifies the imgIdx by the passed in idxMod.
  imgIdx += idxMod;

  //If the current image index is outside the bounds, reset it so the order wraps around.
  if (imgIdx < 0) imgIdx = images.length - 1;
  else if (imgIdx >= images.length) imgIdx = 0;

  //Set the display of all images to none except the one at the current index.
  images.each(function (i, obj) {
    obj.style.display = i === imgIdx ? "inline-block" : "none";
  });
}
