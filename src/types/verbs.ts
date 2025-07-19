export abstract class verb{

    protected kanjiStem?: string;
    protected ttsStem? : string;
    protected kanaStem: string = "";
    public english : string = "";

    constructor(kanjiStem : string | undefined, kanaStem : string, english : string, ttsStem? : string)
    {
        this.kanjiStem = kanjiStem;
        this.kanaStem = kanaStem;
        this.english = english;
        this.ttsStem = ttsStem;
    }

    stem(defaultKana : boolean = false, tts : boolean) : string{
        if (defaultKana){
            return this.kanaStem;
        }
        return (tts ? (this.ttsStem ?? this.kanjiStem ?? this.kanaStem) : this.kanjiStem) ?? this.kanaStem;
    }

    abstract dictForm(defaultKana : boolean, tts : boolean) : string;
    abstract masuStem(defaultKana : boolean, tts : boolean) : string;
    abstract te(defaultKana : boolean, tts : boolean) : string;
    abstract ta(defaultKana : boolean, tts : boolean) : string;
    abstract naiStem(defaultKana : boolean, tts : boolean) : string;
    abstract cha(defaultKana : boolean, tts : boolean) : string;
    abstract potential() : verb;

    hasKanjiForm(){return this.kanjiStem != undefined;}
}


export interface I_Ichidan {
    english : string;
    kanjiStem? : string;
    ttsStem? : string;
    kanaStem : string;
}



export class ichidanVerb extends verb{

    constructor(i : I_Ichidan)
    {
        super(i.kanjiStem,i.kanaStem,i.english,i.ttsStem);

    }

    override dictForm(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "る";
    }

    override masuStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) ;
    }

    override te(defaultKana : boolean = false, tts : boolean = false): string {
       return this.stem(defaultKana, tts) + "て";
    }

    override ta(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "た";
    }

    override cha(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "ちゃ";
    }

    override naiStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts);
    }

    override potential(): verb {
        const english = this.english + ", potential";
        const kanji = this.kanjiStem ? (this.kanjiStem + "ることができ") : undefined;
        const kana = this.kanaStem + "ることができ";
        const tts = this.ttsStem ? (this.kanjiStem + "ることができ") : undefined;
        return new ichidanVerb({
            english: english,
            kanjiStem: kanji,
            kanaStem: kana, 
            ttsStem: tts
        })
    }
}

export interface I_Godan {
    english : string;
    kanjiStem? : string;
    ttsStem? : string;
    kanaStem : string;
    u : string;
}

export class godanVerb extends verb{


    private u : string = "";

    private static loopUpDict : {[u : string] : {[vowel : string] : string}} = {
        "う" : {
            "あ" : "わ",
            "い" : "い",
            "う" : "う",
            "え" : "え",
            "お" : "お",
            "て" : "って",
            "た" : "った",
            "ちゃ" : "っちゃ"
        },
        "く" : {
            "あ" : "か",
            "い" : "き",
            "う" : "く",
            "え" : "け",
            "お" : "こ",
            "て" : "いて",
            "た" : "いた",
            "ちゃ" : "いちゃ"
        },
        "ぐ" : {
            "あ" : "が",
            "い" : "ぎ",
            "う" : "ぐ",
            "え" : "げ",
            "お" : "ご",
            "て" : "いで",
            "た" : "いだ",
            "ちゃ" : "いじゃ"
        },
        "す" : {
            "あ" : "さ",
            "い" : "し",
            "う" : "す",
            "え" : "せ",
            "お" : "そ",
            "て" : "して",
            "た" : "した",
            "ちゃ" : "しちゃ"
        },
        "つ" : {
            "あ" : "た",
            "い" : "ち",
            "う" : "つ",
            "え" : "て",
            "お" : "と",
            "て" : "って",
            "た" : "った",
            "ちゃ" : "っちゃ"
        },
        "ぬ" : {
            "あ" : "な",
            "い" : "に",
            "う" : "ぬ",
            "え" : "ね",
            "お" : "の",
            "て" : "んで",
            "た" : "んだ",
            "ちゃ" : "んじゃ"
        },
        "む" : {
            "あ" : "ま",
            "い" : "み",
            "う" : "む",
            "え" : "め",
            "お" : "も",
            "て" : "んで",
            "た" : "んだ",
            "ちゃ" : "んじゃ"
        },
        "ぶ" : {
            "あ" : "ば",
            "い" : "び",
            "う" : "ぶ",
            "え" : "べ",
            "お" : "ぼ",
            "て" : "んで",
            "た" : "んだ",
            "ちゃ" : "んじゃ"
        },
        "る" : {
            "あ" : "ら",
            "い" : "り",
            "う" : "る",
            "え" : "れ",
            "お" : "ろ",
            "て" : "って",
            "た" : "った",
            "ちゃ" : "っちゃ"
        }
    }

    constructor(i : I_Godan)
    {
        super(i.kanjiStem,i.kanaStem,i.english, i.ttsStem);
        this.u = i.u;
    }

    override dictForm(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + godanVerb.loopUpDict[this.u]["う"];
    }

    override masuStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + godanVerb.loopUpDict[this.u]["い"];
    }

    override te(defaultKana : boolean = false, tts : boolean = false): string {
       return this.stem(defaultKana, tts) + godanVerb.loopUpDict[this.u]["て"];
    }

    override ta(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + godanVerb.loopUpDict[this.u]["た"];
    }

    override cha(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + godanVerb.loopUpDict[this.u]["ちゃ"];
    }

    override naiStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + godanVerb.loopUpDict[this.u]["あ"];
    }
    override potential(): verb {
        const e = godanVerb.loopUpDict[this.u]["え"];
        const english = this.english + ", potential";
        const kanji = this.kanjiStem ? (this.kanjiStem + e) : undefined;
        const kana = this.kanaStem + e;
        const tts = this.ttsStem ? (this.kanjiStem + e) : undefined;
        return new ichidanVerb({
            english: english,
            kanjiStem: kanji,
            kanaStem: kana, 
            ttsStem: tts
        })
    }
}

export interface I_suru {
    english : string;
    kanjiStem? : string;
    ttsStem? : string;
    kanaStem : string;
}

export class suruVerb extends verb{

    constructor(i : I_suru)
    {
        super(i.kanjiStem,i.kanaStem,i.english, i.ttsStem);
    }

    override dictForm(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "する";
    }

    override masuStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "し";
    }

    override te(defaultKana : boolean = false, tts : boolean = false): string {
       return this.stem(defaultKana, tts) + "して";
    }

    override ta(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "した";
    }

    override cha(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "しちゃ";
    }

    override naiStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "し";
    }

        override potential(): verb {
        const english = this.english + ", potential";
        const kanji = this.kanjiStem ? (this.kanjiStem + "ができ") : undefined;
        const kana = this.kanaStem + "ができ";
        const tts = this.ttsStem ? (this.kanjiStem + "ができ") : undefined;
        return new ichidanVerb({
            english: english,
            kanjiStem: kanji,
            kanaStem: kana, 
            ttsStem: tts
        })
    }
}

export interface I_iku {
    english : string;
    kanjiStem? : string;
    ttsStem? : string;
    kanaStem : string;
}

export class ikuVerb extends verb{

    constructor(i : I_iku)
    {
        super(i.kanjiStem,i.kanaStem,i.english, i.ttsStem);
    }

    override dictForm(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + ((tts || defaultKana? "いく" : "行く"));
    }

    override masuStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + ( tts || defaultKana? "いき" : "行き");
    }

    override te(defaultKana : boolean = false, tts : boolean = false): string {
       return this.stem(defaultKana, tts) +  ( tts || defaultKana? "いって" : "行って");
    }

    override ta(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) +  (tts || defaultKana? "いった" : "行った");
    }

    override cha(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + ( tts || defaultKana? "いっちゃ" : "行っちゃ");
    }

    override naiStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + ( tts || defaultKana? "いか" : "行か");
    }

    override hasKanjiForm(){return true;}

    override potential(): verb {
        const english = this.english + ", potential";
        const kanji = (this.kanjiStem ?? this.kanaStem) + "行け";
        const kana = this.kanaStem + "行け";
        const tts = (this.ttsStem ?? this.kanjiStem ?? this.kanaStem) + "いけ";
        return new ichidanVerb({
            english: english,
            kanjiStem: kanji,
            kanaStem: kana, 
            ttsStem: tts
        })
    }
}

export interface I_kuru {
    english : string;
    kanjiStem? : string;
    ttsStem? : string;
    kanaStem : string;
}

export class kuruVerb extends verb{

    constructor(i : I_kuru)
    {
        super(i.kanjiStem,i.kanaStem,i.english, i.ttsStem);
    }

    override dictForm(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + ( defaultKana? "くる" : "来る" );
    }

    override masuStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + ( defaultKana? "き" : "来");
    }

    override te(defaultKana : boolean = false, tts : boolean = false): string {
       return this.stem(defaultKana, tts) +  ( defaultKana? "きて" : "来て");
    }

    override ta(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) +  ( defaultKana? "きた" : "来た");
    }

    override cha(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + ( defaultKana? "きちゃ" : "来ちゃ");
    }

    override naiStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + ( defaultKana? "こ" : "来");
    }

    override hasKanjiForm(){return true;}

    override potential(): verb {
        const english = this.english + ", potential";
        const kanji = (this.kanjiStem ?? this.kanaStem) + "来られ";
        const kana = this.kanaStem + "来られ";
        const tts = this.ttsStem ? (this.kanjiStem + "来られ") : undefined;;
        return new ichidanVerb({
            english: english,
            kanjiStem: kanji,
            kanaStem: kana, 
            ttsStem: tts
        })
    }
}

export interface I_aru {
    english : string;
    kanjiStem? : string;
    ttsStem? : string;
    kanaStem : string;
}

export class aruVerb extends verb{

    constructor(i : I_aru)
    {
        super(i.kanjiStem,i.kanaStem,i.english, i.ttsStem);
    }

    override dictForm(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "ある";
    }

    override masuStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "あり";
    }

    override te(defaultKana : boolean = false, tts : boolean = false): string {
       return this.stem(defaultKana, tts) + "あって";
    }

    override ta(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) +  "あった";
    }

    override cha(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "あっちゃ";
    }

    override naiStem(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts);
    }
    override potential(): verb {
        const english = this.english + ", potential";
        const kanji = (this.kanjiStem ?? this.kanaStem) + "あれ";
        const kana = this.kanaStem + "あれ";
        const tts = this.ttsStem ? (this.kanjiStem + "あれ") : undefined;;
        return new ichidanVerb({
            english: english,
            kanjiStem: kanji,
            kanaStem: kana, 
            ttsStem: tts
        })
    }

}