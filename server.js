const express = require('express');
require('dotenv').config();
const seoRoutes = require("./routes/seoRoutes");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());
app.use("/api", seoRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});