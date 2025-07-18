
import { useState } from "react";
import { loadTTS} from "./TextToSpeech";
import { RateSlider } from "./RateSlider";
import { getRandomSentence, sentenceData } from "./getRandomSentence";

interface randomSentenceForWriting{
    sentence : sentenceData,
    missingLetter : string,
    sentenceWithMissingLetter : string
}

function getRandomSentenceForWriting() : randomSentenceForWriting{

    const sentence = getRandomSentence(true);
    const kanjiSentence : String = sentence.kanji ?? "";

    console.log("CALLED");
    const allKanjiCharacters = [];

    for (var i = 0, n = kanjiSentence.length; i < n; i++) {
        const charCode = kanjiSentence.charCodeAt( i );
        if (charCode < 0x3040 || charCode > 0x30FF){
            console.log(kanjiSentence.charAt(i));
            allKanjiCharacters.push(i);
        }
    }
    
    const randomInt = allKanjiCharacters[Math.floor(Math.random() * (allKanjiCharacters.length))];


    const missingLetter : string = kanjiSentence.charAt(randomInt) ?? "";
    const sentenceWithMissingLetter : string = kanjiSentence.substring(0, randomInt) + "_" + kanjiSentence.substring(randomInt + 1);
    return {sentence: sentence, missingLetter: missingLetter, sentenceWithMissingLetter: sentenceWithMissingLetter};
}

interface props {
    loaded : boolean
}

export function WriteRandomSentence({loaded} : props){
    if (!loaded){
        return (<div>
            "not loaded! error!!"
        </div>)
    }

    const [randomSentence, setRandomSentence] = useState<randomSentenceForWriting>(() => getRandomSentenceForWriting());
    
    const [showWord, setShowWord] = useState(false);
    const [rate, setRate] = useState<number>(1.0);
    const [buttonActive, setButtonActive] = useState<boolean>(true);

    return (
    <div>
        <h2>
            Japanese N5 Sentences - Randomised Kanji
        </h2>
        <p>
            Hear randomised grammatically correct words and sentences using Google Cloud's Text-to-Speech AI, and fill in the missing Kanji. 
        </p>
        <div className="flex justify-center">
            <button className="w-1/3" onClick={
                buttonActive ? () => {
                setRandomSentence(getRandomSentenceForWriting());
                setShowWord(false);} : undefined
                }
                disabled={!buttonActive}
            >
                {buttonActive ? "New Phrase" : "..."}
            </button>

            <button  onClick={
                buttonActive ? (() => loadTTS(setButtonActive, randomSentence.sentence.tts, rate)) : undefined
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
        {showWord &&
            <h1 className="container-small kanjiCharacters">
                {randomSentence.missingLetter}
            </h1>
        }
        <p className="container-small min-h-8 align-middle">
            {showWord ? 
            (randomSentence.sentence.kanji + " (" + randomSentence.sentence.kana + ")") :
            randomSentence.sentenceWithMissingLetter} 
        </p>

    </div>)

}