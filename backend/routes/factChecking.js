import express from "express";
import UploadedNews from './../config/models/News.js'; 

const router = express.Router();

async function checkNewsCredibility(title, content) {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI("AIzaSyDrCEBD_V8_pIsiWn1jHoqq5S7163-kJQA");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an AI that verifies news credibility. 
    Analyze the following news and determine if it is true or false. 
    If you suspect it is fake or misleading, explain why. Otherwise, confirm its credibility. 
    Here is the news:
    - Title: "${title}"
    - Content: "${content}"
    
    Your response should include:
    1. A credibility score (0-100).
    2. A short reason if the news is false.
    3. A verdict: True or False.`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Could not verify news.";
        return responseText;
    } catch (error) {
        console.error("Error checking news credibility:", error);
        return "Could not verify news at the moment.";
    }
}

router.post('/upload-news', async (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required." });
    }

    try {
        // Check credibility before saving (assuming checkNewsCredibility is an async function)
        const credibilityResult = await checkNewsCredibility(title, content);

        const uploadedNews = new UploadedNews({ title, content });
        await uploadedNews.save();

        // Responding correctly with a single JSON response
        res.status(201).json({ 
            message: "News uploaded successfully to the db!", 
            credibilityCheck: credibilityResult 
        });

    } catch (error) {
        console.error("Error:", error);  // Logs error for debugging

        res.status(500).json({ error: "Failed to process request" });
    }
});

// Fact-Check Route (GET)
router.get('/fact-check', async (req, res) => {
    const { title, content } = req.query;  // Accepting title and content via query parameters

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required for fact-checking." });
    }

    try {
        const credibilityResult = await checkNewsCredibility(title, content);
        res.json({ credibilityCheck: credibilityResult });
    } catch (error) {
        res.status(500).json({ error: "Error checking news credibility" });
    }
});

export default router;
