import express from 'express'; 
import axios from "axios";
import convert from "xml-js";

const router = express.Router();
let newsTitles=[];

router.get('/', async (req, res)=>{
    try {
        const response = await axios.get(`https://news.google.com/rss?topstories?hl=en-IN&gl=IN&ceid=IN:en&hl=en-IN`, {
            headers: { "User-Agent": "Mozilla/5.0" },
        })
    
        var result = JSON.parse(convert.xml2json(response.data, { compact: true, spaces: 4 }))
        
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
    }catch(error){
        console.error("Error fetching news", error);
    }
})

export default router;