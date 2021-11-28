
window.onload = function() {
  let insertRandomImage = document.getElementById('insertRandomImage');
  insertRandomImage.addEventListener('click', function() {
    console.log('insertRandomImage');
    let image = document.createElement('img');
    pictureName = randomNumberBetween1and14785() + '.jpg';
    image.src = './img_abbr/' + pictureName;
    document.body.appendChild(image);
  });
}

window.onload = function() {
  let insertRandomImages = document.getElementById('insertRandomImages');
  insertRandomImages.addEventListener('click', function() {
    let arrayOfElements = [];

    let newDivElement = document.createElement('div');
    console.log('insertRandomImages');
    for (let i = 0; i < 100; i++) {
      console.log(i);
      let image = document.createElement('img');
      pictureName = randomNumberBetween1and14785() + '.jpg';
      image.src = './img_abbr/' + pictureName;
      newDivElement.appendChild(image);
    }
    document.body.appendChild(newDivElement);



  });

}

function loadAndInsertImage(url, callback) {
    var img = new Image();
    img.onload = function() {
        callback(img);
    };
    img.src = url;
}


function randomNumberBetween1and14785() {
    return Math.floor(Math.random() * 14785) + 1;
}

