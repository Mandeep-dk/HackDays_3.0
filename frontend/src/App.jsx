import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import UploadNews from './components/UploadPage';
import CommunityNews from './components/CommunityNews';
import NewsDetail from './components/NewsDetail';
function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/upload-news" element={<UploadNews />} />
        <Route path="/community-news" element={<CommunityNews />} />
        <Route path="/news/:id" element={<NewsDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;
