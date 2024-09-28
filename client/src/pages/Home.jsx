import React, { useState, useEffect } from 'react';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

export default function Home  ()  {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/users');
        const jsonData = await res.json();
  
        // Map over the data to extract the values from the nested objects
        const _data = jsonData.map(item => ({
          thought: item.thought.S,
          createdAt: Number(item.createdAt.N), // Convert string to number
          username: item.username.S,
          image: item.image?.S || null, // Use optional chaining to safely access image
        })).sort((a, b) => b.createdAt - a.createdAt); // Sort by createdAt
  
        setThoughts(_data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          <ThoughtForm />
        </div>
        <div className={`col-12 mb-3 `}>
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
              <ThoughtList thoughts={thoughts} setThoughts={setThoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>
      </div>
    </main>
  );
};


