import { useState } from "react";
import { textToSpeech } from "./TextToSpeech";
import { RateSlider } from "./RateSlider";


export function TextToSpeechComponent()
{

    const [result, setResult] = useState("");
    const [rate, setRate] = useState<number>(1.5);

    return <div>
        <h2>Text to Speech - Japanese</h2>
        <p>Input any text for realistic text to speech.</p>
        <div className="flex justify-center">
            <input name="Text Input" value={result} onChange={e => setResult(e.target.value)} className="max-h-fit w-1/2 my-auto"/>
            <button onClick={() => textToSpeech(result, rate)}>TEXT TO SPEECH</button>
        </div>

        <RateSlider rate={rate} setRate={setRate}/>
    </div>
}