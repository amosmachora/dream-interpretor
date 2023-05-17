import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.REACT_APP_OPEN_AI_SECRET_KEY,
  })
);

export const getChatGPTMessage = async (dream: string): Promise<string> => {
  return await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `The text below is from a dream i had. Reply with the most likely interpretation => ${dream}`,
        },
      ],
    })
    .then((res) => res.data.choices[0].message as unknown as string);
};

// xhr.js:162 Refused to set unsafe header "User-Agent"
