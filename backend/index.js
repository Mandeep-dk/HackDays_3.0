import express from "express";
import cors from "cors";
import factChecking from './routes/factChecking.js'; // Import routes
import rssNewsFeed from './routes/rssNewsFeed.js';
import topstoriesFeed from './routes/topStoriesFeed.js';
import communityNews from './routes/communityNews.js';
import connectDb from '././config/db.js';

const app = express();
const PORT = 3000;

connectDb();
app.use(cors());
app.use(express.json());

// ✅ Correct way to use the router
app.use("/news", factChecking);
app.use("/search", rssNewsFeed);
app.use("/top-stories", topstoriesFeed);
app.use("/community-news", communityNews);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
