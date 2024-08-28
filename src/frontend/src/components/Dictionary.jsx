import React, { useState } from 'react';
import axios from 'axios';

const DictionarySearch = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
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
      const meanings = response.data[0].meanings;
      const definitions = meanings.map((meaning) =>
        meaning.definitions.map((def) => def.definition).join(', ')
      ).join('; ');

      setDefinition(definitions);
      setError('');
    } catch (error) {
      setDefinition('');
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
      {definition && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Definition:</h3>
          <p className="p-4 border border-gray-300 rounded">{definition}</p>
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
