const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const zoom = document.getElementById("zoom");
const downloadBtn = document.getElementById("download");

const frame = new Image();
frame.src = "frame.png";

let userImage = new Image();
let scale = 1;

// ছবির অবস্থান
let imgX = 0;
let imgY = 0;

// drag state
let isDragging = false;
let startX, startY;

upload.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        userImage.src = reader.result;
        userImage.onload = () => {
            imgX = canvas.width / 2;
            imgY = canvas.height / 2;
            draw();
        };
    };
    reader.readAsDataURL(file);
});

zoom.addEventListener("input", function () {
    scale = zoom.value;
    draw();
});

// 🖱️ Mouse events
canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.offsetX - imgX;
    startY = e.offsetY - imgY;
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    imgX = e.offsetX - startX;
    imgY = e.offsetY - startY;
    draw();
});

canvas.addEventListener("mouseup", () => isDragging = false);
canvas.addEventListener("mouseleave", () => isDragging = false);

// 📱 Touch events (mobile)
canvas.addEventListener("touchstart", (e) => {
    isDragging = true;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    startX = touch.clientX - rect.left - imgX;
    startY = touch.clientY - rect.top - imgY;
});

canvas.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    imgX = touch.clientX - rect.left - startX;
    imgY = touch.clientY - rect.top - startY;
    draw();
});

canvas.addEventListener("touchend", () => isDragging = false);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const size = canvas.width * scale;

    ctx.drawImage(
        userImage,
        imgX - size / 2,
        imgY - size / 2,
        size,
        size
    );

    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
}

downloadBtn.addEventListener("click", function () {
    const link = document.createElement("a");
    link.download = "framed-photo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
