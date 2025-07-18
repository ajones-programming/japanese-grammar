export interface I_noun {
    english : string;
    kanji? : string;
    kana : string;
    tts? : string;
}

export class noun{
    english : string = "";
    kanji? : string;
    kana : string = "";
    tts? : string;
    constructor(noun : I_noun){
        this.english = noun.english;
        this.kana = noun.kana;
        this.kanji = noun.kanji;
        this.tts = noun.tts;

        // if (this.kanji){
        //     console.log(this.kanji + ": " + this.kana + ", Has Kanji? " + this.hasKanji());
        // }
    }

    hasKanji() {
        return this.kanji != undefined;
    }
}