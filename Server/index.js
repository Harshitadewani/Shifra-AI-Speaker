import express from "express";
import cors from "cors";
import run from "./run.js"; // tumhara run() function

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  try {
    const answer = await run(question);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: "AI thoda busy hai 😅" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));