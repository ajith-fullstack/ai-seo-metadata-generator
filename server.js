const express = require('express');
const path = require('path');
require('dotenv').config();
const seoRoutes = require("./routes/seoRoutes");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api", seoRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});