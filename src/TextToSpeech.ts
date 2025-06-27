// Imports the Google Cloud client library

// Import other required libraries
// Creates a client
// interface request {
//   input : {text : string}
//   voice : {languageCode : string, ssmlGender : 'FEMALE' | 'MALE' | undefined},
//   audioConfig : {audioEncoding : 'MP3'}
// }

const randomNames = [
  "ja-JP-Chirp3-HD-Achernar","ja-JP-Chirp3-HD-Algenib","ja-JP-Chirp3-HD-Kore","ja-JP-Chirp3-HD-Sadachbia"
]
function getRandomName(){
  return randomNames[Math.floor(Math.random() * randomNames.length)];
}


const address = "https://ajones-jp-text-to-speech-uk.azurewebsites.net/TTS";
var retrieved : Iterable<number> | undefined;
var previous = "";
var previousRate : number = 0;
var previousSpeaker = "";
var playing = false;


export async function loadTTS(setButtonActive : (state : boolean) => void, text : string, rate: number){
    setButtonActive(false);
    await textToSpeech(text,rate).catch(() => setButtonActive(true));
    setButtonActive(true);
}

//https://stackoverflow.com/questions/59955096/how-to-decode-binary-audio-data
async function textToSpeech(toSet : string, rate : number) {

  toSet = toSet.trim();
  if (toSet == ""){
    return;
  }
  if (playing){
    return;
  }

  playing = true;

  if (toSet != previous || previousRate != rate || !retrieved){
    const speaker = ((toSet != previous || previousSpeaker == "") ? getRandomName() : previousSpeaker);
    const a = await window.fetch(address + `?text=\"${toSet}\"&rate=${rate}&speaker=${speaker}`);
    retrieved = (await a.json()).data.data;
    previous = toSet;
    previousRate = rate;
    previousSpeaker = speaker;
  }
  if (!retrieved){
    return;
  }
  const arr = Uint8Array.from(retrieved);
  
  const audioContext = new AudioContext();
  const audio = await audioContext.decodeAudioData(arr.buffer);
  const source = audioContext.createBufferSource();
  source.buffer = audio;
  source.connect(audioContext.destination);
  source.start(0);
  await new Promise(resolve => setTimeout(resolve, audio.duration*1000));
  playing = false;
}