const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const zoomInput = document.getElementById('zoom');
const downloadBtn = document.getElementById('download');

let userImg = new Image();
let frameImg = new Image();
frameImg.src = 'frame.png'; // আপনার ফ্রেমের ফাইলের নাম এখানে দিন

canvas.width = 1000;
canvas.height = 1000;

let imgX = 500, imgY = 500, imgScale = 1;

// ফ্রেম লোড হলে ক্যানভাসে দেখাবে
frameImg.onload = () => draw();

// ছবি আপলোড করলে
upload.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        userImg.src = event.target.result;
    };
    reader.readAsDataURL(file);
};

userImg.onload = () => draw();

// জুম স্লাইডার পরিবর্তন করলে
zoomInput.oninput = () => {
    imgScale = zoomInput.value;
    draw();
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (userImg.src) {
        let w = userImg.width * imgScale;
        let h = userImg.height * imgScale;
        // ছবি মাঝখানে বসানো
        ctx.drawImage(userImg, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    }

    // ফ্রেম সবসময় ছবির উপরে থাকবে
    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
}

// ডাউনলোড ফাংশন
downloadBtn.onclick = () => {
    const link = document.createElement('a');
    link.download = 'framed-photo.png';
    link.href = canvas.toDataURL();
    link.click();
};