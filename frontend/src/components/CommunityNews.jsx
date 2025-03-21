import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const BASE_URL = "http://localhost:3000"; // Replace with your backend URL

const CommunityNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/community-news`);
        console.log(response)
        const newsWithVotes = response.data.map((item) => ({
          ...item,
          votes: Math.floor(Math.random() * 100), // Random initial votes
        }));
        setNews(newsWithVotes);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleVote = (id, type) => {
    setNews((prevNews) =>
      prevNews.map((item) =>
        item._id === id
          ? {
              ...item,
              votes:
                type === "up"
                  ? item.votes + 1
                  : item.votes - 1,
            }
          : item
      )
    );
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      {/* Header */}
      <header className="flex justify-between items-center w-full px-4">
        <h1 className="text-3xl font-bold text-black">Latest Community News</h1>
      </header>
  
      {/* News List */}
      <div className="mt-6 space-y-4">
        {news.length > 0 ? (
          news.map((item) => (
            <div
              key={item._id}
              className="flex items-start w-full p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
            >
              {/* Upvote & Downvote Section */}
              <div className="flex flex-col items-center mr-5">
                <button
                  onClick={() => handleVote(item._id, "up")}
                  className="text-gray-500 hover:text-green-500 transition"
                >
                  <FaArrowUp size={24} />
                </button>
                {/* Negative votes if AI marks it false */}
                <span className="text-lg font-semibold mt-1">
                  {item.verdict === "false" ? -Math.abs(item.votes) : item.votes}
                </span>
                <button
                  onClick={() => handleVote(item._id, "down")}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <FaArrowDown size={24} />
                </button>
              </div>
  
              {/* News Content */}
              <Link to={`/news/${item._id}`} className="w-full">
                <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
                  {item.title}
                </h3>
  
                <p className="text-gray-700 line-clamp-2 mt-1">{item.content}</p>
                <small className="text-gray-500">{new Date(item.createdAt).toLocaleString()}</small>
                {item.verdict === "false" && (
                  <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded ml-2">
                    AI flagged this as false news
                  </span>
                )}
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No news available</p>
        )}
      </div>
    </div>
  );
  
};

export default CommunityNews;
