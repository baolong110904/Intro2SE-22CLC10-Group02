import React, { useState } from "react"

const Tools = () => {
  const [text, setText] = useState("")
  const [errors, setErrors] = useState([])
  const [language, setLanguage] = useState("en-US") // default is English
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = (e) => {
    setText(e.target.value)
    setIsChecked(false) // Reset checked state on text change
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  const checkGrammar = async () => {
    try {
      const response = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text: text,
          language: language,
        }),
      })

      const data = await response.json()
      setErrors(data.matches)
      setIsChecked(true) // Set checked state after checking grammar
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Grammar Checker</h1>
      <select
        value={language}
        onChange={handleLanguageChange}
        className="mb-4 p-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        <option value="en-US">English</option>
        <option value="ja">Japanese</option>
      </select>
      <textarea
        value={text}
        onChange={handleChange}
        rows="6"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <button
        onClick={checkGrammar}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
      >
        Check Grammar
      </button>
      {isChecked && errors.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold">Grammar Issues:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index} className="mt-2">
                <strong>{error.message}</strong> (Context:{" "}
                {error.context.text.slice(
                  error.context.offset,
                  error.context.offset + error.context.length,
                )}
                )
              </li>
            ))}
          </ul>
        </div>
      )}
      {isChecked && errors.length === 0 && text && (
        <div className="mt-6 p-4 bg-green-50 border border-green-300 text-green-700 rounded-lg shadow-sm">
          No grammar issues found!
        </div>
      )}
    </div>
  )
}

export default Tools
