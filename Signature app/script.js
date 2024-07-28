const colorpicker = document.getElementById('colorpicker');
const canvascolor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const clear = document.getElementById('clearbutton');
const save = document.getElementById('savebutton');
const retrieve = document.getElementById('retrievebutton');
const fontpicker = document.getElementById('fontSize');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

colorpicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseleave', () => isDrawing = false);

clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

save.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.png';
    link.click();
});

retrieve.addEventListener('click', () => {
    const dataURL = localStorage.getItem('savedSignature');
    if (dataURL) {
        const img = new Image();
        img.src = dataURL;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    } else {
        alert('No saved signature found.');
    }
});

// fontpicker.addEventListener('change', (e) => {
//     ctx.font = `${e.target.value} Arial`;
// });

canvascolor.addEventListener('change', (e) => {
    canvas.style.backgroundColor = e.target.value;
});

fontpicker.addEventListener('changee', (e) => {
    ctx.linewidth = e.target.value;
});