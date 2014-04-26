var upLeftX = 0;
var upLeftY = 0;
var totalWidth = 0;
var totalHeight = 0;
var zoom = 0;
var image = document.getElementById("hiddenImage");



function renderImage() {
    $("#mainCanvas").attr('width', $("#mainCanvas").attr('scrollWidth'));
    $("#mainCanvas").attr('height', $("#mainCanvas").attr('scrollHeight'));
    totalWidth = $('#hiddenImage').attr('width');
    totalHeight = $('#hiddenImage').attr('height');
    var ctx = document.getElementById('mainCanvas').getContext('2d');
    ctx.drawImage(document.getElementById("hiddenImage"), upLeftX, upLeftY, $("#mainCanvas").attr('scrollWidth'), $("#mainCanvas").attr('scrollHeight'), 0, 0, $("#mainCanvas").attr('scrollWidth'), $("#mainCanvas").attr('scrollHeight'));
}
function loadPicture() {
    $('#hiddenImage').attr('src', "Default2.aspx?viewPortX=" + document.getElementById('mainCanvas').scrollWidth +
        "&viewPortY=" + document.getElementById('mainCanvas').scrollHeight +
        "&zoomLevel=" + zoom);
    $('#hiddenImage').load(function () {
        renderImage();
    });
    /*$.ajax({
        type: "GET",
        url: 'Default2.aspx',
        data:
        {
            viewPortX: document.getElementById('mainCanvas').width,
            viewPortY: document.getElementById('mainCanvas').height,
            zoomLevel: zoom
        },
        dataType: "image/png",
        success: function (data) {
            $('#hiddenImage').attr('src', "data:image/png;base64," + data);
            image = $('#hiddenImage').attr('id');
            renderImage(image);
        }
    });*/
}
function moveVPRight() {
    if (upLeftX + document.getElementById('mainCanvas').scrollWidth + 40 <= totalWidth) {
        upLeftX += 40;
        renderImage();
    }
    else if (upLeftX + document.getElementById('mainCanvas').scrollWidth <= totalWidth) {
        upLeftX = totalWidth - document.getElementById('mainCanvas').width;
        renderImage();
    }
}
function moveVPLeft() {
    if (upLeftX - 40 >= 0) {
        upLeftX -= 40;
        renderImage();
    }
    else if (upLeftX > 0) {
        upLeftX = 0;
        renderImage();
    }
}
function moveVPDown() {
    if (upLeftY + document.getElementById('mainCanvas').scrollHeight + 40 <= totalHeight) {
        upLeftY += 40;
        renderImage();
    }
    else if (upLeftY + document.getElementById('mainCanvas').scrollHeight <= totalHeight) {
        upLeftY = totalHeight - document.getElementById('mainCanvas').height;
        renderImage();
    }
}
function moveVPUp() {
    if (upLeftY - 40 >= 0) {
        upLeftY -= 40;
        renderImage();
    }
    else if (upLeftY > 0) {
        upLeftY = 0;
        renderImage();
    }
}
function zoomIn() {
    if (zoom < 5) zoom++;
    loadPicture();
}

function zoomOut() {
    if (zoom > 0) zoom--;
    loadPicture();
}