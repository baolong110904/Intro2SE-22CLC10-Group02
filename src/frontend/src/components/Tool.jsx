import React, { useState } from 'react';

const Tools = () => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState([]);
  
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const checkGrammar = async () => {
    try {
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text: text,
          language: 'en-US',
        }),
      });

      const data = await response.json();
      setErrors(data.matches);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-8">
      <textarea
        value={text}
        onChange={handleChange}
        rows="6"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        onClick={checkGrammar}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Check Grammar
      </button>
      {errors.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Grammar Issues:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index} className="text-red-600">
                {error.message} (Context: {error.context.text.slice(error.context.offset, error.context.offset + error.context.length)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tools;
