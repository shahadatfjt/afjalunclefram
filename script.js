const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const zoom = document.getElementById("zoom");
const downloadBtn = document.getElementById("download");

const frame = new Image();
frame.src = "frame.png";

let userImage = new Image();
let scale = 1;

// image position
let imgX = canvas.width / 2;
let imgY = canvas.height / 2;

// drag state
let isDragging = false;
let startX, startY;

// original image size
let imgW = 0;
let imgH = 0;

upload.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        userImage.src = reader.result;
        userImage.onload = () => {

            // 🔥 original image size (ratio ঠিক থাকবে)
            const ratio = Math.min(
                canvas.width / userImage.width,
                canvas.height / userImage.height
            );

            imgW = userImage.width * ratio;
            imgH = userImage.height * ratio;

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

// Mouse drag
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

// Touch support
canvas.addEventListener("touchstart", (e) => {
    isDragging = true;
    const t = e.touches[0];
    const r = canvas.getBoundingClientRect();
    startX = t.clientX - r.left - imgX;
    startY = t.clientY - r.top - imgY;
});

canvas.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const t = e.touches[0];
    const r = canvas.getBoundingClientRect();
    imgX = t.clientX - r.left - startX;
    imgY = t.clientY - r.top - startY;
    draw();
});

canvas.addEventListener("touchend", () => isDragging = false);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        userImage,
        imgX - (imgW * scale) / 2,
        imgY - (imgH * scale) / 2,
        imgW * scale,
        imgH * scale
    );

    // frame always on top
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
}

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "framed-photo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
