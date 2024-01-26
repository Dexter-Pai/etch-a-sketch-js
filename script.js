// -----------------------------------------------
// DOM elements
// -----------------------------------------------
const body = document.body;
const viewport = document.querySelectorAll('.viewport')[0];
const title = document.createElement('div');
const container = document.createElement('div');
const toolBar = document.createElement('div');
const colorInput = document.createElement('input');
const slider = document.createElement('input');
const sliderBtn = document.createElement('button');

// -----------------------------------------------
// Settings
// -----------------------------------------------
let pixels = [];
let mousedown = false;
let rainbowClicked = false;

const buttons = ['Rainbow', 'Random', 'Eraser', 'Clear']

const containerSetting = {
    width: 600,
    height: 600,
    display: 'block',
    border: '',
    borderRadius: '',
    padding: '',
    backgroundColor: 'White',
    boxShadow: `rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;`,
    miscSettings: ``,
}

const pixelSetting = {}
pixelSetting.numberOfGridsX = 16;
pixelSetting.numberOfGridsY = 16;
pixelSetting.gridWidthX = containerSetting.width / pixelSetting.numberOfGridsX;
pixelSetting.gridHeightY = containerSetting.height / pixelSetting.numberOfGridsY;
pixelSetting.border = '';
pixelSetting.borderRadius = '',
pixelSetting.miscSettings = ``;
pixelSetting.backgroundColor = 'black';

const sliderSetting = {
    min: 1,
    max: 100,
    value: 16,
    width: 300,
}

// -----------------------------------------------
// Functions
// -----------------------------------------------

// create title
function makeTitle() {
    viewport.appendChild(title);
    title.setAttribute('id', 'title');
    title.textContent = 'Etch - A - Sketch';
    title.style.cssText = 'font-family: Arial, Helvetica, sans-serif; font-size: 50px; font-weight: bold;'
}

// container for etch-a-sketch
function makeContainer() {
    viewport.appendChild(container);
    container.setAttribute('id', 'container');
    container.style.cssText = `width: ${containerSetting.width}px; height: ${containerSetting.height}px; 
    flex-shrink: 0; border: ${containerSetting.border}; border-radius: ${containerSetting.borderRadius}; 
    padding: ${containerSetting.padding}; background-color:${containerSetting.backgroundColor};
    box-shadow: ${containerSetting.boxShadow}; ${containerSetting.miscSettings};`;
}

// making pixel grid
function makePixelGrid(numberOfGridsX, numberOfGridsY, gridWidthX, gridHeightY) {
    pixels = [];
    // columns
    for (let i = 0; i < numberOfGridsY; i++) {
        let pixel = [];

        // rows
        for (let j = 0; j < numberOfGridsX; j++) {
            let tmp = document.createElement('div');
            tmp.setAttribute('id', 'pixel_' + i + '_' + j);
            tmp.style.cssText = `height: ${gridWidthX}px; width: ${gridHeightY}px; border: ${pixelSetting.border}; border-radius: ${pixelSetting.borderRadius}; ${pixelSetting.miscSettings};`
            pixel[j] = tmp;
        }
        pixels[i] = pixel;
    }
}

function appendPixel() {
    for (let i = 0; i < pixels.length; i++) {
        rows = [];
        let div = document.createElement('div');
        rows.push(div);
        div.setAttribute('class', 'row');
        div.setAttribute('id', 'row_' + i);
        div.style.cssText = 'display: flex;'
        container.appendChild(div);
        pixels[i].forEach(element => {
            div.appendChild(element);
        });
    }
};


// individual pixel event handler
function gridEvents(pixelObject) {
    pixelObject.addEventListener('mouseenter', enterEvent);
    pixelObject.addEventListener('mousedown', mousedownEvent);
}
function enterEvent(e){
    if (mousedown) {
        if (rainbowClicked) randomizeColor();
        e.target.style.backgroundColor = pixelSetting.backgroundColor;
    }
};
function mousedownEvent(e) {
    if (rainbowClicked) randomizeColor();
    e.target.style.backgroundColor = pixelSetting.backgroundColor;
};

function addGridEventsHandler() {
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].forEach(element => {
            gridEvents(element);
        });
    }
};

// slider
function makeSlider() {
    let div = document.createElement('div');
    div.style.cssText = 'display: flex; flex-direction: column; margin: 15px; gap: 15px;'
    viewport.appendChild(div);
    div.appendChild(slider);
    div.appendChild(sliderBtn);

    // slider
    slider.setAttribute('type', 'range');
    slider.setAttribute('class', 'slider');
    slider.setAttribute('min', `${sliderSetting.min}`);
    slider.setAttribute('max', `${sliderSetting.max}`);
    slider.setAttribute('value', `${sliderSetting.value}`);
    slider.style.width = `${sliderSetting.width}px`;

    // slider Button
    sliderBtn.textContent = 'Change Grid Size';
    sliderBtn.setAttribute('class', 'toolBtn');
}

// toolbar
function makeTools() {
    viewport.appendChild(toolBar);
    toolBar.setAttribute('id', 'toolBar')
}
function populateTools() {
    let buttonsArray = []
    buttons.forEach(function(value) {
        btn = document.createElement('button');
        toolBar.appendChild(btn);
        btn.setAttribute('class', 'toolBtn')
        btn.textContent = value;
        btn.style.width = '150px';
        buttonsArray.push(btn);
    })
    buttons.push(buttonsArray);
}

// color input
function makeColorInput() {
    toolBar.appendChild(colorInput);
    colorInput.setAttribute('class', 'toolBtn');
    colorInput.setAttribute('type', 'color');
    colorInput.setAttribute('id', 'colorPicker');
    colorInput.style.boxShadow = 'none';
}

// tool event handlers
function toolEvents() {

    // rainbow button
    buttons[4][0].addEventListener('click', () => {
        rainbowClicked = true;
    });
    
    // random button
    buttons[4][1].addEventListener('click', () => {
        randomizeColor();
        rainbowClicked = false;
    });
    
    // eraser button
    buttons[4][2].addEventListener('click', () => {
        pixelSetting.backgroundColor = 'white';
        rainbowClicked = false;
    });
    
    // clear button
    buttons[4][3].addEventListener('click', () => {
        pixels.forEach(row => {
            row.forEach(pixel => {
                pixel.style.backgroundColor = 'white';
            })            
        });
        if (pixelSetting.backgroundColor === 'white') pixelSetting.backgroundColor = 'black';
        rainbowClicked = false;
    });
    
    // choose color button
    colorInput.addEventListener('change', () => {
        pixelSetting.backgroundColor = colorInput.value;
        rainbowClicked = false;
    });
}

// slider event listener
function sliderEvents() {
    sliderBtn.addEventListener('click', () => {
        removeEvents();
        pixelSetting.numberOfGridsX = slider.value;
        pixelSetting.numberOfGridsY = slider.value;
        pixelSetting.gridWidthX = containerSetting.width / pixelSetting.numberOfGridsX;
        pixelSetting.gridHeightY = containerSetting.height / pixelSetting.numberOfGridsY;
        buttons[4][3].click();
        makePixelGrid(pixelSetting.numberOfGridsX, pixelSetting.numberOfGridsY, pixelSetting.gridWidthX, pixelSetting.gridHeightY);
        container.replaceChildren();
        appendPixel();
        addGridEventsHandler();
    })
}

// randomize color
function randomizeColor() {
    pixelSetting.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
};

// removing event listeners
function removeEvents() {
    pixels.forEach(row => {
        row.forEach(pixel => {
    pixel.removeEventListener('mouseenter', enterEvent);
    pixel.removeEventListener('mousedown', mousedownEvent);
        })
    })
}


// window events
window.addEventListener('mousedown', (e) => {
    mousedown = true;
})
window.addEventListener('mouseup', (e) => {
    mousedown = false;
})


// Initialization main function
function initialize() {
    makeTitle();
    makeContainer();
    makePixelGrid(pixelSetting.numberOfGridsX, pixelSetting.numberOfGridsY, pixelSetting.gridWidthX, pixelSetting.gridHeightY);
    appendPixel();
    addGridEventsHandler();
    makeSlider();
    makeTools();
    populateTools();
    toolEvents();
    makeColorInput();
    sliderEvents();
}

initialize();



// -----------------------------------------------
// todo: media queries
// -----------------------------------------------


// different settings left behind for further reference
// const containerSetting = {
//     // width: pixelSetting.numberOfGridsX * pixelSetting.gridWidthX,
//     // width: pixelSetting.numberOfGridsX * pixelSetting.gridWidthX,
//     //width: (viewport.clientWidth - padding) - ((viewport.clientWidth - padding) % pixelSetting.gridWidthX), // fullscreen
//     // height: pixelSetting.numberOfGridsY * pixelSetting.gridHeightY,
//     // height: pixelSetting.numberOfGridsY * pixelSetting.gridHeightY,
//     //height: (viewport.clientHeight - padding) - ((viewport.clientHeight - padding) % pixelSetting.gridHeightY), // fullscreen
//     display: 'block',
//     border: '5px solid black',
// }


// media queries
// const notepadSizeChange = (() => {

//     // mobile phone
//     if (window.matchMedia('(max-width: 350px)').matches) {
//         container.style.cssText = `width: ${10 * 16}px; height: ${10 * 16}px; flex-shrink: 0; border: 1px solid black; display: flex;`;
//     } 
//     // tablet
//     else if (window.matchMedia('(max-width: 700px)').matches) {
//         container.style.cssText = `width: ${20 * 16}px; height: ${20 * 16}px; flex-shrink: 0; border: 1px solid black; display: flex;`;
//     } 
//     // computer
//     else {
//         container.style.cssText = `width: ${40 * 16}px; height: ${40 * 16}px; flex-shrink: 0; border: 1px solid black; display: flex;`;
//     }
// })();

// notes and code snippets
// window.matchMedia('(max-width: 700px)').addEventListener('change', () => {
//     container.style.cssText = `width: ${20 * 16}px; height: ${20 * 16}px; flex-shrink: 0; border: 1px solid black;`;
// })

// pixels[0][1].style.cssText = 'height: ${numberOfGrids}px; width: ${numberOfGrids}px; border: 1px red solid;'