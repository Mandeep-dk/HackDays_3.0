import express from 'express'; 
import axios from "axios";
import convert from "xml-js";

const router = express.Router();
let newsTitles=[];

router.get('/', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ error: "Missing search query" });

        console.log(query);
        const response = await axios.get(`https://news.google.com/rss/search?q=${query}`, {
            headers: { "User-Agent": "Mozilla/5.0" },
        });

        var result = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 4 }));

        // Ensure newsTitles is cleared before adding new results
        newsTitles.length = 0;

        newsTitles.push(
            ...result.rss.channel.item.map(item => ({
                title: item.title._text,
                link: item.link?._text || "No link available",
                pubDate: item.pubDate?._text || "No date available",
                source: item.source?._text || "Unknown source",
                description: item.description?._text || "No description available",
            }))
        );

        res.json(newsTitles);
    } catch (error) {
        console.error("Error fetching news", error);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});


export default router;