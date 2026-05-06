const axios = require("axios");

async function callOllama(prompt) {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3:latest",
      prompt,
      stream: false,
    });

    return response.data.response;
  } catch (error) {
    console.error("❌ Ollama API Error");

    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }

    throw error;
  }
}

module.exports = { callOllama };