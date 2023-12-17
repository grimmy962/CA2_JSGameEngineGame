//import { sounds } from './sounds'; // Import the sounds module
//import { setup } from './setup'; // Remove the import statement for the setup function

/*
//loading sounds
sounds.load();

//assigning sounds to variables that should run each time a file is loaded
sounds.onProgress = function (progress, res) {
    console.log('Total'+progress+'file(s) loaded.');
    console.log('File' + res.url + 'just finished loading.');
};

//assign the callback function that should run when the sounds have loaded
const soundsLoaded = setup; // Add the missing declaration for soundsLoaded and assign it the value of the setup function
sounds.onComplete = soundsLoaded;

*/

// Define audio files and their corresponding paths
const AudioFiles = {
    walk:new Audio('./resources/audio/walk.mp3'),
    jump:new Audio('./resources/audio/jump.mp3'),
    kick:new Audio('./resources/audio/kick.mp3'),
    crouch:new Audio('./resources/audio/crouch.mp3'),
    collectible:new Audio('./resources/audio/collectible.mp3')
   /* enemyDie:new Audio('./resources/audio/enemyDie.mp3'),
    enemyHit:new Audio('./resources/audio/enemyHit.mp3'),
    enemyShoot:new Audio('./resources/audio/enemyShoot.mp3'),
    enemyWalk:new Audio('./resources/audio/enemyWalk.mp3'),
    enemyJump:new Audio('./resources/audio/enemyJump.mp3'),*/
};

/*
// Define a class, Sound, which will be responsible for playing audio files in the game engine
class Sound {
    // The constructor takes an audio file as an argument
    constructor(audioFile) {
        this.audioFile = audioFile; // Set the audio file
    }

    // The play method plays the audio file
    play() {
        this.audioFile.play();
    }
*/

export default { AudioFiles}; // Export the AudioFiles class as named export of this module