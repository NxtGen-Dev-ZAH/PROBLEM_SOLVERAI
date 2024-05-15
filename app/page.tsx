// CHAT COMPLETION OR PROBLEM SOLVER APP
"use client"
import React, { useState } from 'react';

const App: React.FC = () => {
  const [problemTitle, setProblemTitle] = useState('');
  const [problemNotes, setProblemNotes] = useState('');
  const [response, setResponse] = useState('');

  const handleGenerateDescription = async () => {
    try {
      const response = await fetch('/api/product_description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Title: problemTitle, detail: problemNotes }),
      });
      if (response.ok) {
        const data = await response.json();
        setResponse(data['PROBLEM SOLUTION ']);
        
      } else {
        // setResponse("i like pakistans and not    enough information to generate a solution description for the problem description  ")
        throw new Error('Failed to generate description');
      }
    } catch (error) {
      console.error('Error generating description:', error);
    }
  };

  return (
    <main  className='w-screen h-screen bg-cover bg-center ' style={{ backgroundImage: "url(/FUTURISTIC.png)"}} >
      <div className='p-6'>
      <h1 className="text-4xl mb-4 text-gray-200 font-semibold" >Problem Solver</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter problem title"
          value={problemTitle}
          onChange={(e) => setProblemTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          placeholder="Enter problem notes"
          value={problemNotes}
          onChange={(e) => setProblemNotes(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleGenerateDescription}
          className=" font-semibold px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate Solution
        </button>
        {response && (
          <div className=" bg-gray-300 border border-gray-300 rounded-md p-4">
            <h3 className="font-bold mb-2 text-black text-3xl">Model Response:</h3>
            <p className=" font-semibold mb-2 text-black" >{response}</p>
          </div>
        )}
      </div>
      </div>
    </main>
  );
};

export default App;
