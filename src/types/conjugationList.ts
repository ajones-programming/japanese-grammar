import { noun } from "./nouns";
import { verb } from "./verbs";


export interface I_VerbConjuction{
    english : string;
    expression : string;
    expressionKanji? : string;
    expressionTTS? : string;
}

export interface conjunctionResult{
    wordEnglish : string;
    conjugationType : string;
    outputKanji : string;
    outputKana : string;
    outputTTS : string;
    
}


export class verbConjugation{
    public english : string = "";
    private expression : string = "";
    private expressionKanji? : string;
    private expressionTTS? : string;

    constructor(i : I_VerbConjuction){
        this.english = i.english;
        this.expression = i.expression;
        this.expressionKanji = i.expressionKanji;
        this.expressionTTS = i.expressionTTS;
    }

    runExpression(verb : verb) : conjunctionResult{
        var outputTTS = this.expressionTTS ?? this.expressionKanji ?? this.expression;
        outputTTS = outputTTS.replace("DICT_FORM",verb.dictForm(true, true));
        outputTTS = outputTTS.replace("MASU_STEM",verb.masuStem(true, true));
        outputTTS = outputTTS.replace("NAI_STEM",verb.naiStem(true, true));
        outputTTS = outputTTS.replace("TE",verb.te(true, true));
        outputTTS = outputTTS.replace("TA",verb.ta(true, true));
        outputTTS = outputTTS.replace("CHA",verb.cha(true, true));
        var outputKanji = this.expressionKanji ?? this.expression;
        outputKanji = outputKanji.replace("DICT_FORM",verb.dictForm(false,false));
        outputKanji = outputKanji.replace("MASU_STEM",verb.masuStem(false,false));
        outputKanji = outputKanji.replace("NAI_STEM",verb.naiStem(false,false));
        outputKanji = outputKanji.replace("TE",verb.te(false,false));
        outputKanji = outputKanji.replace("TA",verb.ta(false,false));
        outputKanji = outputKanji.replace("CHA",verb.cha(false,false));
        var outputKana = this.expression;
        outputKana = outputKana.replace("DICT_FORM",verb.dictForm(true,false));
        outputKana = outputKana.replace("MASU_STEM",verb.masuStem(true,false));
        outputKana = outputKana.replace("NAI_STEM",verb.naiStem(true,false));
        outputKana = outputKana.replace("TE",verb.te(true,false));
        outputKana = outputKana.replace("TA",verb.ta(true,false));
        outputKana = outputKana.replace("CHA",verb.cha(true,false));
        return {
            wordEnglish: verb.english,
            conjugationType: this.english,
            outputKanji: outputKanji,
            outputKana: outputKana,
            outputTTS: outputTTS
        };
    }
}

export interface I_NounConjuction{
    english : string;
    expression : string;
    expressionKanji? : string;
    expressionTTS? : string
}

export class NounConjugation{
    public english : string = "";
    private expression : string = "";
    private expressionKanji? : string;
    private expressionTTS? : string;

    constructor(i : I_NounConjuction){
        this.english = i.english;
        this.expression = i.expression;
        this.expressionKanji = i.expressionKanji;
        this.expressionTTS = i.expressionTTS;
    }

    runExpression(noun : noun) : conjunctionResult{
        var outputTTS = this.expressionTTS ?? this.expressionKanji ?? this.expression;
        outputTTS = outputTTS.replace("NOUN",noun.tts ?? noun.kanji ?? noun.kana);
        var outputKanji = this.expressionKanji ?? this.expression;
        outputKanji = outputKanji.replace("NOUN",noun.kanji ?? noun.kana);
        var outputKana = this.expression;
        outputKana = outputKana.replace("NOUN",noun.kana);
        return {
            wordEnglish: noun.english,
            conjugationType: this.english,
            outputKanji: outputKanji,
            outputKana: outputKana,
            outputTTS : outputTTS
        };
    }
}