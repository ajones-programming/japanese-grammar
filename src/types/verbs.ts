export abstract class verb{

    protected kanjiStem?: string;
    protected kanaStem: string = "";
    public english : string = "";

    constructor(kanjiStem : string | undefined, kanaStem : string, english : string)
    {
        this.kanjiStem = kanjiStem;
        this.kanaStem = kanaStem;
        this.english = english;
    }

    stem() : string{
        return this.kanjiStem ?? this.kanaStem;
    }

    abstract dictForm() : string;
    abstract masuStem() : string;
    abstract te() : string;
    abstract ta() : string;
    abstract naiStem() : string;
    abstract cha() : string;
}

export interface I_Godan {
    english : string;
    kanjiStem? : string;
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
        super(i.kanjiStem,i.kanaStem,i.english);
        this.u = i.u;
    }

    override dictForm(): string {
        return this.stem() + godanVerb.loopUpDict[this.u]["う"];
    }

    override masuStem(): string {
        return this.stem() + godanVerb.loopUpDict[this.u]["い"];
    }

    override te(): string {
       return this.stem() + godanVerb.loopUpDict[this.u]["て"];
    }

    override ta(): string {
        return this.stem() + godanVerb.loopUpDict[this.u]["た"];
    }

    override cha(): string {
        return this.stem() + godanVerb.loopUpDict[this.u]["ちゃ"];
    }

    override naiStem(): string {
        return this.stem() + godanVerb.loopUpDict[this.u]["あ"];
    }
}

export interface I_Ichidan {
    english : string;
    kanjiStem? : string;
    kanaStem : string;
}

export class ichidanVerb extends verb{

    constructor(i : I_Ichidan)
    {
        super(i.kanjiStem,i.kanaStem,i.english);
    }

    override dictForm(): string {
        return this.stem() + "る";
    }

    override masuStem(): string {
        return this.stem() ;
    }

    override te(): string {
       return this.stem() + "て";
    }

    override ta(): string {
        return this.stem() + "た";
    }

    override cha(): string {
        return this.stem() + "ちゃ";
    }

    override naiStem(): string {
        return this.stem();
    }
}

export interface I_suru {
    english : string;
    kanjiStem? : string;
    kanaStem : string;
}

export class suru extends verb{

    constructor(i : I_suru)
    {
        super(i.kanjiStem,i.kanaStem,i.english);
    }

    override dictForm(): string {
        return this.stem() + "する";
    }

    override masuStem(): string {
        return this.stem() + "し";
    }

    override te(): string {
       return this.stem() + "して";
    }

    override ta(): string {
        return this.stem() + "した";
    }

    override cha(): string {
        return this.stem() + "しちゃ";
    }

    override naiStem(): string {
        return this.stem() + "し";
    }
}

export interface I_exceptionVerb {
    english : string;
    dictFormKanji? : string;
    dictFormKana : string;
    masuStemKanji? : string;
    masuStemKana : string;
    teKanji? : string;
    teKana : string;
    taKanji? : string;
    taKana : string;
    chaKanji? : string;
    chaKana : string;
    naiStemKanji? : string;
    naiStemKana : string;
}

export class exceptionVerb extends verb{

    
    private dictFormKanji? : string;
    private dictFormKana : string = "";
    private masuStemKanji? : string;
    private masuStemKana : string = "";
    private teKanji? : string;
    private teKana : string = "";
    private taKanji? : string;
    private taKana : string = "";
    private chaKanji? : string;
    private chaKana : string = "";
    private naiStemKanji? : string;
    private naiStemKana : string = "";

    constructor(i : I_exceptionVerb)
    {
        super("","",i.english);
        this.dictFormKanji = i.dictFormKanji;
        this.dictFormKana = i.dictFormKana;
        this.masuStemKanji = i.masuStemKanji;
        this.masuStemKana = i.masuStemKana;
        this.teKanji = i.teKanji;
        this.teKana = i.teKana;
        this.taKanji = i.taKanji;
        this.taKana = i.taKana;
        this.chaKanji = i.chaKanji;
        this.chaKana = i.chaKana;
        this.naiStemKanji = i.naiStemKanji;
        this.naiStemKana = i.naiStemKana;

    }

    override dictForm(): string {
        return this.dictFormKanji ?? this.dictFormKana;
    }

    masuStem(): string {
        return this.masuStemKanji ?? this.masuStemKana;
    }
    te(): string {
        return this.teKanji ?? this.teKana;
    }
    ta(): string {
        return this.taKanji ?? this.taKana;
    }

    override cha(): string {
        return this.chaKanji ?? this.chaKana;
    }

    naiStem(): string {
        return this.naiStemKanji ?? this.naiStemKana;
    }
}