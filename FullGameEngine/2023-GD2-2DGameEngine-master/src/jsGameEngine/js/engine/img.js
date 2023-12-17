import { Image } from 'canvas'; // Import the Image class from the canvas module.

const Images = {
    player: new Image(), // The Image instance for the player.
    enemy: new Image(), // The Image instance for the enemy.
  };

// Set the source of the player image.
Images.player.src = './resources/images/player/DinoSprites - mort_00.png'; // Update the image path

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/tile000.png'; // Update the image path

export { Images };
