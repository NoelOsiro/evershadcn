'use client'
import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';


const GenerateEulogy: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    // Replace with actual API call to generate eulogy
    const response = await fetch('/api/generate-eulogy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setResult(data.eulogy);
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full"
      />
      <Button onClick={handleGenerate}>Generate Eulogy</Button>
      {result && <Textarea value={result} readOnly className="w-full" />}
    </div>
  );
};

export default GenerateEulogy;
