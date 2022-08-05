const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';
const DEFAULT_COLOR = '#333333';

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;


function setCurrentSize(newSize) {
    currentSize = newSize;
}

const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');

sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

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
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        grid.appendChild(gridElement);
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE);
}