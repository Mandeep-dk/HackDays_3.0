import { useState } from "react";
import React from 'react';
import axios from "axios";

const UploadNews = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [factCheckResult, setFactCheckResult] = useState(null);
  const [verdictCheck, setVerdictCheck] = useState(null); 
  const [uploadStatus, setUploadStatus] = useState("");

  const BASE_URL = "http://localhost:3000/news";

  // Function to Fact-Check News
  const factCheckNews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/fact-check`, {
        params: { title, content }
      });

      console.log("Fact-Check Response:", response.data);

      const credibilityCheckText = response.data.credibilityCheck || "";
      
      // Extract reason and verdict using regex
      const reasonMatch = credibilityCheckText.match(/Reason:\s(.+?)\n\nVerdict:/s);
const verdictMatch = credibilityCheckText.match(/Verdict:\s(.+)/);


      // Extract text or provide default fallback
      const reason = reasonMatch ? reasonMatch[1].trim() : "No clear reason provided.";
      const verdict = verdictMatch ? verdictMatch[1].trim() : "Verdict not found.";

      console.log("Extracted Reason:", reason);
      console.log("Extracted Verdict:", verdict);

      // Convert verdict to boolean (true/false)
      const verdictBoolean = verdict.toLowerCase().includes("true");

      setVerdictCheck(verdictBoolean); 
      setFactCheckResult({ reason, verdict });
    } catch (error) {
      console.error("Error checking news credibility:", error);
      setFactCheckResult({ verdict: "Error verifying news.", reason: "Unable to fetch verification." });
    }
  };

  // Separate function to submit news
  const submitNews = async () => {
    if (verdictCheck === null) {
      setUploadStatus("Please fact-check the news first.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/upload-news`, {
        title,
        content,
        verdict: verdictCheck
      }, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Upload Response:", response.data);
      setUploadStatus(response.data.message);
      setTitle("");
      setContent("");
      setFactCheckResult(null);
      setVerdictCheck(null);
    } catch (error) {
      console.error("Error uploading news:", error);
      setUploadStatus("Failed to upload news.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-5">Upload News</h2>

      {/* Form */}
      <form className="space-y-4">
        {/* News Title */}
        <input
          type="text"
          placeholder="News Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        {/* News Content */}
        <textarea
          placeholder="Write your news here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg h-36 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        {/* Fact-Check Button */}
        <button
          type="button"
          onClick={factCheckNews}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Fact-Check News
        </button>

        {/* Fact-Check Result */}
        {factCheckResult && (
          <div className="p-3 bg-gray-100 rounded-lg border border-gray-300 mt-2">
            <p className="font-semibold">
              <span className="text-gray-700">Verdict:</span> {factCheckResult.verdict}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Reason:</span> {factCheckResult.reason}
            </p>
          </div>
        )}

        {/* Upload Button */}
        <button
          type="button"
          onClick={submitNews} // Manually triggered
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          disabled={verdictCheck === null} // Prevents uploading without fact-checking
        >
          Upload News
        </button>
      </form>

      {/* Upload Status */}
      {uploadStatus && <p className="text-center mt-4 text-gray-700">{uploadStatus}</p>}
    </div>
  );
};

export default UploadNews;
