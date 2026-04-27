const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// FILE WHERE DATA IS STORED
const FILE = "submissions.json";

// INIT FILE IF NOT EXISTS
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
}

// POST endpoint
app.post("/submit", (req, res) => {
    const newData = req.body;

    const data = JSON.parse(fs.readFileSync(FILE, "utf8"));

    data.push({
        ...newData,
        date: new Date().toISOString()
    });

    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

    res.json({
        status: "success",
        message: "Data saved successfully"
    });
});

// GET (optional for checking)
app.get("/data", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});