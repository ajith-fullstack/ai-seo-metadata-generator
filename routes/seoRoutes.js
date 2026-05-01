const express = require("express");
const router = express.Router();
const multer = require("multer");

const { generateSEO } = require("../controllers/seoController");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

router.post("/generate-seo", upload.single("image"), generateSEO);

module.exports = router;