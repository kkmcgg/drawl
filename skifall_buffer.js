const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let rightFeet = [];
let leftFeet = [];

canvas.addEventListener('mousedown', function(event) {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', function(event) {
    if (isDrawing) {
        const x = event.offsetX;
        const y = event.offsetY;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 125, 255, 0.5)";
        ctx.arc(lastX, lastY, 25, 0, 2 * Math.PI);
        ctx.fill();

        const angle = Math.atan2(y - lastY, x - lastX);
        const point1x = lastX + 25 * Math.cos(angle + Math.PI / 2);
        const point1y = lastY + 25 * Math.sin(angle + Math.PI / 2);
        const point2x = lastX + 25 * Math.cos(angle - Math.PI / 2);
        const point2y = lastY + 25 * Math.sin(angle - Math.PI / 2);

        rightFeet.push({x: point1x, y: point1y});
        leftFeet.push({x: point2x, y: point2y});

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(point1x, point1y, 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point2x, point2y, 2, 0, 2 * Math.PI);
        ctx.fill();

        lastX = x;
        lastY = y;
    }
});

canvas.addEventListener('mouseup', function(event) {
    isDrawing = false;

    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    ctx.arc(lastX, lastY, 25, 0, 2 * Math.PI);
    ctx.fill();

    const angle = Math.atan2(lastY - lastY, event.offsetX - lastX);
    const point1x = lastX + 25 * Math.cos(angle + Math.PI / 2);
    const point1y = lastY + 25 * Math.sin(angle + Math.PI / 2);
    const point2x = lastX + 25 * Math.cos(angle - Math.PI / 2);
    const point2y = lastY + 25 * Math.sin(angle - Math.PI / 2);

    rightFeet.push({x: point1x, y: point1y});
    leftFeet.push({x: point2x, y: point2y});

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(point1x, point1y, 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(point2x, point2y, 2, 0, 2 * Math.PI);
    ctx.fill();

// Connect right and left feet points to form two lines per line segment
    for (let i = 1; i < rightFeet.length; i++) {
        ctx.beginPath();
        ctx.moveTo(rightFeet[i-1].x, rightFeet[i-1].y);
        ctx.lineTo(rightFeet[i].x, rightFeet[i].y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(leftFeet[i-1].x, leftFeet[i-1].y);
        ctx.lineTo(leftFeet[i].x, leftFeet[i].y);
        ctx.stroke();
    }

    // Clear the right and left feet lists for the next line
    rightFeet = [];
    leftFeet = [];
});
