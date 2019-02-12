// image loader to canvas

let imgSource = document.querySelector("#loader");
imgSource.addEventListener("change", SetImage, false);
let canvas = document.querySelector("#uploadedImg");
let ctx = canvas.getContext("2d");
let img = new Image();

function SetImage(e) {
  let reader = new FileReader();
  reader.onload = function(event) {
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
}

//  drawing

document.querySelector("#imgDrawing").onclick = function() {
  let isDrawing = false;
  let type = document.getElementsByName("colors");
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 2;

  canvas.addEventListener("mousedown", e => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });
  canvas.addEventListener("mousemove", drawing);
  canvas.addEventListener("mouseup", () => (isDrawing = false));
  canvas.addEventListener("mouseout", () => (isDrawing = false));

  function drawing(e) {
    let n;

    for (let i = 0; i < type.length; i++) {
      if (type[i].checked) {
        n = i;
      }
    }

    switch (n) {
      case 0:
        ctx.strokeStyle = "#000000";
        break;
      case 1:
        ctx.strokeStyle = "#f44242";
        break;
      case 2:
        ctx.strokeStyle = "#41f465";
        break;
      case 3:
        ctx.strokeStyle = "transparent";
        break;
    }

    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
};

//  brightness

let brightnessValue;

brightnessRange.addEventListener("mousemove", () => {
  if (brightnessRange.value !== brightnessValue) {
    setBrightness(Number(brightnessRange.value));
  }
  brightnessValue = Number(brightnessRange.value);
});

function setBrightness(value) {
  ctx.filter = `brightness(${value + 100}%)`;
  ctx.drawImage(img, 0, 0);
}

//  contrast

let contrastValue;

contrastRange.addEventListener("mousemove", () => {
  if (contrastRange.value !== contrastValue) {
    setContrast(Number(contrastRange.value));
  }
  contrastValue = Number(contrastRange.value);
});

function setContrast(value) {
  ctx.filter = `contrast(${value + 100}%)`;
  ctx.drawImage(img, 0, 0);
}

//  saturation

let saturationValue;

saturationRange.addEventListener("mousemove", () => {
  if (saturationRange.value !== saturationValue) {
    setSaturation(Number(saturationRange.value));
  }
  saturationValue = Number(saturationRange.value);
});

function setSaturation(value) {
  ctx.filter = `saturate(${value + 100}%)`;
  ctx.drawImage(img, 0, 0);
}
