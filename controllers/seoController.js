const geminiService = require("../services/geminiService");

exports.generateSEO = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided.' });
        }
        const result = await geminiService.processImage(req.file);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error analyzing image:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to process image with AI.'
        });
    }
};