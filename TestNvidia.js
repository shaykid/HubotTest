const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://integrate.api.nvidia.com/v1',
})
 
async function main() {
  const completion = await openai.chat.completions.create({
    model: "meta/llama-3.3-70b-instruct",
    messages: [{"role":"user","content":"Write a limerick about the wonders of GPU computing."}],
    temperature: 0.2,
    top_p: 0.7,
    max_tokens: 1024,
    stream: true
  })
   
  for await (const chunk of completion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }
  
}

main();
