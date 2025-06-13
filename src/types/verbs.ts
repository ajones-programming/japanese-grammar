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

    stem(defaultKana : boolean = false) : string{
        if (defaultKana){
            return this.kanaStem;
        }
        return this.kanjiStem ?? this.kanaStem;
    }

    abstract dictForm(defaultKana : boolean) : string;
    abstract masuStem(defaultKana : boolean) : string;
    abstract te(defaultKana : boolean) : string;
    abstract ta(defaultKana : boolean) : string;
    abstract naiStem(defaultKana : boolean) : string;
    abstract cha(defaultKana : boolean) : string;
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

    override dictForm(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + godanVerb.loopUpDict[this.u]["う"];
    }

    override masuStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + godanVerb.loopUpDict[this.u]["い"];
    }

    override te(defaultKana : boolean = false): string {
       return this.stem(defaultKana) + godanVerb.loopUpDict[this.u]["て"];
    }

    override ta(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + godanVerb.loopUpDict[this.u]["た"];
    }

    override cha(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + godanVerb.loopUpDict[this.u]["ちゃ"];
    }

    override naiStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + godanVerb.loopUpDict[this.u]["あ"];
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

    override dictForm(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + "る";
    }

    override masuStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana) ;
    }

    override te(defaultKana : boolean = false): string {
       return this.stem(defaultKana) + "て";
    }

    override ta(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + "た";
    }

    override cha(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + "ちゃ";
    }

    override naiStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana);
    }
}

export interface I_suru {
    english : string;
    kanjiStem? : string;
    kanaStem : string;
}

export class suruVerb extends verb{

    constructor(i : I_suru)
    {
        super(i.kanjiStem,i.kanaStem,i.english);
    }

    override dictForm(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + "する";
    }

    override masuStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + "し";
    }

    override te(defaultKana : boolean = false): string {
       return this.stem(defaultKana) + "して";
    }

    override ta(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + "した";
    }

    override cha(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + "しちゃ";
    }

    override naiStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + "し";
    }
}

export interface I_iku {
    english : string;
    kanjiStem? : string;
    kanaStem : string;
}

export class ikuVerb extends verb{

    constructor(i : I_iku)
    {
        super(i.kanjiStem,i.kanaStem,i.english);
    }

    override dictForm(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + ( defaultKana? "いく" : "行く" );
    }

    override masuStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + ( defaultKana? "いき" : "行き");
    }

    override te(defaultKana : boolean = false): string {
       return this.stem(defaultKana) +  ( defaultKana? "いって" : "行って");
    }

    override ta(defaultKana : boolean = false): string {
        return this.stem(defaultKana) +  ( defaultKana? "いった" : "行った");
    }

    override cha(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + ( defaultKana? "いっちゃ" : "行っちゃ");
    }

    override naiStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + ( defaultKana? "いか" : "行か");
    }
}

export interface I_kuru {
    english : string;
    kanjiStem? : string;
    kanaStem : string;
}

export class kuruVerb extends verb{

    constructor(i : I_kuru)
    {
        super(i.kanjiStem,i.kanaStem,i.english);
    }

    override dictForm(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + ( defaultKana? "くる" : "来る" );
    }

    override masuStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + ( defaultKana? "き" : "来");
    }

    override te(defaultKana : boolean = false): string {
       return this.stem(defaultKana) +  ( defaultKana? "きて" : "来て");
    }

    override ta(defaultKana : boolean = false): string {
        return this.stem(defaultKana) +  ( defaultKana? "きた" : "来た");
    }

    override cha(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + ( defaultKana? "きちゃ" : "来ちゃ");
    }

    override naiStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + ( defaultKana? "こ" : "来");
    }
}

export interface I_aru {
    english : string;
    kanjiStem? : string;
    kanaStem : string;
}

export class aruVerb extends verb{

    constructor(i : I_aru)
    {
        super(i.kanjiStem,i.kanaStem,i.english);
    }

    override dictForm(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + "ある";
    }

    override masuStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + "あり";
    }

    override te(defaultKana : boolean = false): string {
       return this.stem(defaultKana) + "あって";
    }

    override ta(defaultKana : boolean = false): string {
        return this.stem(defaultKana) +  "あった";
    }

    override cha(defaultKana : boolean = false): string {
        return this.stem(defaultKana) + "あっちゃ";
    }

    override naiStem(defaultKana : boolean = false): string {
        return this.stem(defaultKana);
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

    override dictForm(defaultKana : boolean = false): string {
        if (defaultKana){
            return this.dictFormKana;
        }
        return this.dictFormKanji ?? this.dictFormKana;
    }

    masuStem(defaultKana : boolean = false): string {
        if (defaultKana){
            return this.masuStemKana;
        }
        return this.masuStemKanji ?? this.masuStemKana;
    }
    te(defaultKana : boolean = false): string {
        if (defaultKana){
            return this.teKana;
        }
        return this.teKanji ?? this.teKana;
    }
    ta(defaultKana : boolean = false): string {
        if (defaultKana){
            return this.taKana;
        }
        return this.taKanji ?? this.taKana;
    }

    override cha(defaultKana : boolean = false): string {
        if (defaultKana){
            return this.chaKana;
        }
        return this.chaKanji ?? this.chaKana;
    }

    naiStem(defaultKana : boolean = false): string {
        if (defaultKana){
            return this.naiStemKana;
        }
        return this.naiStemKanji ?? this.naiStemKana;
    }
}