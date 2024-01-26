// -----------------------------------------------
// DOM elements
// -----------------------------------------------
const body = document.body;
const viewport = document.querySelectorAll('.viewport')[0];
const container = document.createElement('div');
const toolBar = document.createElement('div');

// -----------------------------------------------
// Settings
// -----------------------------------------------
let pixels = [];
let mousedown = false;

let colorPalette = ['red', 'blue', 'green', 'rainbow']
const buttons = ['Rainbow', 'Random', 'Eraser', 'Clear', 'Choose Color']

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
pixelSetting.numberOfGridsX = 78;
pixelSetting.numberOfGridsY = 78;
pixelSetting.gridWidthX = containerSetting.width / pixelSetting.numberOfGridsX;
pixelSetting.gridHeightY = containerSetting.height / pixelSetting.numberOfGridsY;
pixelSetting.border = '';
pixelSetting.borderRadius = '',
pixelSetting.miscSettings = ``;
pixelSetting.color = 'red';

// -----------------------------------------------
// Functions
// -----------------------------------------------

// manipulating container for etch-a-sketch
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
        let div = document.createElement('div');
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
    pixelObject.addEventListener('mouseenter', (e) => {
        if (mousedown) {
            e.target.style.backgroundColor = pixelSetting.color;
        }
    })
    pixelObject.addEventListener('mousedown', (e) => {
        e.target.style.backgroundColor = pixelSetting.color;
    })

}
function addGridEventsHandler() {
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].forEach(element => {
            // console.log(element);
            gridEvents(element);
        });
    }
};

// tool Bar
function makeTools() {
    viewport.appendChild(toolBar);
    toolBar.setAttribute('id', 'toolBar')
    toolBar.textContent = 'Test'

}

function populateTools() {
    let buttonsArray = []
    buttons.forEach(function(value, index, array) {
        btn = document.createElement('button');
        toolBar.appendChild(btn);
        // todo
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
    makeContainer();
    makePixelGrid(pixelSetting.numberOfGridsX, pixelSetting.numberOfGridsY, pixelSetting.gridWidthX, pixelSetting.gridHeightY);
    appendPixel();
    addGridEventsHandler();
    makeTools();
}

initialize();



// -----------------------------------------------
// todo: change size of pixels as well
// todo: add functionality for removing event handlers when pixels are changed
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