// Define the Images object to store Image instances.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
};

// Set the source of the player image.
Images.player.src = './resources/images/player/DinoSprites - mort_00.png';

// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/tile000.png';

export { Images }; // Export the Images object correctly.
