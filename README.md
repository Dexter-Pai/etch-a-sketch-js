# etch-a-sketch-js
Etch-a-sketch web program using js

# Working Demo
Please visit [this link](https://dexter-pai.github.io/etch-a-sketch-js/) for a working demo.

# Overview
- This program is made to showcase DOM manipulation using vanilla JS and minimal use of HTML and CSS.
- Settings can be changed by changing values of the object it corresponds to.
- A pixel grid is created using user-defined grid size and are made to change colors upon clicking and dragging using event listeners
- Event listeners are removed when grid size is changed.
- Neon colors and sliders are used for appealing esthetics.

# Features

## Drawing pad
- The drawing pad is a `600px x 600px` square.

## Changing color
- Initial scribbling will be in black color.
- Colors can be changed using buttons or using the color picker provided at the bottom right.

## Changing grid size
- Use the slider to adjust the size of the grids inside the drawing pad.
- `minimum value: 1px;`
- `maximum value: 100px;`
- These settings can be changed in the code.
- Use this code below if you want the sketch pad to be full screen.
```
container.width = ((viewport.clientWidth - padding) - ((viewport.clientWidth - padding) % pixelSetting.gridWidthX));
container.height = ((viewport.clientHeight - padding) - ((viewport.clientHeight - padding) % pixelSetting.gridHeightY));
```
- After changing the slider, click on the button below to clear the sketchpad and change grid size.

# Functionalities to add in the future
- Saving the drawing to PC
- Changing the size of the pen

## mobile functionalities
- making the app more dynamic and fluid on mobile devices by adding media queries
- touch events

# Thank you for your interest.
