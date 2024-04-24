import React, { useState, useEffect } from "react";
import "./App.css";
import "./App.js";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [Explanation, setExplanation] = useState("");
  // const [imageUrl, setImageUrl] = useState('');
  const [Title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
        );
        const data = await response.json();
        setImageUrl(data.url);
        setExplanation(data.explanation);
        setTitle(data.title);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching NASA image:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className="container">
      {/* <h1 className="main-head">NASA Image of the Day</h1> */}
      {isLoading ? (
        <div className="loader">
          <div className="load-inner load-one"></div>
          <div className="load-inner load-two"></div>
          <div className="load-inner load-three"></div>
          <span className="text">Loading...</span>
        </div>
      ) : (
        imageUrl && (
          <img
            id="nasa-img"
            src={imageUrl}
            alt="NASA Image"
            style={{ maxWidth: "100%" }}
          />
        )
      )}
      <div className="m-body">
        <h2>{Title}</h2>
        <p>{Explanation}</p>
      </div>
    </div>
  );
}

export default App;
