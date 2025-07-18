export abstract class adjective{

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

    hasKanji(){return this.kanjiStem != undefined;}

    abstract dictForm(defaultKana : boolean, tts : boolean) : string;
    abstract descriptorForm(defaultKana : boolean, tts : boolean) : string;
    abstract present(defaultKana : boolean, tts : boolean) : string;
    abstract presentNegative(defaultKana : boolean, tts : boolean) : string;
    abstract past(defaultKana : boolean, tts : boolean) : string;
    abstract pastNegative(defaultKana : boolean, tts : boolean) : string;
    abstract adverb(defaultKana : boolean, tts : boolean) : string;
    abstract te(defaultKana : boolean, tts : boolean) : string;

}

export interface I_na_adjective {
    english : string;
    kanjiStem? : string;
    ttsStem? : string;
    kanaStem : string;
    u : string;
}

export class naAdjective extends adjective{

    constructor(i : I_na_adjective)
    {
        super(i.kanjiStem,i.kanaStem,i.english, i.ttsStem);
    }

    override dictForm(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts);
    }

    override descriptorForm(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "な";
    }

    override present(defaultKana: boolean, tts: boolean): string {
        return this.stem(defaultKana, tts) + "だ";
    }

    override presentNegative(defaultKana: boolean, tts: boolean): string {
        const random = Math.floor(Math.random() * 2);
        switch (random){
            case 0:
                return this.stem(defaultKana, tts) + "じゃない";
            case 1:
                return this.stem(defaultKana, tts) + "ではない";
            default:
                return "ERROR";
        }
    }

    override past(defaultKana: boolean, tts: boolean): string {
        const random = Math.floor(Math.random() * 2);
        switch (random){
            case 0:
                return this.stem(defaultKana, tts) + "だった";
            case 1:
                return this.stem(defaultKana, tts) + "でした";
            default:
                return "ERROR";
        }
    }

    override pastNegative(defaultKana: boolean, tts: boolean): string {
        const random = Math.floor(Math.random() * 2);
        switch (random){
            case 0:
                return this.stem(defaultKana, tts) + "じゃなかった";
            case 1:
                return this.stem(defaultKana, tts) + "ではありませんでした";
            default:
                return "ERROR";
        }
    }

    override adverb(defaultKana: boolean, tts: boolean): string {
        return this.stem(defaultKana, tts) + "に";
    }

    override te(defaultKana: boolean, tts: boolean): string {
        return this.stem(defaultKana, tts) + "で";
    }
}


export interface I_i_adjective {
    english : string;
    kanjiStem? : string;
    ttsStem? : string;
    kanaStem : string;
    u : string;
}

export class iAdjective extends adjective{

    constructor(i : I_i_adjective)
    {
        super(i.kanjiStem,i.kanaStem,i.english, i.ttsStem);
    }

    override dictForm(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "い";
    }

    override descriptorForm(defaultKana : boolean = false, tts : boolean = false): string {
        return this.stem(defaultKana, tts) + "い";
    }

    override present(defaultKana: boolean, tts: boolean): string {
        return this.stem(defaultKana, tts) + "い";
    }

    override presentNegative(defaultKana : boolean, tts : boolean) : string{
        if (Math.random() > 0.5){
            return this.stem(defaultKana, tts) + "くありません";
        }
        return this.stem(defaultKana, tts) + "くない";
    }

    override past(defaultKana: boolean, tts: boolean): string {
        return this.stem(defaultKana, tts) + "かった";
    }

    override pastNegative(defaultKana: boolean, tts: boolean): string {
        if (Math.random() > 0.5){
            return this.stem(defaultKana, tts) + "くありません";
        }
        return this.stem(defaultKana, tts) + "くない";
    }

    override adverb(defaultKana: boolean, tts: boolean): string {
        return this.stem(defaultKana, tts) + "く";
    }

    override te(defaultKana: boolean, tts: boolean): string {
        return this.stem(defaultKana, tts) + "くて";
    }
}