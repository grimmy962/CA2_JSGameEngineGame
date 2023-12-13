import {TileMap} from './tileMap.js';
import {loadImage} from './loaders.js';

const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

context.fillRect(0, 0, canvas.width, canvas.height);

loadImage('/resources/tilemap.png').then(image => {
    const sprites = new TileMap(image, 16, 16);
    sprites.define('ground', 0,0);
    sprites.define('sky', 3,23); 
    
    for (let x = 0; x < 25; ++x){
        for (let y = 0; y < 14; ++y){
            sprites.drawTile('sky', context, x, y);
        }
    }
    
    for (let x = 0; x < 25; ++x){
        for (let y = 12; y < 14; ++y){
            sprites.drawTile('ground', context, x, y);
        }
    }   
});