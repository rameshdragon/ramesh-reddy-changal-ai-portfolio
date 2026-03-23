import fs from "fs";
import path from "path";

// Extract env vars manually
const envPath = path.resolve(".env");
let envText = "";
try {
  envText = fs.readFileSync(envPath, "utf8");
} catch(e) {}
const envLines = envText.split("\n");
const envVars = {};
for (const line of envLines) {
  if (line.trim().startsWith("#") || !line.includes("=")) continue;
  const [key, ...rest] = line.split("=");
  envVars[key.trim()] = rest.join("=").trim();
}

const cfToken = envVars.CLF_API_Token || process.env.CLF_API_Token;
const cfAccountId = envVars.CLF_ACCOUNT_ID || process.env.CLF_ACCOUNT_ID;
const cfModel = envVars.CLF_MODEL || process.env.CLF_MODEL || "@cf/meta/llama-3-8b-instruct";

async function run() {
  const messages = [
    { role: "system", content: "You are a test system." },
    { role: "user", content: "do you want to work at microsoft" }
  ];

  console.log("Token:", cfToken);
  console.log("Account ID:", cfAccountId);
  
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/${cfModel}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${cfToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      messages,
      max_tokens: 800
    })
  });

  if (!response.ok) {
    console.error("CF API Error:", await response.text());
  } else {
    const data = await response.json();
    console.log("Success:", data);
  }
}

run();
