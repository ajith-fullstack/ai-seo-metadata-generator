const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const geminiService = {
    async processImage(data = {}) {
        const imagePart = {
            inlineData: {
                data: data.buffer.toString('base64'),
                mimeType: data.mimetype
            }
        };
        const prompt = `Analyze this image and generate highly optimized SEO metadata for it.
        Return ONLY a strict JSON object with the exact following schema and no markdown formatting:
        {
          "title": "A catchy, SEO-friendly title (max 60 characters)",
          "description": "A detailed SEO meta description (max 160 characters)",
          "alt": "Descriptive alt text for accessibility and SEO",
          "tags": ["tag1", "tag2", "tag3"],
          "category": "One main category",
          "collection": "A relevant collection or album name",
          "publish_time": "Suggest the best day of the week and time to publish this post for maximum engagement based on the image content. Provide the time strictly in IST (Indian Standard Time)"
        }`;
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-2.5-flash',
            generationConfig: {
                responseMimeType: "application/json", 
            }
        });
        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text();
        const seoData = JSON.parse(responseText);
        return {
            success: true,
            data: seoData
        }
    }
};

module.exports = geminiService;