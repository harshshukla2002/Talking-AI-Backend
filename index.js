const { OpenAI } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: `${process.env.API_KEY}`,
});

app.post("/", async (request, response) => {
  const { prompt } = request.body;

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "assistant",
        content: prompt,
      },
    ],
  });

  response.json({
    output: result.choices[0].message.content,
    left: result.usage.total_tokens,
  });
});

app.listen(8000, () => {
  console.log("server is running");
});
