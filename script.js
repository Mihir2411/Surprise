const text = "I have a small surprise for you";
let index = 0;
let pageNum = 1;
let pdfDoc = null;

const typingEl = document.getElementById("typing");
const startEl = document.getElementById("start");
const viewerEl = document.getElementById("viewer");
const endEl = document.getElementById("end");
const canvas = document.getElementById("pdfCanvas");
const ctx = canvas.getContext("2d");
const music = document.getElementById("bgMusic");

pdfjsLib.getDocument("surprise.pdf").promise.then(pdf => {
  pdfDoc = pdf;
});

function typeText() {
  if (index < text.length) {
    typingEl.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 80);
  }
}
typeText();

function renderPage(num) {
  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({ canvasContext: ctx, viewport });
  });
}

function next() {
  if (!viewerEl.classList.contains("hidden")) {
    pageNum++;
    if (pageNum > pdfDoc.numPages) {
      viewerEl.classList.add("hidden");
      endEl.classList.remove("hidden");
      return;
    }
    renderPage(pageNum);
  } else {
    startEl.classList.add("hidden");
    viewerEl.classList.remove("hidden");
    music.play();
    renderPage(pageNum);
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "Enter") next();
});

document.addEventListener("click", next);