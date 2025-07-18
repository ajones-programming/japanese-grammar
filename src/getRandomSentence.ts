import { allAdjectiveConjunctions, allAdjectives, allCounters, allNounConjunctions, allNouns, allVerbConjuctions, allVerbs } from "./types/util";

export interface sentenceData {
    kanji? : string;
    tts : string;
    kana : string;
}

export function getRandomSentence(mustBeKanji = false) : sentenceData
{
    if (!allVerbs || !allVerbConjuctions|| !allNouns || !allNounConjunctions || !allAdjectives || !allAdjectiveConjunctions || !allCounters){
        throw("EITHER VERBS OR CONJUGATIONS NOT DEFINED?? WEIRD")
    }

    
    switch (Math.floor(Math.random() * 4)){
        //verb
        case 0:
        {
            const randomV = allVerbs.n5[Math.floor(Math.random() * allVerbs.n5.length)];
            const randomC = allVerbConjuctions[Math.floor(Math.random() * allVerbConjuctions.length)];
            const expression = randomC.runExpression(randomV);
            if (mustBeKanji && !randomC.hasKanji() && !randomV.hasKanjiForm()){
                const reroll = getRandomSentence(true);
                console.log("original: " + expression.outputKanji + ", reroll: " +  reroll.kanji);
                return reroll;
            }
            return {kanji: expression.outputKanji, kana: expression.outputKana, tts: expression.outputTTS}
        }
        case 1:
        {
            const randomN = allNouns.n5[Math.floor(Math.random() * allNouns.n5.length)];
            const randomC = allNounConjunctions[Math.floor(Math.random() * allNounConjunctions.length)];
            const expression = randomC.runExpression(randomN);
            if (mustBeKanji && !randomC.hasKanji() && !randomN.kanji){
                const reroll = getRandomSentence(true);
                console.log("original: " + expression.outputKanji + ", reroll: " +  reroll.kanji);
                return reroll;
            }
            return {kanji: expression.outputKanji, kana: expression.outputKana, tts: expression.outputTTS}
        }  
        case 2:
        {
            const randomA = allAdjectives.n5[Math.floor(Math.random() * allAdjectives.n5.length)];
            const randomC = allAdjectiveConjunctions[Math.floor(Math.random() * allAdjectiveConjunctions.length)];
            const expression = randomC.runExpression(randomA);
            if (mustBeKanji && !randomC.hasKanji() && !randomA.hasKanji()){
                const reroll = getRandomSentence(true);
                console.log("original: " + expression.outputKanji + ", reroll: " +  reroll.kanji);
                return reroll;
            }
            return {kanji: expression.outputKanji, kana: expression.outputKana, tts: expression.outputTTS}
        }
        case 3:
        {
            const randomC = allCounters.n5[Math.floor(Math.random() * allCounters.n5.length)];
            const randomNumber = randomC.getRandomNumberText();
            if (mustBeKanji && !randomC.hasKanji()){
                const reroll = getRandomSentence(true);
                console.log("original: " + randomNumber + ", reroll: " +  reroll.kanji);
                return reroll;
            }
            return {kanji: randomNumber, kana: randomNumber, tts: randomNumber}
        } 
    }
    return {kana: "ERROR", kanji: "ERROR", "tts" : "ERROR"}
}