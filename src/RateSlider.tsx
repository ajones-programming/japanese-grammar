import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


function setSliderValue(value : number | number[], setValue : (value: number) => void){
    if (typeof value === "number"){
        setValue(value)
    }
}
const marks = [
  {
    value: 0.5,
    label: '0.5x',
  },
  {
    value: 1.0,
    label: '1.0x',
  },
    {
    value: 1.5,
    label: '1.5x',
  },
];


interface props{
    rate : number,
    setRate : (rate: number) => void
}



export function RateSlider({rate, setRate} : props){
    return (
    <div className="flex justify-center m-4">
     <div className="rounded-xl bg-sky-50 p-2 shadow-lg outline outline-black/5 w-12 h-12 justify-center align-middle mx-4 my-auto">
        <Typography
            sx={{
                textAlign: "center",
                fontFamily:
                "Noto Emoji, Apple Color Emoji, sans-serif",
                height: "100%",
                alignContent: "center",
                fontSize: 24
            }}
            >
            🐢
        </Typography>
     </div>

    
    <Slider
        value={rate} onChange={(_event: Event, value:number | number[]) => setSliderValue(value,setRate)}
        defaultValue={1.5}
        valueLabelDisplay="auto"
        step={0.05}
        min={0.5}
        max={1.5}
        sx={{width: "50%", marginY: "auto"}}
        marks={marks}
    />

     <div className="rounded-xl bg-sky-50 p-2 shadow-lg outline outline-black/5 w-12 h-12 justify-center align-middle mx-4 my-auto">
        <Typography
            sx={{
                textAlign: "center",
                fontFamily:
                "Noto Emoji, Apple Color Emoji, sans-serif",
                height: "100%",
                alignContent: "center",
                fontSize: 24
            }}
            >
            🐇
        </Typography>
     </div>
    
    </div>)
}