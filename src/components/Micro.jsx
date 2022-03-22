import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { WaveformContianer, Wave } from "./Audio.styled";
import MicrophonePlugin from "wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js"

const Waveform = () => {
  const waveMicro = useRef();

  useEffect(() => {
    waveMicro.current = WaveSurfer.create({
      barWidth: 3,
      barRadius: 3,
      barGap: 5,
      barMinHeight: 1,
      cursorWidth: 1,
      container: "#waveform2",
      backend: "WebAudio",
      height: 55,
      progressColor: "#FE6E00",
      responsive: true,
      waveColor: "#C4C4C4",
      cursorColor: "transparent",
      plugins: [
        MicrophonePlugin.create()
      ]
    });

    waveMicro.current.microphone.on('deviceReady', (stream) => {
      console.log('Device ready!', stream);
    });
    waveMicro.current.microphone.on('deviceError', (code) => {
      console.warn('Device error: ' + code);
    });

    waveMicro.current.microphone.start();
  }, []);

  return (
    <WaveformContianer>
      <Wave id="waveform2" />
    </WaveformContianer>
  );
}

export default Waveform;
