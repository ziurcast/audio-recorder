/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import getBlobDuration from 'get-blob-duration'

let recorder = null;

const useRecording = () => {
  const [permissions, setPermissions] = useState(true);
  const [currentRecording, setCurrentRecording] = useState(null);

  const recorded = (blob) => ({
    blob,
    audioSrc: URL.createObjectURL(blob),
    audio: new Audio(URL.createObjectURL(blob))
  });

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        recorder = new MediaRecorder(stream);

        recorder.addEventListener('dataavailable', onStop);
      }).catch(() => {
        navigator.permissions.query({ name: 'microphone' })
          .then((permissionObj) => {
            if (permissionObj.state === 'denied') {
              setPermissions(false);
            }
          })
      });

    return () => {
      recorder.removeEventListener('dataavailable', onStop);
    }
  }, []);

  const onStop = async (e) => {
    console.log(`Tamaño del Audio ${(e.data.size / 1024 / 1024).toFixed(2)}Mb`)
    const duration = await getBlobDuration(e.data);
    let recording = recorded(e.data);
    recording.duration = duration;
    setCurrentRecording(recording);
  }

  const startRecording = () => {
    if (recorder.state === 'paused') {
      recorder.resume();
    } else {
      setCurrentRecording(null);
      recorder.start();
    }
  }

  const stopRecording = () => {
    recorder.stop();
  }

  const pauseRecording = () => {
    recorder.pause();
  }

  return ({
    hasPermissions: permissions,
    startRecording,
    stopRecording,
    pauseRecording,
    currentRecording,
  });
};

export default useRecording;
