// DOM elements
const body = document.body;
const viewport = document.querySelectorAll('.viewport')[0];
console.log(viewport)
const container = document.createElement('div');

// Settings
const pixelSetting = {
    numberOfGridsX: 16,
    numberOfGridsY: 16,
    gridXWidth: 16,
    gridYWidth: 16,
}
let containerCss = {
    width: pixelSetting.numberOfGridsX * pixelSetting.gridXWidth,
    height: pixelSetting.numberOfGridsY * pixelSetting.gridYWidth,
    display: 'block'
}

// Array
let pixels = [];


// manipulating container for etch-a-sketch
function makeContainer() {
    viewport.appendChild(container);
    container.setAttribute('id', 'container');
    container.style.cssText = `width: ${containerCss.width}px; height: ${containerCss.height}px; flex-shrink: 0; border: 1px solid black; display: flex: overflow-x : scroll;`;
}
makeContainer();

// making pixel grid
function makePixelGrid(numberOfGridsX, numberOfGridsY, gridXWidth, gridYWidth) {

    // columns
    for (let i = 0; i < numberOfGridsY; i++) {
        let pixel = [];

        // rows
        for (let j = 0; j < numberOfGridsX; j++) {
            let tmp = document.createElement('div');
            tmp.setAttribute('id', 'pixel_' + i + '_' + j);
            tmp.style.cssText = `height: ${gridXWidth}px; width: ${gridYWidth}px; border: 1px black solid;`
            pixel[j] = tmp;
        }
        pixels[i] = pixel;
    }
}
makePixelGrid(pixelSetting.numberOfGridsX, pixelSetting.numberOfGridsY, pixelSetting.gridXWidth, pixelSetting.gridYWidth);

const appendPixel = (() => {
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
})();

// individual pixel event handler
function gridEvents(pixelObject) {
    pixelObject.addEventListener('click', (e) => {
        console.log(e);
    })
}
const addGridEventsHandler = (() => {
    for (let i = 0; i < pixels.length; i++) {
        pixels[i].forEach(element => {
            // console.log(element);
            gridEvents(element);
        });
    }
})();

//debug
// console.log(pixels[0]);


// media queries
// -----------------------------------------------
// todo: change size of pixels as well
// -----------------------------------------------
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