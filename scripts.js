const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';
const DEFAULT_COLOR = '#333333';
const DEFAULT_BGCOLOR = 'coral';

let NO_GRID = 1;
let currentBgClr = DEFAULT_BGCOLOR;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentBgClr(newBgClr) {
    currentBgClr = newBgClr;
    const gridstyle = document.getElementById('grid');
    gridstyle.style.backgroundColor = currentBgClr;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

const penColor = document.getElementById('penColor');
const bgColor = document.getElementById('bgColor');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');
const gridBtn = document.getElementById('gridBtn');

penColor.oninput = (e) => setCurrentColor(e.target.value);
bgColor.oninput = (e) => setCurrentBgClr(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);
gridBtn.onclick = () => toggleGrid();

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} by ${value}`;
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        let gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}

function toggleGrid() {
    let gridBorder = document.querySelectorAll('.grid-element');
    if(NO_GRID === 1) {
        gridBorder.forEach(function (e) {
            e.classList.add('grid-border');
        })
        NO_GRID = 0;
        console.log(NO_GRID);
    }
    else if (NO_GRID === 0){
        gridBorder.forEach(function (e) {
            e.classList.remove('grid-border');
        })
        NO_GRID = 1;
    }
}


function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = currentBgClr;
    }
  }
  
  function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active')
    }
    else if (currentMode === 'toggle') {
        gridBtn.classList.remove('active')
    }
    
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active')
    }
     else if (newMode === 'toggle') {
        gridBtn.classList.add('active');
     }
  }

window.onload = () => {
    setupGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}

