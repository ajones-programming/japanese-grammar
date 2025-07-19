import { allAdjectiveConjunctions, allAdjectives, allCounters, allNounConjunctions, allNouns, allVerbConjuctions, allVerbs} from "./types/util";

export interface sentenceData {
    kanji? : string;
    tts : string;
    kana : string;
}

export function getRandomSentence(tag : string,mustBeKanji = false) : sentenceData
{
    if (!allVerbs || !allVerbConjuctions|| !allNouns || !allNounConjunctions || !allAdjectives || !allAdjectiveConjunctions || !allCounters){
        throw("EITHER VERBS OR CONJUGATIONS NOT DEFINED?? WEIRD")
    }

    switch (Math.floor(Math.random() * 4)){
        //verb
        case 0:
        {
            const randomV = allVerbs[tag][Math.floor(Math.random() * allVerbs[tag].length)];
            const randomC = allVerbConjuctions[tag][Math.floor(Math.random() * allVerbConjuctions[tag].length)];
            const expression = randomC.runExpression(randomV);
            if (mustBeKanji && !randomC.hasKanji() && !randomV.hasKanjiForm()){
                const reroll = getRandomSentence(tag,true);
                console.log("original: " + expression.outputKanji + ", reroll: " +  reroll.kanji);
                return reroll;
            }
            return {kanji: expression.outputKanji, kana: expression.outputKana, tts: expression.outputTTS}
        }
        case 1:
        {
            const randomN = allNouns[tag][Math.floor(Math.random() * allNouns[tag].length)];
            const randomC = allNounConjunctions[tag][Math.floor(Math.random() * allNounConjunctions[tag].length)];
            const expression = randomC.runExpression(randomN);
            if (mustBeKanji && !randomC.hasKanji() && !randomN.kanji){
                const reroll = getRandomSentence(tag,true);
                console.log("original: " + expression.outputKanji + ", reroll: " +  reroll.kanji);
                return reroll;
            }
            return {kanji: expression.outputKanji, kana: expression.outputKana, tts: expression.outputTTS}
        }  
        case 2:
        {
            const randomA = allAdjectives[tag][Math.floor(Math.random() * allAdjectives[tag].length)];
            const randomC = allAdjectiveConjunctions[tag][Math.floor(Math.random() * allAdjectiveConjunctions[tag].length)];
            const expression = randomC.runExpression(randomA);
            if (mustBeKanji && !randomC.hasKanji() && !randomA.hasKanji()){
                const reroll = getRandomSentence(tag,true);
                console.log("original: " + expression.outputKanji + ", reroll: " +  reroll.kanji);
                return reroll;
            }
            return {kanji: expression.outputKanji, kana: expression.outputKana, tts: expression.outputTTS}
        }
        case 3:
        {
            const randomC = allCounters[tag][Math.floor(Math.random() * allCounters[tag].length)];
            const randomNumber = randomC.getRandomNumberText();
            if (mustBeKanji && !randomC.hasKanji()){
                const reroll = getRandomSentence(tag,true);
                console.log("original: " + randomNumber + ", reroll: " +  reroll.kanji);
                return reroll;
            }
            return {kanji: randomNumber, kana: randomNumber, tts: randomNumber}
        } 
    }
    return {kana: "ERROR", kanji: "ERROR", "tts" : "ERROR"}
}