
import { useState } from "react";
import { textToSpeech } from "./TextToSpeech";
import { allVerbs, allVerbConjuctions, allNouns } from "./types/util";

interface sentenceData {
    kanji? : string;
    kana : string;
}

function getRandomSentence() : sentenceData
{
    if (!allVerbs || !allVerbConjuctions|| !allNouns ){
        throw("EITHER VERBS OR CONJUGATIONS NOT DEFINED?? WEIRD")
    }

    switch (Math.floor(Math.random() * 2)){
        //verb
        case 0:
        {
            const randomV = allVerbs.n5[Math.floor(Math.random() * allVerbs.n5.length)];
            const randomC = allVerbConjuctions[Math.floor(Math.random() * allVerbConjuctions.length)];
            const expression = randomC.runExpression(randomV);
            return {kanji: expression.outputKanji, kana: expression.outputKana}
        }
        case 1:
        {
            const randomN = allNouns.n5[Math.floor(Math.random() * allNouns.n5.length)];
            return {kanji: randomN.kanji ?? randomN.kana, kana: randomN.kana}
        }   
    }
    return {kana: "ERROR", kanji: "ERROR"}
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

    const [randomVerb, setRandomVerb] = useState<sentenceData>(getRandomSentence());
    const [showWord, setShowWord] = useState(false);

    return (
    <div>
        <h2>
            Japanese N5 Sentences - Randomised
        </h2>
        <p>
            Hear randomised grammatically correct words and sentences, and learn to hear natural pronunciation from Google Cloud's Text-to-Speech AI. 
        </p>
        <div>
            <button onClick={() => {
                setRandomVerb(getRandomSentence())
                setShowWord(false);
            }}>
                Try New Word
            </button>

            <button onClick={() => {
                textToSpeech(randomVerb.kana)
            }}>
                Play Word
            </button>
            
            <button onClick={
                () => setShowWord(!showWord)
            }>
                {showWord ? "Hide Word" : "Show Word"}
            </button>
        </div>
        <p>
            {showWord ? (randomVerb.kanji + " (" + randomVerb.kana + ")") : ""} 
        </p>
    </div>)
    

}