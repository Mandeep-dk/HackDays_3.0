import { useState } from "react";
import React from 'react';
import axios from "axios";

const UploadNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [factCheckResult, setFactCheckResult] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const BASE_URL = "http://localhost:3000/news"; // Corrected base URL

  const factCheckNews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/fact-check`, { 
        params: { title, content } // Use params for GET requests
      });
      console.log(response.data)
      const credibilityCheckText = response.data.credibilityCheck;

      // Extract reason and verdict using regex
      const reasonMatch = credibilityCheckText.match(/2\.\s\*\*Reason.*?\*\*\s(.+?)\n\n3\./s);
      const verdictMatch = credibilityCheckText.match(/3\.\s\*\*Verdict:\*\*\s(.+)/);
      
      // Extract text or provide default fallback
      const reason = reasonMatch ? reasonMatch[1].trim() : "Reason not found";
      const verdict = verdictMatch ? verdictMatch[1].trim() : "Verdict not found";
      
      console.log("Reason:", reason);
      console.log("Verdict:", verdict);
  
      setFactCheckResult({ reason, verdict });
    } catch (error) {
      console.error("Error checking news credibility:", error);
      setFactCheckResult({ verdict: "Error verifying news." });
    }
  };

  // Handle News Submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/upload-news`, { title, content }, {
        headers: { "Content-Type": "application/json" }, // Ensure correct headers
      });
      console.log(response.data);
      setUploadStatus(response.data.message);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error uploading news:", error);
      setUploadStatus("Failed to upload news.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Upload News Anonymously</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="News Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <textarea
          placeholder="Write your news here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-32"
          required
        />

        <button
          type="button"
          onClick={factCheckNews}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Fact-Check News
        </button>

        {factCheckResult && (
          <div className="p-2 bg-gray-100 rounded">
            <p><strong>Verdict:</strong> {factCheckResult.verdict}</p>
            <p><strong>Reason:</strong> {factCheckResult.reason}</p>
          </div>
        )}

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Upload News
        </button>
      </form>

      {uploadStatus && <p className="text-center mt-4">{uploadStatus}</p>}
    </div>
  );
};

export default UploadNews;
