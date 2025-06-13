export interface I_noun {
    english : string;
    kanji? : string;
    kana : string;
}

export class noun{
    english : string = "";
    kanji? : string;
    kana : string = "";
    constructor(noun : I_noun){
        this.english = noun.english;
        this.kana = noun.kana;
        this.kanji = noun.kanji;
    }
}