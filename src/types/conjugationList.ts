import { noun } from "./nouns";
import { verb } from "./verbs";


export interface I_VerbConjuction{
    english : string;
    expression : string;
    expressionKanji? : string;
}

export interface conjunctionResult{
    wordEnglish : string;
    conjugationType : string;
    outputKanji : string;
    outputKana : string;
    
}


export class verbConjugation{
    public english : string = "";
    private expression : string = "";
    private expressionKanji? : string;

    constructor(i : I_VerbConjuction){
        this.english = i.english;
        this.expression = i.expression;
        this.expressionKanji = i.expressionKanji;
    }

    runExpression(verb : verb) : conjunctionResult{
        var outputKanji = this.expressionKanji ?? this.expression;
        outputKanji = outputKanji.replace("DICT_FORM",verb.dictForm(false));
        outputKanji = outputKanji.replace("MASU_STEM",verb.masuStem(false));
        outputKanji = outputKanji.replace("NAI_STEM",verb.naiStem(false));
        outputKanji = outputKanji.replace("TE",verb.te(false));
        outputKanji = outputKanji.replace("TA",verb.ta(false));
        outputKanji = outputKanji.replace("CHA",verb.cha(false));
        var outputKana = this.expression;
        outputKana = outputKana.replace("DICT_FORM",verb.dictForm(true));
        outputKana = outputKana.replace("MASU_STEM",verb.masuStem(true));
        outputKana = outputKana.replace("NAI_STEM",verb.naiStem(true));
        outputKana = outputKana.replace("TE",verb.te(true));
        outputKana = outputKana.replace("TA",verb.ta(true));
        outputKana = outputKana.replace("CHA",verb.cha(true));
        return {
            wordEnglish: verb.english,
            conjugationType: this.english,
            outputKanji: outputKanji,
            outputKana: outputKana
        };
    }
}

export interface I_NounConjuction{
    english : string;
    expression : string;
    expressionKanji? : string;
}

export class NounConjugation{
    public english : string = "";
    private expression : string = "";
    private expressionKanji? : string;

    constructor(i : I_NounConjuction){
        this.english = i.english;
        this.expression = i.expression;
        this.expressionKanji = i.expressionKanji;
    }

    runExpression(noun : noun) : conjunctionResult{
        var outputKanji = this.expressionKanji ?? this.expression;
        outputKanji = outputKanji.replace("NOUN",noun.kanji ?? noun.kana);
        var outputKana = this.expression;
        outputKana = outputKana.replace("NOUN",noun.kana);
        return {
            wordEnglish: noun.english,
            conjugationType: this.english,
            outputKanji: outputKanji,
            outputKana: outputKana
        };
    }
}