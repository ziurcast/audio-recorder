import './styles/App.css';
import { useState } from 'react';
import useRecording from './hooks/useRecording';
import Audio from './components/Audio';
import Micro from './components/Micro';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording, pauseRecording, hasPermissions, currentRecording } = useRecording();

  return (
    <div className="App">
      <div className="App-header">
        <div className='App-list-audios'>
          audios
        </div>
        <div className='App-footer'>
          <div>
            {isRecording ? <Micro /> : currentRecording !== null && <Audio recording={currentRecording} />}
          </div>
          <button
            disabled={!hasPermissions}
            onClick={() => {
              if (!isRecording) {
                setIsRecording(true);
                startRecording();
              } else {
                setIsRecording(false);
                pauseRecording()
              }
            }}
            className={`App-button-recording ${isRecording && 'App-button-recording--red'}`}
          >
            {!isRecording ? ' 🎤 ' : ' ⏸️ ' }
          </button>
          <button
            onClick={() => {
              setIsRecording(false);
              stopRecording();
            }}
            className={`App-button-recording`}
          >
            ➡️
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
