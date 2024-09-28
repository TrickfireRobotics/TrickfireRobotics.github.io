async function getInstagramPosts() {
  let data = localStorage.getItem("instagramResponse");
  const photoContainer = $("#photoContainer");
  photoContainer.empty();
  try {
    //Only attempt to fetch if the JSON data isn't present in local storage.
    if (!data) {
      const response = await fetch(
        "https://feeds.behold.so/RDUuEeFTbzDrOFPKj7TZ"
      );
      if (response.ok) {
        data = JSON.stringify(await response.json());
        localStorage.setItem("instagramResponse", data);
      } else {
        throw new Error("Error recieving behold fetch");
      }
    }

    //Parses the JSON and renders each post.
    JSON.parse(data).posts.forEach((post) => {
      const link = $(`<a href = '${post.permalink}' target = '_blank'></a>`);
      const icon = $(
        `<img class = "postIconOverlay" src = "assets/images/icons/InstagramIcon.svg" alt = "Instagram icon"/>`
      );
      const picture = $(`<img src = "${post.sizes.small.mediaUrl}" srcset =
        "${post.sizes.small.mediaUrl} 768w, ${post.sizes.medium.mediaUrl} 1200w" alt = "${post.caption}"/>`);

      link.append(icon);
      link.append(picture);
      photoContainer.append(link);
    });
  } catch (err) {
    console.log(err);

    //Renders an error mesage and retry button.
    const instagramLink = $(
      "<a id = 'errorInstagramLink' href = 'https://www.instagram.com/trickfirerobotics/?hl=en' target = '_blank'>Go to Instagram</a>"
    );
    photoContainer.append(instagramLink);
  }
}
getInstagramPosts();
