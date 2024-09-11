import React, { useEffect, useState } from 'react';

function TranscriptEditor({ initialTranscript }) {

    const [transcript, setTranscript] = useState(initialTranscript);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        let timeout;
        if (isPlaying && currentIndex !== null) {
            const currentWord = transcript[currentIndex];
            if (currentWord) {
                timeout = setTimeout(() => {
                    setCurrentIndex(currentIndex + 1);
                }, currentWord.duration)
            }
            else {
                setIsPlaying(false);
                setCurrentIndex(null);
            }
        }
        return () => clearTimeout(timeout);

    },[isPlaying, currentIndex, transcript]);

    const handlePlay = () => {
        setIsPlaying(true);
        setCurrentIndex(0);
    }

    const handleStop = () => {
        setIsPlaying(false);
        setCurrentIndex(null);
    }
    
    const handleWordClick = (index) => {
        if (!isPlaying){
            const newWord = prompt('Edit Word:', transcript[index].word);
            if (newWord) {
                const updatedTranscript = [...transcript];
                updatedTranscript[index].word = newWord;
                setTranscript(updatedTranscript);
            }
        }
    }

  return (
    <>
    <div>
      {transcript.map((word, index) => (
        <span
          key={index}
          className={`word inline-block mr-2 ${
            currentIndex === index ? 'text-yellow-500' : ''
          }`}
          onClick={() => handleWordClick(index)}
        >
          {word.word}
        </span>
      ))}
    </div>
    <div className='flex space-x-20 mt-5 justify-center'>
            <button className='border border-green-600 px-2 rounded-md bg-green-700' onClick={handlePlay} disabled= {isPlaying}>Play</button>
            <button className='border border-red-600 px-2 rounded-md bg-red-700' onClick={handleStop} disabled= {!isPlaying}>Stop</button>
    </div>
    </>
  );
}

export default TranscriptEditor;
