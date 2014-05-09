var upLeftX = 0;
var upLeftY = 0;
var totalWidth = 0;
var totalHeight = 0;
var realWidth = 0;
var realHeight = 0;
var zoom = 0;
var image = null;
var fileName = "";
var annotations = [];

//Set up the page after the whole DOM is loaded.
window.onload = function() {
    //Necessary so that the image doesn't stretch. Maybe add a waiting period here so that it doesn't fire too often.
    window.addEventListener("resize", function() {
        renderImage();
    });
    //Handle annotation viewing.
    $("#mainCanvas").bind("click", function (e) {
        //Refresh the image.
        renderImage();
        //Click coordinates, relative to upper-left corner of the canvas.
        var clickX = e.layerX;
        var clickY = e.layerY;
        //Do a hit-test for each annotation.
        for (var i = 0; i < annotations.length; i++) {
            var annotationX = annotations[i].rlX;
            var annotationY = annotations[i].rlY;
            //If hotspot is currently on canvas (otherwise rlX == rlY == null) and the click is inside the circle:
            if (annotations[i].rlX && annotations[i].rlY && (clickX - annotationX) * (clickX - annotationX) + (clickY - annotationY) * (clickY - annotationY) <= 8 * 8) {
                var ctx = $("#mainCanvas")[0].getContext('2d');
                ctx.font = "14px Arial";
                var textWidth = ctx.measureText(annotations[i].note);
                //Set upper-left corner of annotation rectangle to the center of the circle.
                var rectangleBaseX = annotationX;
                var rectangleBaseY = annotationY;
                //If the rectangle gets outside the screen, move it until it doesn't.
                while (rectangleBaseX + textWidth.width + 20 >= $("#mainCanvas").attr("scrollWidth")) {
                    rectangleBaseX -= 15;
                }
                while (rectangleBaseY + 40 >= $("#mainCanvas").attr("scrollHeight")) {
                    rectangleBaseY -= 15;
                }
                //Draw the rectangle in white.
                ctx.beginPath();
                ctx.rect(rectangleBaseX, rectangleBaseY, textWidth.width + 20, 40);
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.stroke();
                //Draw the text.
                ctx.fillStyle = "black";
                ctx.fillText(annotations[i].note, rectangleBaseX + 10, rectangleBaseY + 25);
            }
        }
    });
    //Bind the events to sliders.
    $("#brightnessrange").bind("change", function (e) {
        setBrightness(parseInt($(this).val()));
    });
    $("#contrastrange").bind("change", function (e) {
        setContrast(parseInt($(this).val()));
    });
    
    showList();
};

function setBrightness(b) {
    Caman("#hiddenImage", function () {
        //Undo the previous changes.
        this.revert();
        //Set relative brightness (b is <0; 100>, we need <-50; 50>).
        this.brightness(b - 50);
        //When done, refresh the image.
        this.render(function () {
            renderImage();
        });
    });
}

function setContrast(c) {
    //See setBrightness.
    Caman("#hiddenImage", function () {
        this.revert();
        this.contrast(c - 50);
        this.render(function () {
            renderImage();
        });
    });
}

function showList() {
    //Grab the list of files from the server.
    $.ajax({
        url: "Default3.aspx",
        dataType: "json",
        success: function(data) {
            var fileArray = data.files;
            //Wipe out the previous contents of the list (TODO necessary?)
            $("#linkList").empty();
            //For each file, add a link to show it.
            for (var index = 0; index < fileArray.length; index++) {
                $("#linkList").append("<a href=\"#\" onclick=\"fileName = \'" + fileArray[index].name + "\'; upLeftX = upLeftY = zoom = 0; loadPicture(); return false;\">" + fileArray[index].name + "</a>");
                $("#linkList").append("<br \>");
            }
            
        }
    });
}

function renderImage() {
    $("#mainCanvas")[0].getContext('2d').restore();
    //Set the width/height attributes of the canvas to actual width/height of the rendered element.
    $("#mainCanvas").attr('width', $("#mainCanvas").attr("scrollWidth"));
    $("#mainCanvas").attr('height', $("#mainCanvas").attr("scrollHeight"));
    //Get the full image's dimensions.
    totalWidth = $("#hiddenImage").attr("width");
    totalHeight = $("#hiddenImage").attr("height");
    var ctx = $("#mainCanvas")[0].getContext('2d');
    //Clip the image to canvas dimensions and draw it on canvas.
    ctx.drawImage($("#hiddenImage")[0], upLeftX, upLeftY, $("#mainCanvas").attr("scrollWidth"), $("#mainCanvas").attr("scrollHeight"), 0, 0, $("#mainCanvas").attr("scrollWidth"), $("#mainCanvas").attr("scrollHeight"));
    //Draw the annotation hotspots. For each annotation:
    for (var i = 0; i < annotations.length; i++) {
        //Calculate where it goes on the resized picture.
        var x = (totalWidth * annotations[i].x) / realWidth;
        var y = (totalHeight * annotations[i].y) / realHeight;
        //If it's visible, then:
        if (x >= upLeftX && y >= upLeftY && x < upLeftX + $("#mainCanvas").attr("scrollWidth") && y < upLeftY + $("#mainCanvas").attr("scrollHeight")) {
            //Get the coordinates relative to the canvas' upper-left corner.
            annotations[i].rlX = x - upLeftX;
            annotations[i].rlY = y - upLeftY;
            //Draw the circle.
            ctx.beginPath();
            ctx.arc(annotations[i].rlX, annotations[i].rlY, 8, 0, 2 * Math.PI, false);
            ctx.fillStyle = "red";
            ctx.fill();
        //If it's not visible, then mark it as such.
        } else {
            annotations[i].rlX = null;
            annotations[i].rlY = null;
        }
    }
    
}
function loadPicture() {
    //Because fuck CamanJS, we need to remove the Caman-created canvas and add the actual img element.
    $('#hiddenImage').remove();
    $('#hiddenPictures').append("<img id='hiddenImage' />");
    $("#hiddenImage").error(function () { alert("Error!"); });
    //Set the picture-fully-loaded handler.
    $('#hiddenImage').load(function () {
        //Get real image width/height for annotations.
        $.ajax({
            url: "Default4.aspx?fileName=" + fileName,
            dataType: "json",
            //async: false,
            success: function (data) {
                realWidth = data.x;
                realHeight = data.y;
                //Get the annotations.
                $.ajax({
                    url: "Default5.aspx?fileName=" + fileName,
                    dataType: "json",
                    success: function(d) {
                        annotations = d.annotations;
                        renderImage();
                    }
                })
            }
        });
        //Re-set image parameters.
        setBrightness(parseInt($("#brightnessrange").val()));
        setContrast(parseInt($("#contrastrange").val()));
        renderImage();
    });
    //Load the picture.
    $('#hiddenImage').attr("src", "Default2.aspx?viewPortX=" + $("#mainCanvas")[0].scrollWidth +
        "&viewPortY=" + $("#mainCanvas")[0].scrollHeight +
        "&zoomLevel=" + zoom +
        "&fileName=" + fileName);
}
function moveVPRight() {
    if (upLeftX + $("#mainCanvas")[0].scrollWidth + 40 <= totalWidth) {
        upLeftX += 40;
        renderImage();
    }
    else if (upLeftX + $("#mainCanvas")[0].scrollWidth <= totalWidth) {
        upLeftX = totalWidth - $("#mainCanvas")[0].width;
        renderImage();
    }
}
function moveVPLeft() {
    //Move by 40 pixels if possible,
    if (upLeftX - 40 >= 0) {
        upLeftX -= 40;
        renderImage();
    }
    //otherwise move as far as you can.
    else if (upLeftX > 0) {
        upLeftX = 0;
        renderImage();
    }
}
function moveVPDown() {
    if (upLeftY + $("#mainCanvas")[0].scrollHeight + 40 <= totalHeight) {
        upLeftY += 40;
        renderImage();
    }
    else if (upLeftY + $("#mainCanvas")[0].scrollHeight <= totalHeight) {
        upLeftY = totalHeight - $("#mainCanvas")[0].height;
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
    if (zoom < 10) {
        zoom++;
        loadPicture();
    }
}

function zoomOut() {
    if (zoom > 0) {
        zoom--;
        loadPicture();
    }
}