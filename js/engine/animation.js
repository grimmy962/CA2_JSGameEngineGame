import img from "./img.js";

//fix the code below
export default class Animation{
    images = [];
    constructor (fileNameTemplate, numberOfImages, timerCount, state, stopAtEnd){
        for(let i=1; i<=numberOfImages;i++){
            const image = img(fileNameTemplate.replace("?", i));
            this.images.push(image);
        }
        this.timerCount = timerCount;
        this.timerCounterDefault = this.timerCount;
        this.imageIndex = 0;
        this.state = state;
        this.stopAtEnd = stopAtEnd;

    }

    isFor(state){
        return this.state === state;
    }

    reset(){
        this.imageIndex = 0;
    }

    getImage(){
        this.#setImageIndex();
        return this.image[this.imageIndex];
    }

    #setImageIndex(){
        this.timerCount--;
        if(this.timerCount ==0 && !this.#shouldStop()){
            this.timerCount = this.timerCounterDefault;
            this.imageIndex++;

            if(this.imageIndex>=this.images.length){
                this.imageIndex = 0;
            }
        }
    }

    #shouldStop(){
        return this.stopAtEnd && this.imageIndex == this.images.length -1;
    }
}