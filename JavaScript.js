﻿var upLeftX = 0;
var upLeftY = 0;
var totalWidth = 0;
var totalHeight = 0;
var realWidth = 0;
var realHeight = 0;
var zoom = 0;
var image = null;
var fileName = "";

window.onload = function() {
    image = document.getElementById("hiddenImage");
    
    $("#brightnessrange").bind('change', function (e) {
        var brightness = parseInt($(this).val());
        setBrightness(brightness);
    });
    $("#contrastrange").bind('change', function (e) {
        var contrast = parseInt($(this).val());
        setContrast(contrast);
    });
    showList();
};

function setBrightness(b) {
    Caman("#hiddenImage", function () {
        this.revert();
        this.brightness(b - 50);
        this.render(function () {
            renderImage();
        });
    });
}

function setContrast(c) {
    Caman("#hiddenImage", function () {
        this.revert();
        this.contrast(c - 50);
        this.render(function () {
            renderImage();
        });
    });
}

function showList() {
    $.ajax({
        url: "Default3.aspx",
        dataType: "json",
        success: function(data) {
            var fileArray = data.files;
            $("#linkList").empty();
            for (var index = 0; index < fileArray.length; index++) {
                $("#linkList").append("<a href=\"#\" onclick=\"fileName = \'" + fileArray[index].name + "\'; upLeftX = upLeftY = zoom = 0; loadPicture(); return false;\">" + fileArray[index].name + "</a>");
                $("#linkList").append("<br \>");
            }
            
        }
    });
}

function renderImage() {
    $("#mainCanvas").attr('width', $("#mainCanvas").attr('scrollWidth'));
    $("#mainCanvas").attr('height', $("#mainCanvas").attr('scrollHeight'));
    totalWidth = $('#hiddenImage').attr('width');
    totalHeight = $('#hiddenImage').attr('height');
    var ctx = document.getElementById('mainCanvas').getContext('2d');
    ctx.drawImage(document.getElementById("hiddenImage"), upLeftX, upLeftY, $("#mainCanvas").attr('scrollWidth'), $("#mainCanvas").attr('scrollHeight'), 0, 0, $("#mainCanvas").attr('scrollWidth'), $("#mainCanvas").attr('scrollHeight'));
}
function loadPicture() {
    $('#hiddenImage').remove();
    $('#hiddenPictures').append("<img id='hiddenImage' />");
    $("#hiddenImage").error(function () { alert("Error!"); });
    $('#hiddenImage').load(function () {
        $.ajax({
            url: "Default4.aspx?fileName=" + fileName,
            dataType: "json",
            async: false,
            success: function (data) {
                realWidth = data.x;
                realHeight = data.y;
            }
        });
        setBrightness(parseInt($("#brightnessrange").val()));
        setContrast(parseInt($("#contrastrange").val()));
        renderImage();
    });
    $('#hiddenImage').attr('src', "Default2.aspx?viewPortX=" + document.getElementById('mainCanvas').scrollWidth +
        "&viewPortY=" + document.getElementById('mainCanvas').scrollHeight +
        "&zoomLevel=" + zoom +
        "&fileName=" + fileName);
    /*Caman("#hiddenImage", "/Default2.aspx?viewPortX=" + document.getElementById('mainCanvas').scrollWidth +
        "&viewPortY=" + document.getElementById('mainCanvas').scrollHeight +
        "&zoomLevel=" + zoom +
        "&fileName=" + fileName, function (e) {
            this.brightness(0);
            this.render(function() {
                alert($("#hiddenImage").attr("width")); renderImage(); });
        } );*/

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
    if (zoom < 10) zoom++;
    loadPicture();
}

function zoomOut() {
    if (zoom > 0) zoom--;
    loadPicture();
}