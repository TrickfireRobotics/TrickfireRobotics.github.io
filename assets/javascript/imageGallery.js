let imgIdx = 0;
const images = $("#galleryImagesContainer img");
images.get(imgIdx).style.display = "inline-block";

$("#backArrow").click(function () {
  imgIdx--;
  setCurrImage();
});

$("#forwardArrow").click(function () {
  imgIdx++;
  setCurrImage();
});

function setCurrImage() {
  if (imgIdx < 0) imgIdx = images.length - 1;
  else if (imgIdx >= images.length) imgIdx = 0;
  images.each(function (i, obj) {
    obj.style.display = i === imgIdx ? "inline-block" : "none";
  });
}
