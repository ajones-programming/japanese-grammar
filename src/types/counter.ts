export interface I_counter {
    english : string;
    counter : string;
    min : number;
    max : number;
}

export class counter{
    english : string = "";
    counter : string = "";
    private min : number = 0;
    private max: number = 0;
    constructor(counter : I_counter){
        this.english = counter.english;
        this.counter = counter.counter;
        this.min = counter.min;
        this.max = counter.max;
    }

    getRandomNumberText(){
        const randomNumber : number = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        return +  randomNumber.toString() + this.counter;
    }

    hasKanji() {

        for (var i = 0; i < this.counter.length; ++i){
            const charCode = this.counter.charCodeAt(0);
            if(charCode >= 0x4E00){
                return true;
            }
        }
        return false;
    }
}