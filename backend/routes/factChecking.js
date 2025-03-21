import express from "express";
import UploadedNews from './../config/models/News.js';
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

async function checkNewsCredibility(title, content) {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an AI that verifies news credibility.
Analyze the following news and determine if it is true or false.

When assessing credibility, consider:

The possibility that news from remote areas or investigative reports may have limited sources.
Logical consistency, historical patterns, and corroborative evidence rather than outright dismissal due to lack of widespread reporting.
The presence of supporting claims, official statements, and expert opinions.
If the content is logically structured and meaningful, it should not be dismissed simply due to lack of mainstream coverage.
The news should be marked as false only if:

The content is gibberish (random characters, meaningless words, or nonsensical structure).
The news completely lacks logical sense (contradicts fundamental facts, has no coherent narrative, or is impossible to interpret).
The verdict should be only True or False based on the available information.

Here is the news:

Title: "${title}"
Content: "${content}"

Your response should include:

A credibility score (0-100) based on available evidence and context.
A short reason if the news is marked false (only in cases of gibberish or illogical content).
A verdict: True or False.`;

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
    const { title, content, verdict } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required." });
    }

    try {
        // Check credibility before saving (assuming checkNewsCredibility is an async function)
        const credibilityResult = await checkNewsCredibility(title, content, verdict);

        const uploadedNews = new UploadedNews({ title, content, verdict });
        await uploadedNews.save();

        // Responding correctly with a single JSON response
        res.status(201).json({
            message: "News uploaded successfully!",
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
