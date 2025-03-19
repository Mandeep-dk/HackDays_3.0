import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded">
           <header className="flex justify-between items-center w-full max-w-6xl mx-auto py-4 px-6 bg-black">
                <h1 className="text-3xl font-bold text-white ">Latest Community News</h1>
               
               
          </header>
          <div className="mt-4">
                <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
                <p className="text-gray-700 text-lg">{news.content}</p>
                <small className="text-gray-500">Published on {new Date(news.createdAt).toLocaleString()}</small>

          </div>

      {/* Comment Box */}
      <div className="mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Leave a Comment</h2>
        <textarea
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          onClick={handleCommentSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </div>

      {/* Display Comments */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Comments:</h2>
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <div key={index} className="p-2 bg-white border rounded mb-2">
              {c}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
