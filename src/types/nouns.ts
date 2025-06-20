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
    }
}