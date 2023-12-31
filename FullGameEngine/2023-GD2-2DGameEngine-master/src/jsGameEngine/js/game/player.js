// Import necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images } from '../engine/img.js';
import { AudioFiles } from '../engine/sound.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';

// Define a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and adds necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
    this.renderer = new Renderer('blue', 50, 50, Images.player); // Add renderer
    this.addComponent(this.renderer);
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input

    // Initialize all the player-specific properties
    this.direction = 1;
    this.lives = 3;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 4250;
    this.jumpTime = 1;
    this.jumpTimer = 8;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;

    // Initialize player's audio files
    this.walk = AudioFiles.walk;
    this.jump = AudioFiles.jump;
    this.kick = AudioFiles.kick;
    this.crouch = AudioFiles.crouch;
    this.collectible = AudioFiles.collectible; // Fix typo in variable name
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component

    this.handleGamepadInput(input);

    // Handle player movement
    if (!this.isGamepadMovement && (input.isKeyDown('ArrowRight') || input.isKeyDown('KeyD'))) {
      physics.velocity.x = 100;
      this.direction = 1;
    } else if (!this.isGamepadMovement && (input.isKeyDown('ArrowLeft') || input.isKeyDown('KeyA'))) {
      physics.velocity.x = -100;
      this.direction = -1;
    } else if (!this.isGamepadMovement) {
      physics.velocity.x = 0;
    }

    // Handle player crouch
    if (input.isKeyDown('ArrowDown') || input.isKeyDown('KeyS')) {
      this.renderer.height = 25;
      this.renderer.width = 50;
      this.y = this.game.canvas.height - 40;
      this.crouch.play();

    } else {
      this.renderer.height = 50;
      this.renderer.width = 50;
      this.y = this.game.canvas.height - 65;
    }

    // Handle player kick
    if (input.isKeyDown('KeyE')) {
      this.kick.play();
    }

    // Handle player jumping
    if (!this.isGamepadJump && (input.isKeyDown('ArrowUp') || input.isKeyDown('Space')) && this.isOnPlatform) {
      this.startJump();
      this.jump.play();
    }

    if (this.isJumping) {
      this.updateJump(deltaTime);
    }

    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
        this.collectible.play();
      }
    }

    // Handle collisions with enemies
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        this.collidedWithEnemy();
      }
    }

    // Handle collisions with platforms
    this.isOnPlatform = false; // Reset this before checking collisions with platforms
    const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
    for (const platform of platforms) {
      if (physics.isColliding(platform.getComponent(Physics))) {
        if (!this.isJumping) {
          physics.velocity.y = 0;
          physics.acceleration.y = 0;
          //this.y = platform.y - this.renderer.height;
          this.isOnPlatform = true;
        }
      }
    }

console.log(physics.velocity.y);
    // Check if player has fallen off the bottom of the screen
    if (this.y > this.game.canvas.height) {
      this.resetPlayerState();
    }

    // Check if player has no lives left
    if (this.lives <= 0) {
      location.reload();
    }

    // Check if player has collected all collectibles
    if (this.score >= 3) {
      console.log('You win!');
      location.reload();
    }

    super.update(deltaTime);
  }

  // Handle gamepad input
  handleGamepadInput(input) {
    const gamepad = input.getGamepad(); // Get the gamepad input
    const physics = this.getComponent(Physics); // Get physics component
    if (gamepad) {
      // Reset the gamepad flags
      this.isGamepadMovement = false;
      this.isGamepadJump = false;

      // Handle movement
      const horizontalAxis = gamepad.axes[0];
      // Move right
      if (horizontalAxis > 0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = 100;
        this.direction = -1;
      }
      // Move left
      else if (horizontalAxis < -0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = -100;
        this.direction = 1;
      }
      // Stop
      else {
        physics.velocity.x = 0;
      }

      // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
      if (input.isGamepadButtonDown(0) && this.isOnPlatform) {
        this.isGamepadJump = true;
        this.startJump();
      }
    }
  }

  // Start the jump
  startJump() {
    // Initiate a jump if the player is on a platform
    if (this.isOnPlatform) {
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isOnPlatform = false;
    }
  }

  // Update the jump progress over time
  updateJump(deltaTime) {
    this.jumpTimer -= deltaTime;
    if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
      this.isJumping = false;
    }
  }

  // Handle collision with an enemy
  collidedWithEnemy() {
    // Check collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.kick.play();
      this.isInvulnerable = true;
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  // Handle collectible pickup
  collect(collectible) {
    this.score += collectible.value;
    console.log(`Score: ${this.score}`);
    this.emitCollectParticles(collectible);
  }

  // Create a particle system at the player's position when a collectible is collected
  emitCollectParticles() {
    const particleSystem = new ParticleSystem(this.x, this.y, 'purple', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  // Reset the player's state
  resetPlayerState() {
    this.x = this.game.canvas.width / 2;
    this.y = this.game.canvas.height / 2;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  // Reset the game state, including the player's state
  resetGame() {
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }
}

export default Player;
