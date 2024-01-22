// DOM elements
const body = document.body;
const viewport = document.querySelectorAll('.viewport')[0];
console.log(viewport)
const container = document.createElement('div');


// manipulating container for etch-a-sketch
function makeContainer() {
    viewport.appendChild(container);
    container.setAttribute('id', 'container');
    container.style.cssText = `width: ${40 * 16}px; height: ${40 * 16}px; flex-shrink: 0; border: 1px solid black;`;
}
makeContainer();


// media queries
const notepadSizeChange = (() => {

    // mobile phone
    if (window.matchMedia('(max-width: 350px)').matches) {
        container.style.cssText = `width: ${10 * 16}px; height: ${10 * 16}px; flex-shrink: 0; border: 1px solid black;`;
    } 
    // tablet
    else if (window.matchMedia('(max-width: 700px)').matches) {
        container.style.cssText = `width: ${20 * 16}px; height: ${20 * 16}px; flex-shrink: 0; border: 1px solid black;`;
    } 
    // computer
    else {
        container.style.cssText = `width: ${40 * 16}px; height: ${40 * 16}px; flex-shrink: 0; border: 1px solid black;`;
    }
})();

// window.matchMedia('(max-width: 700px)').addEventListener('change', () => {
//     container.style.cssText = `width: ${20 * 16}px; height: ${20 * 16}px; flex-shrink: 0; border: 1px solid black;`;
// })