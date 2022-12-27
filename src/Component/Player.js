import { useEffect, useState } from "react";
import useSound from "use-sound";
import djdaddio_helpmeifyoucan from "../assets/djdaddio_helpmeifyoucan.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

function Player() {

const [isPlaying, setIsPlaying] = useState(false);

const [play, { pause, duration, sound }] = useSound(djdaddio_helpmeifyoucan);
const [time, setTime] = useState({
    min: "",
    sec: ""
  });
const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  }); // current position of the audio in minutes and seconds

const [seconds, setSeconds] = useState();

useEffect(() => {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain
      });
  }, [isPlaying, duration]);

useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([])); // setting the seconds state with the current state
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

const playingButton = () => {
    if (isPlaying) {
        pause();  
        setIsPlaying(false);
    } else {
        play();
        setIsPlaying(true);
    }
}; 

return (
    <div className="component">
        <h2>Playing Now</h2>
      <img
        className="musicCover"
        src="https://picsum.photos/200/200?random=1"
        //src="https://source.unsplash.com/random/200x200"
        alt="random"
      />
      <div>
        <h3 className="title">DJDaddio</h3>
        <p className="subTitle">Help me if you can</p>
      </div>
      <div>   
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#274E60" }}>
              {!isPlaying ? <AiFillPlayCircle /> : <AiFillPauseCircle /> }
            </IconContext.Provider>
          </button>
      </div>      
      <div>
        <div className="time">
          <p>
            {currTime.min}:{currTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
    </div>
);

}

export default Player;
