import React, { useState } from 'react';
import { FaFileAudio } from "react-icons/fa6";
import axios from 'axios';

const DictionarySearch = () => {
  const [word, setWord] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [audioError, setAudioError] = useState('');

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  const handleSearch = async () => {
    if (word.trim() === '') {
      setError('Please enter a word.');
      return;
    }

    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setResults(response.data[0]);
      setError('');
      setAudioError(''); // Reset audio error when a new search is made
    } catch (error) {
      setResults(null);
      setError('Word not found or an error occurred.');
    }
  };

  const handlePlayAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);

    audio.onerror = () => {
      setAudioError('Unable to play audio. Please try again later.');
    };

    audio.play().catch(() => {
      setAudioError('An error occurred while trying to play the audio.');
    });
  };

  return (
    <div className="max-w-[800px] mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dictionary Search</h2>
      <div className="flex items-center mb-6">
        <input
          type="text"
          value={word}
          onChange={handleChange}
          placeholder="Enter a word..."
          className="p-3 border border-gray-300 rounded-lg shadow-sm w-full mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
        >
          Search
        </button>
      </div>

      {results && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2 flex items-center">
            Word: {results.word}
            {results.phonetics[0]?.audio && (
              <button
                onClick={() => handlePlayAudio(results.phonetics[0].audio)}
                className="ml-4 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                <FaFileAudio/>
              </button>
            )}
          </h3>
          {results.phonetic && (
            <p className="mb-2"><strong className="text-gray-800">Phonetic:</strong> {results.phonetic}</p>
          )}
          {results.origin && (
            <p className="mb-4"><strong className="text-gray-800">Origin:</strong> {results.origin}</p>
          )}
          <div>
            {results.meanings.map((meaning, index) => (
              <div key={index} className="mb-6">
                <hr className="my-6 border-t-2 border-gray-300" style={{ width: '80%' }} />
                <h4 className="text-lg font-semibold text-red-500">{meaning.partOfSpeech}</h4>
                <ul className="list-disc ml-6 mt-2">
                  {meaning.definitions.map((def, idx) => (
                    <li key={idx} className="mb-2">
                      <p className="text-gray-700"><strong>Definition:</strong> {def.definition}</p>
                      {def.example && (
                        <p className="text-green-500"><strong>Example:</strong> {def.example}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg shadow-sm">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {audioError && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 text-yellow-700 rounded-lg shadow-sm">
          <p className="font-semibold">{audioError}</p>
        </div>
      )}
    </div>
  );
};

export default DictionarySearch;
