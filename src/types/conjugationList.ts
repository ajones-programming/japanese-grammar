import { adjective } from "./adjectives";
import { noun } from "./nouns";
import { verb } from "./verbs";


export interface I_VerbConjuction{
    english : string;
    expression : string;
    expressionKanji? : string;
    expressionTTS? : string;

    options?: string[];
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

    private options?: string[];

    constructor(i : I_VerbConjuction){
        this.english = i.english;
        this.expression = i.expression;
        this.expressionKanji = i.expressionKanji;
        this.expressionTTS = i.expressionTTS;
        this.options = i.options;
    }

    runExpression(verb : verb) : conjunctionResult{

        var option: string | undefined;
        if (this.options){
            option = this.options[Math.floor(Math.random() * this.options.length)];
        }
        if (this.expression.includes("POTENTIAL")){
            verb = verb.potential();
        }

        var outputTTS = this.expressionTTS ?? this.expressionKanji ?? this.expression;
        outputTTS = outputTTS.replace("POTENTIAL","");
        outputTTS = outputTTS.replace("DICT_FORM",verb.dictForm(false, true));
        outputTTS = outputTTS.replace("MASU_STEM",verb.masuStem(false, true));
        outputTTS = outputTTS.replace("NAI_STEM",verb.naiStem(false, true));
        outputTTS = outputTTS.replace("TE",verb.te(false, true));
        outputTTS = outputTTS.replace("TA",verb.ta(false, true));
        outputTTS = outputTTS.replace("CHA",verb.cha(false, true));
        outputTTS = outputTTS.replace("OPTION",option ?? "");
        var outputKanji = this.expressionKanji ?? this.expression;
        outputKanji = outputKanji.replace("POTENTIAL", "");
        outputKanji = outputKanji.replace("DICT_FORM",verb.dictForm(false,false));
        outputKanji = outputKanji.replace("MASU_STEM",verb.masuStem(false,false));
        outputKanji = outputKanji.replace("NAI_STEM",verb.naiStem(false,false));
        outputKanji = outputKanji.replace("TE",verb.te(false,false));
        outputKanji = outputKanji.replace("TA",verb.ta(false,false));
        outputKanji = outputKanji.replace("CHA",verb.cha(false,false));
        outputKanji = outputKanji.replace("OPTION",option ?? "");
        var outputKana = this.expression;
        outputKana = outputKana.replace("POTENTIAL","");
        outputKana = outputKana.replace("DICT_FORM",verb.dictForm(true,false));
        outputKana = outputKana.replace("MASU_STEM",verb.masuStem(true,false));
        outputKana = outputKana.replace("NAI_STEM",verb.naiStem(true,false));
        outputKana = outputKana.replace("TE",verb.te(true,false));
        outputKana = outputKana.replace("TA",verb.ta(true,false));
        outputKana = outputKana.replace("CHA",verb.cha(true,false));
        outputKana = outputKana.replace("OPTION",option ?? "");
        return {
            wordEnglish: verb.english,
            conjugationType: this.english,
            outputKanji: outputKanji,
            outputKana: outputKana,
            outputTTS: outputTTS
        };
    }

    hasKanji(){return this.expressionKanji != undefined;}
}

export interface I_NounConjuction{
    english : string;
    expression : string;
    expressionKanji? : string;
    expressionTTS? : string
    options? : string[];
}

export class NounConjugation{
    public english : string = "";
    private expression : string = "";
    private expressionKanji? : string;
    private expressionTTS? : string;
    private options? : string[];

    constructor(i : I_NounConjuction){
        this.english = i.english;
        this.expression = i.expression;
        this.expressionKanji = i.expressionKanji;
        this.expressionTTS = i.expressionTTS;
        this.options = i.options;
    }

    runExpression(noun : noun) : conjunctionResult{
        var option: string | undefined;
        if (this.options){
            option = this.options[Math.floor(Math.random() * this.options.length)];
        }

        var outputTTS = this.expressionTTS ?? this.expressionKanji ?? this.expression;
        outputTTS = outputTTS.replace("NOUN",noun.tts ?? noun.kanji ?? noun.kana);
        outputTTS = outputTTS.replace("OPTION",option??"");
        var outputKanji = this.expressionKanji ?? this.expression;
        outputKanji = outputKanji.replace("NOUN",noun.kanji ?? noun.kana);
        outputKanji = outputKanji.replace("OPTION",option ?? "");
        var outputKana = this.expression;
        outputKana = outputKana.replace("NOUN",noun.kana);
        outputKana = outputKana.replace("OPTION",option ?? "");
        return {
            wordEnglish: noun.english,
            conjugationType: this.english,
            outputKanji: outputKanji,
            outputKana: outputKana,
            outputTTS : outputTTS
        };
    }

    hasKanji(){return this.expressionKanji != undefined;}
}

export interface I_AdjectiveConjuction{
    english : string;
    expression : string;
    expressionKanji? : string;
    expressionTTS? : string;
    options? : string[];
}

export class AdjectiveConjugation{
    public english : string = "";
    private expression : string = "";
    private expressionKanji? : string;
    private expressionTTS? : string;
    private options? : string[];

    constructor(i : I_AdjectiveConjuction){
        this.english = i.english;
        this.expression = i.expression;
        this.expressionKanji = i.expressionKanji;
        this.expressionTTS = i.expressionTTS;
        this.options = i.options;
    }

    runExpression(adjective : adjective) : conjunctionResult{
        var option: string | undefined;
        if (this.options){
            option = this.options[Math.floor(Math.random() * this.options.length)];
        }
        var outputTTS = this.expressionTTS ?? this.expressionKanji ?? this.expression;
        outputTTS = outputTTS.replace("DICT_FORM",adjective.dictForm(false, true));
        outputTTS = outputTTS.replace("DESCRIPTOR",adjective.descriptorForm(false, true));
        outputTTS = outputTTS.replace("PRESENT",adjective.present(false, true));
        outputTTS = outputTTS.replace("PAST_NEGATIVE",adjective.pastNegative(false, true));
        outputTTS = outputTTS.replace("PAST",adjective.past(false, true));
        outputTTS = outputTTS.replace("NEGATIVE",adjective.presentNegative(false, true));
        outputTTS = outputTTS.replace("ADVERB",adjective.adverb(false, true));
        outputTTS = outputTTS.replace("STEM",adjective.stem(false, true));
        outputTTS = outputTTS.replace("OPTION",option ?? "");
        outputTTS = outputTTS.replace("TE",adjective.te(false, true));
        var outputKanji = this.expressionKanji ?? this.expression;
        outputKanji = outputKanji.replace("DICT_FORM",adjective.dictForm(false,false));
        outputKanji = outputKanji.replace("DESCRIPTOR",adjective.descriptorForm(false,false));
        outputKanji = outputKanji.replace("PRESENT",adjective.present(false,false));
        outputKanji = outputKanji.replace("PAST_NEGATIVE",adjective.pastNegative(false,false));
        outputKanji = outputKanji.replace("PAST",adjective.past(false,false));
        outputKanji = outputKanji.replace("NEGATIVE",adjective.presentNegative(false,false));
        outputKanji = outputKanji.replace("ADVERB",adjective.adverb(false,false));
        outputKanji = outputKanji.replace("STEM",adjective.stem(false,false));
        outputKanji = outputKanji.replace("OPTION",option ?? "");
        outputKanji = outputKanji.replace("TE",adjective.te(false,false));
        var outputKana = this.expression;
        outputKana = outputKana.replace("DICT_FORM",adjective.dictForm(true, false));
        outputKana = outputKana.replace("DESCRIPTOR",adjective.descriptorForm(true, false));
        outputKana = outputKana.replace("PRESENT",adjective.present(true, false));
        outputKana = outputKana.replace("PAST_NEGATIVE",adjective.pastNegative(true, false));
        outputKana = outputKana.replace("PAST",adjective.past(true, false));
        outputKana = outputKana.replace("NEGATIVE",adjective.presentNegative(true, false));
        outputKana = outputKana.replace("ADVERB",adjective.adverb(true, false));
        outputKana = outputKana.replace("STEM",adjective.stem(true, false));
        outputKana = outputKana.replace("OPTION",option ?? "");
        outputKana = outputKana.replace("TE",adjective.te(true, false));
        return {
            wordEnglish: adjective.english,
            conjugationType: this.english,
            outputKanji: outputKanji,
            outputKana: outputKana,
            outputTTS : outputTTS
        };
    }

    hasKanji(){return this.expressionKanji != undefined;}
}