import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ThoughtList from '../components/ThoughtList';


export default function Profile (props) {
  const { username: userParam } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([{
    username: userParam,
    createdAt: '', 
    thought: '',
  }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/${userParam}`);
        const dynamoData = await res.json();
  
        // Directly map over the data to extract the values from the nested objects
        const _data = dynamoData.map(item => ({
          thought: item.thought.S,
          createdAt: Number(item.createdAt.N), // Convert string to number
        })).sort((a, b) => b.createdAt - a.createdAt); // Sort by createdAt
  
        console.log(_data); // Logging the mapped data
        setThoughts(_data); // Set the transformed data
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [userParam]);
  
  

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${userParam}'s` : 'your'} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-9">
        {!isLoaded ? (
            <div>Loading...</div>
          ) : (
          <ThoughtList thoughts={thoughts} title={`${userParam}'s thoughts...`} />
          )}
        </div>
      </div>
    </div>
  );
};
