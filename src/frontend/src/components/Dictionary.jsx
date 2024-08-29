import React, { useState } from 'react';
import axios from 'axios';

const DictionarySearch = () => {
  const [word, setWord] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

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
    } catch (error) {
      setResults(null);
      setError('Word not found or an error occurred.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dictionary Search</h2>
      <input
        type="text"
        value={word}
        onChange={handleChange}
        placeholder="Enter a word..."
        className="p-2 border border-gray-300 rounded w-full mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {results && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Word: {results.word}</h3>
          {results.phonetic && (
            <p><strong>Phonetic:</strong> {results.phonetic}</p>
          )}
          {results.origin && (
            <p><strong>Origin:</strong> {results.origin}</p>
          )}

          <div className="mt-4">
            {results.meanings.map((meaning, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-lg font-bold">{meaning.partOfSpeech}</h4>
                <ul>
                  {meaning.definitions.map((def, idx) => (
                    <li key={idx} className="ml-4">
                      <p><strong>Definition:</strong> {def.definition}</p>
                      {def.example && (
                        <p><strong>Example:</strong> {def.example}</p>
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
        <div className="mt-4 text-red-600 font-semibold">
          {error}
        </div>
      )}
    </div>
  );
};

export default DictionarySearch;
