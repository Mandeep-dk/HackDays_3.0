import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [newsSearch, setNewsSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]); // Search results
  const [topStoriesData, setTopStoriesData] = useState([]); // Top stories

  useEffect(() => {
    // Fetch top stories when the page loads
    axios
      .get("http://localhost:3000/top-stories")
      .then((res) => {
        console.log("Top Stories:", res.data);
        setTopStoriesData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching top stories:", error);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm) {
        return;
    }
    axios.get("http://localhost:3000/search?q=" + searchTerm)
        .then((res) => {
            console.log(res.data);
            setData(res.data)

        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });

    axios.get("http://localhost:3000/top-stories")
        .then((res) => {
            console.log(res.data);
            setTopStoriesData(res.data);
        })
        .catch((error) => {
            console.error("Error fetching news:", error);
        });
}, [searchTerm])

  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center w-full max-w-6xl mx-auto py-4 px-6 bg-black">
        <h1 className="text-3xl font-bold text-white">Positive News</h1>
       
        <Link to="/community-news">
            <button className="text-white hover cursor-pointer ml-[100vh]">Community News</button>
        </Link>
        <Link to="/upload-news">
            <button className="text-white hover cursor-pointer">Upload News</button>
        </Link>
      </header>

      {/* Search Bar */}
      <div className="flex justify-center w-full">
        <div className="flex w-full max-w-6xl gap-2 p-2 border rounded-xl mt-7">
          <input
            type="text"
            placeholder="Search..."
            value={newsSearch}
            onChange={(e) => setNewsSearch(e.target.value)}
            className="border border-gray-300 rounded-xl p-2 flex-1"
          />
          <button
            className="border border-gray-300 rounded-xl px-4 py-2"
            onClick={() => setSearchTerm(newsSearch.trim())} // Remove extra spaces
          >
            Search
          </button>
          {searchTerm && (
            <button
              className="border border-gray-300 rounded-xl px-4 py-2 bg-red-500 text-white"
              onClick={() => {
                setSearchTerm(""); // Clear search term
                setNewsSearch(""); // Clear input
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Displaying Search Results or Top Stories */}
      <div className="flex flex-col items-start w-full max-w-6xl mx-auto">
        {searchTerm ? (
          <>
            <h2 className="text-2xl font-bold mt-4">Search Results</h2>
            {data.length > 0 ? (
              data.map((item, index) => (
                <div key={index} className="border-b border-gray-300 p-4 w-full">
                  <strong className="flex justify-between items-center w-full text-lg">
                    {item.title}
                  </strong>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {item.link.length > 30
                      ? item.link.slice(0, 15) + "..." + item.link.slice(-10)
                      : item.link}
                  </a>
                  <small className="block text-gray-500">
                    {item.pubDate} | {item.source}
                  </small>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-2">No results found.</p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mt-4">Top Stories</h2>
            {topStoriesData.map((item, index) => (
              <div key={index} className="border-b border-gray-300 p-4 w-full">
                <strong className="flex justify-between items-center w-full text-lg">
                  {item.title}
                </strong>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {item.link.length > 30
                    ? item.link.slice(0, 15) + "..." + item.link.slice(-10)
                    : item.link}
                </a>
                <small className="block text-gray-500">
                  {item.pubDate} | {item.source}
                </small>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
