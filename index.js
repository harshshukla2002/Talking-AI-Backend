const { OpenAI } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: "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",
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
  });
});

app.listen(8000, () => {
  console.log("server is running");
});
