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
          ? { ...item, votes: type === "up" ? item.votes + 1 : item.votes - 1 }
          : item
      )
    );
  };

  return (
    <div>
      <header className="flex justify-between items-center w-full max-w-6xl mx-auto py-4 px-6 bg-black">
        <h1 className="text-3xl font-bold text-white">Latest Community News</h1>
      </header>

      <div className="flex flex-col items-center w-full max-w-6xl mx-auto py-4 px-4 mt-4 bg-gray-200">
        {news.length > 0 ? (
          news.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between w-full p-4 mb-4 bg-white shadow rounded"
            >
              {/* Upvote & Downvote Section */}
              <div className="flex flex-col items-center mr-4">
                <button
                  onClick={() => handleVote(item._id, "up")}
                  className="text-gray-600 hover:text-green-500"
                >
                  <FaArrowUp size={20} />
                </button>
                <span className="text-lg font-semibold">{item.votes}</span>
                <button
                  onClick={() => handleVote(item._id, "down")}
                  className="text-gray-600 hover:text-red-500"
                >
                  <FaArrowDown size={20} />
                </button>
              </div>

              {/* News Content */}
              <Link to={`/news/${item._id}`} className="block w-full">
                <h3 className="font-bold text-2xl">{item.title}</h3>
                <p>{item.content}</p>
                <small>{new Date(item.createdAt).toLocaleString()}</small>
              </Link>
            </div>
          ))
        ) : (
          <p>No news available</p>
        )}
      </div>
    </div>
  );
};

export default CommunityNews;
