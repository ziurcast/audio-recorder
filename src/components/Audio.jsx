import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { WaveformContianer, Wave, PlayButton } from "./Audio.styled";

const Waveform = (props) => {
  const wave = useRef();
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState('');
  const { recording } = props;

  useEffect(() => {
    if (recording.audio) {
      wave.current = WaveSurfer.create({
        barWidth: 3,
        barRadius: 3,
        barGap: 5,
        barMinHeight: 1,
        cursorWidth: 1,
        container: "#waveform",
        backend: "WebAudio",
        height: 55,
        progressColor: "#FE6E00",
        responsive: true,
        waveColor: "#C4C4C4",
        cursorColor: "transparent"
      });

      setDuration(Math.round(recording.duration));

      wave.current.load(recording.audio);
    }
  }, [recording]);

  useEffect(() => {
    wave.current.on('audioprocess', () => {
      if (wave.current.isPlaying()) {
        const totalTime = wave.current.getDuration();
        const currentTime = wave.current.getCurrentTime();
        const remainingTime = totalTime - currentTime;
        setDuration(Math.round(remainingTime));
      }
    });
  }, []);

  const handlePlay = () => {
    setPlaying(!playing);
    wave.current.playPause();
  };

  const fancyTimeFormat = (duration) => {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };

  return (
    <WaveformContianer>
      <PlayButton onClick={handlePlay}>
        {!playing ? " ▶️ " : " ⏸️ "}
      </PlayButton>
      <Wave id="waveform" />
      <div>{fancyTimeFormat(duration)}</div>
    </WaveformContianer>
  );
}

export default Waveform;
