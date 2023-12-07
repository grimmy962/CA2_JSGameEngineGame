import img from "./img.js";
const canvas = document.createElement("canvas");
document.body.append(canvas);
const ctx = canvas.getContext("2d");
canvas.width = 2000/1.5;
canvas.height = 1143/1.5;

const background = img("bg.png");
