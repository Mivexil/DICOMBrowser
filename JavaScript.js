var upLeftX = 0;
var upLeftY = 0;
var totalWidth = 0;
var totalHeight = 0;
var image = undefined;
function renderImage(img) {
    var ctx = document.getElementById('mainCanvas').getContext('2d');
    ctx.drawImage(img, upLeftX, upLeftY, document.getElementById('mainCanvas').width, document.getElementById('mainCanvas').height, 0, 0, document.getElementById('mainCanvas').width, document.getElementById('mainCanvas').height);
}
function loadPicture(pictureURL) {
    image = document.createElement('img');
    image.addEventListener('load', function() {
        totalWidth = image.width;
        totalHeight = image.height;
        renderImage(image);
    });
    image.src = pictureURL;
}
function moveVPRight() {
    if (upLeftX + document.getElementById('mainCanvas').width + 40 <= totalWidth) {
        upLeftX += 40;
        renderImage(image);
    }
    else if (upLeftX + document.getElementById('mainCanvas').width <= totalWidth) {
        upLeftX = totalWidth - document.getElementById('mainCanvas').width;
        renderImage(image);
    }
}
function moveVPLeft() {
    if (upLeftX - 40 >= 0) {
        upLeftX -= 40;
        renderImage(image);
    }
    else if (upLeftX > 0) {
        upLeftX = 0;
        renderImage(image);
    }
}
function moveVPDown() {
    if (upLeftY + document.getElementById('mainCanvas').height + 40 <= totalHeight) {
        upLeftY += 40;
        renderImage(image);
    }
    else if (upLeftY + document.getElementById('mainCanvas').height <= totalHeight) {
        upLeftY = totalHeight - document.getElementById('mainCanvas').height;
        renderImage(image);
    }
}
function moveVPUp() {
    if (upLeftY - 40 >= 0) {
        upLeftY -= 40;
        renderImage(image);
    }
    else if (upLeftY > 0) {
        upLeftY = 0;
        renderImage(image);
    }
}