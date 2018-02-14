var histoX = [];
var histoY = [];
var histo = [];
var resize = 0;
var canvas = document.getElementById("barSize");

$( document ).ready(function() {
    console.log( "Ready !" );
    display();
});

$( window ).resize(function() {
    resize++;
    var width = $( document ).width();
    var height = $( document ).height();
    var surface = height * width;
    histoX.push(width);
    histoY.push(height);
    histo.push({
        x: resize,
        y: surface
    });
    display();
    barSize();
    barSurface();
});

function display() {
    $("#width").text("Width : " + $( document ).width());
    $("#height").text("Height : " + $( document ).height());
    $("#window_size").text("Surface : " + $( document ).width() + " x " + $( document ).height());
    $("#resize_number").text("Resize number : " + resize);
}

function barSize() {
    canvas.width = $( document ).width() / 3;
    canvas.height = $( document ).height() / 2;

    var maxX = Math.max.apply(null, histoX);
    var maxY = Math.max.apply(null, histoY);
    var max = maxX > maxY ? maxX : maxY;
    var min = 0;

    var ratio = max / canvas.height;

    var plusX = canvas.width / resize;

    var currentX = 0;
    var currentY = canvas.height;

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (var i = 0; i < resize; i++) {
        ctx.moveTo(currentX, currentY);
        currentX += plusX;
        currentY = canvas.height - histoY[i] / ratio;
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
    currentX = 0;
    currentY = canvas.height;
    ctx.beginPath();
    for (var i = 0; i < resize; i++) {
        ctx.moveTo(currentX, currentY);
        currentX += plusX;
        currentY = canvas.height - histoX[i] / ratio;
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = "blue";
        ctx.stroke();
    }


}

function barSurface() {
    var chart = new CanvasJS.Chart("barSurface", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Surface Evolution"
        },
        axisY:{
            includeZero: true
        },
        axisX:{
            includeZero: true
        },
        data: [{
            type: "line",
            dataPoints: histo
        }]
    });
    chart.render();
}


