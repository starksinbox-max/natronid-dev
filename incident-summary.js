import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateSummary(incidentDetails) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are a legal assistant helping summarize traffic stop incidents clearly and calmly.",
      },
      { role: "user", content: incidentDetails },
    ],
    temperature: 0.5,
  });

  return response.choices[0].message.content;
}

// Example usage
const details = `I was pulled over at 3:15pm on I-65 heading south. The officer said I was speeding, asked for my ID and registration. I complied. The interaction was calm, lasted 8 minutes.`;

generateSummary(details).then((summary) => {
  console.log("Summary:", summary);
  fs.writeFileSync("incident-summary.txt", summary);
});
