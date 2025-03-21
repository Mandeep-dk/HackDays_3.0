import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const NewsDetail = () => {
  const { id } = useParams();  // ✅ Get the news ID from URL
  const [news, setNews] = useState(null);
  const [comment, setComment] = useState("");  // ✅ Stores the current comment
  const [comments, setComments] = useState([]);  // ✅ Stores all posted comments

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/community-news/${id}`);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news detail:", error);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]); // ✅ Add new comment to list
      setComment(""); // ✅ Clear input field
    }
  };

  if (!news) {
    return <p>Loading news...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg p-6">
      <header className="w-full">
        <h1 className="text-3xl font-bold text-gray-900">Latest Community News</h1>
      </header>
  
      {/* News Content */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">{news.title}</h2>
        <p className="text-gray-700 mt-2 leading-relaxed">{news.content}</p>
        <small className="text-gray-500 block mt-2">
          Published on {new Date(news.createdAt).toLocaleString()}
        </small>
      </div>
  
      {/* Comments Section */}
      <div className="w-full mt-10">
        <Comments />
      </div>
    </div>
  );
  
};

export default NewsDetail;
