import axios, { AxiosRequestConfig } from "axios";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPEN_AI_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

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

export const getChatGPTMessageFromRapidAPI = async (
  dream: string
): Promise<string> => {
  const options: AxiosRequestConfig<any> = {
    method: "POST",
    url: "https://openai80.p.rapidapi.com/chat/completions",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_API_KEY!,
      "X-RapidAPI-Host": "openai80.p.rapidapi.com",
    },
    data: {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `The text below is from a dream i had. Reply with the most likely interpretation => ${dream}`,
        },
      ],
    },
  };

  const response = await axios.request(options);
  return response.data.choices[0].message as unknown as string;
};
