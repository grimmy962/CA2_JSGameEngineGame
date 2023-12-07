import img from "./img.js";

export default class Animation{
    images = [];
    constructor (fileNameTemplate, numberOfImages, timerCount, state){
        for(let i=1; i<=numberOfImages;i++){
            const image = img(fileNameTemplate.replace("?", i));
            this.images.push(image);
        }
        this.timerCount = timerCount;
        this.timerCounterDefault = this.timerCount;
        this.imageIndex = 0;
        this.state = state;
    }

    isFor(state){
        return this.state === state;
    }

    reset(){
        this.imageIndex = 0;
    }

    getImage(){
        return this.image[this.imageIndex];
    }
}