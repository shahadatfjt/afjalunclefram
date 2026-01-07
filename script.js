const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const zoomInput = document.getElementById('zoom');
const downloadBtn = document.getElementById('download');

let userImg = new Image();
let frameImg = new Image();
frameImg.src = 'frame.png'; // আপনার ফ্রেমের ফাইলের নাম এখানে দিন

// ক্যানভাস সাইজ আপনার ফ্রেমের সাইজ অনুযায়ী ১০৮০x১০৮০ করা হলো
canvas.width = 1080;
canvas.height = 1080;

let imgScale = 1;

frameImg.onload = () => draw();

upload.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        userImg.src = event.target.result;
    };
    reader.readAsDataURL(file);
};

userImg.onload = () => {
    // ছবি আপলোড হলে জুম লেভেল ডিফল্ট ১ করে দেওয়া
    zoomInput.value = 1;
    imgScale = 1;
    draw();
};

zoomInput.oninput = () => {
    imgScale = zoomInput.value;
    draw();
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (userImg.src) {
        // ছবিটিকে ক্যানভাসের মাঝখানে রেখে জুম করার লজিক
        let w = userImg.width * imgScale;
        let h = userImg.height * imgScale;
        let x = (canvas.width - w) / 2;
        let y = (canvas.height - h) / 2;
        
        ctx.drawImage(userImg, x, y, w, h);
    }

    // ফ্রেমটি সবসময় উপরে থাকবে
    ctx.drawImage(frameImg, 0, 0, 1080, 1080);
}

downloadBtn.onclick = () => {
    const link = document.createElement('a');
    link.download = 'shadat-design-frame.png'; // ডাউনলোড করা ফাইলের নাম
    link.href = canvas.toDataURL("image/png");
    link.click();
};
