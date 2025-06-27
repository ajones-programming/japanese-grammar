
import { useState } from "react";
import { loadTTS} from "./TextToSpeech";
import { allVerbs, allVerbConjuctions, allNouns, allNounConjunctions } from "./types/util";
import { RateSlider } from "./RateSlider";

interface sentenceData {
    kanji? : string;
    tts : string;
    kana : string;
}

function getRandomSentence() : sentenceData
{
    if (!allVerbs || !allVerbConjuctions|| !allNouns || !allNounConjunctions){
        throw("EITHER VERBS OR CONJUGATIONS NOT DEFINED?? WEIRD")
    }

    switch (Math.floor(Math.random() * 2)){
        //verb
        case 0:
        {
            const randomV = allVerbs.n5[Math.floor(Math.random() * allVerbs.n5.length)];
            const randomC = allVerbConjuctions[Math.floor(Math.random() * allVerbConjuctions.length)];
            const expression = randomC.runExpression(randomV);
            return {kanji: expression.outputKanji, kana: expression.outputKana, tts: expression.outputTTS}
        }
        case 1:
        {
            const randomN = allNouns.n5[Math.floor(Math.random() * allNouns.n5.length)];
            const randomC = allNounConjunctions[Math.floor(Math.random() * allNounConjunctions.length)];
            const expression = randomC.runExpression(randomN);
            return {kanji: expression.outputKanji, kana: expression.outputKana, tts: expression.outputTTS}
        }   
    }
    return {kana: "ERROR", kanji: "ERROR", "tts" : "ERROR"}
}



interface props {
    loaded : boolean
}

export function RandomSentence({loaded} : props){
    if (!loaded){
        return (<div>
            "not loaded! error!!"
        </div>)
    }

    const [randomSentence, setRandomSentence] = useState<sentenceData>(getRandomSentence());
    const [showWord, setShowWord] = useState(false);
    const [rate, setRate] = useState<number>(1.0);
    const [buttonActive, setButtonActive] = useState<boolean>(true);

    return (
    <div>
        <h2>
            Japanese N5 Sentences - Randomised
        </h2>
        <p>
            Hear randomised grammatically correct words and sentences, and learn to hear natural pronunciation from Google Cloud's Text-to-Speech AI. 
        </p>
        <div className="flex justify-center">
            <button className="w-1/3" onClick={
                buttonActive ? () => {
                setRandomSentence(getRandomSentence())
                setShowWord(false);} : undefined
                }
                disabled={!buttonActive}
            >
                {buttonActive ? "New Phrase" : "..."}
            </button>

            <button  onClick={
                buttonActive ? (() => loadTTS(setButtonActive, randomSentence.tts, rate)) : undefined
            } className="w-1/3"
            disabled={!buttonActive}
            >
                {buttonActive ? "Play" : "..."}
            </button>
            
            <button className="w-1/3" onClick={
                () => setShowWord(!showWord)
            }>
                {showWord ? "Hide Word" : "Show Word"}
            </button>
        </div>
        <RateSlider rate={rate} setRate={setRate}/>
        <p className="container-small min-h-8 align-middle">
            {showWord ?  (randomSentence.kanji + " (" + randomSentence.kana + ")") : ""} 
        </p>
    </div>)

}