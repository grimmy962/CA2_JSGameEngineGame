//loading sounds
sounds.load([

]);

//assigning sounds to variables that should run each time a file is loaded
sounds.onProgress = function (progress, res) {
    console.log('Total'+progress+'file(s) loaded.');
    console.log('File' + res.url + 'just finished loading.');
};

//assign the callback function that should run when the sounds have loaded
soundsLoaded = setup;


//setup function to initialize your sounds
function setup(){
    //background music
    var music = sounds["music.mp3"],
        
        //player sounds
        walk = sounds["walk.mp3"],
        jump = sounds["jump.mp3"],
        kick = sounds["kick.mp3"],
        crouch = sounds["crouch.mp3"];

    //enemy sounds
    var enemyDie = sounds["enemyDie.mp3"],
        enemyHit = sounds["enemyHit.mp3"],
        enemyShoot = sounds["enemyShoot.mp3"],
        enemyWalk = sounds["enemyWalk.mp3"],
        enemyJump = sounds["enemyJump.mp3"];


// Define audio files and their corresponding paths
const AudioFiles = {
    walk:new Audio('./resources/audio/walk.mp3'),
    jump:new Audio('./resources/audio/jump.mp3'),
    kick:new Audio('./resources/audio/kick.mp3'),
    crouch:new Audio('./resources/audio/crouch.mp3'),
    enemyDie:new Audio('./resources/audio/enemyDie.mp3'),
    enemyHit:new Audio('./resources/audio/enemyHit.mp3'),
    enemyShoot:new Audio('./resources/audio/enemyShoot.mp3'),
    enemyWalk:new Audio('./resources/audio/enemyWalk.mp3'),
    enemyJump:new Audio('./resources/audio/enemyJump.mp3'),
};

    //play the sound
    music.play();

    //make the loop
    music.loop = true;

    //set the volume
    music.volume = 0.7;

    //pause the sound
    music.pause();

    //fade a sound out, over 3 seconds
    music.fadeOu(3);

    //fade a sound in, over 2 seconds
    music.fadeIn(2);

    //capture the keyboard events and control the sounds based on which keys are pressed
    var a = keyboard(65),
        d = keyboard(68),
        s = keyboard(69),
        e = keyboard(70);

    //play the walk sound
    a.press = function() {
        walk.play();
    };
        
    //play the walk sound
    d.press = function() {
        walk.play();
    };

    //play the crouch sound
    s.press = function() {
        crouch.play();
    };

    //play the kick sound
    e.press = function() {
        kick.play();
    };

    //space bar was a bit more complicated...
    document.body.onkeydown = function(x) {
        if (x.key == " " ||
            x.code == "Space" ||      
            x.code == "Space"      
        ) {
            jump.play();
        }
    };
}