import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [mediaUrl, setMediaUrl] = useState("");
  const [explanation, setExplanation] = useState("");
  const [title, setTitle] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
        );
        const data = await response.json();
        setMediaUrl(data.url);
        setExplanation(data.explanation);
        setTitle(data.title);
        setMediaType(data.media_type);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching NASA data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderMedia = () => {
    if (mediaType === "image") {
      return (
        <img src={mediaUrl} alt="NASA Image" style={{ maxWidth: "100%" }} />
      );
    } else if (mediaType === "video") {
      return (
        <iframe
          title="NASA Video"
          width="560"
          height="315"
          src={mediaUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      return <p>Unsupported media type</p>;
    }
  };

  return (
    <div className="container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {renderMedia()}
          <div className="m-body">
            <h2>{title}</h2>
            <p>{explanation}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
