import express from 'express';
import UploadedNews from './../config/models/News.js'; 

const router = express.Router();

router.get('/', async (req, res)=>{
    try{
        const news=await UploadedNews.find();
        console.log(news);
        res.json(news);
    }catch(error){
        console.error("Error fetching news:", error);
        res.status(500).json({error: "Failed to fetch news!"});
    }
})

router.get('/:id', async (req, res) => {
    try {
        console.log("Requested ID:", req.params.id); // Debugging
        const news = await UploadedNews.findById(req.params.id);
        if (!news) {
            return res.status(404).json({ error: "News not found" });
        }
        res.json(news);
    } catch (error) {
        console.error("Error fetching news detail:", error);
        res.status(500).json({ error: "Failed to fetch news detail!" });
    }
});

export default router;