import { faCircleNotch, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { getChatGPTMessage } from "../openai/openai";

const Demo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dreamInterpretation, setDreamInterpretation] = useState<string | null>(
    null
  );
  const [error, setError] = useState<any>();
  const [numberOfChars, setNumberOfChars] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const inputValue = (e.currentTarget as HTMLFormElement)
        .elements[0] as HTMLInputElement;
      const dreamInterpretation = await getChatGPTMessage(inputValue.value);
      setDreamInterpretation(dreamInterpretation);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <p className="ml-auto text-sm font-semibold">{numberOfChars} / 200</p>
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <FontAwesomeIcon
            icon={faLink}
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="text"
            placeholder="Enter your dream"
            className="url_input peer"
            required
            onChange={(e) => {
              if (e.target.value.length >= 200) {
                setNumberOfChars(e.target.value.length);
              }
            }}
            onKeyDown={(e) => {
              const isValidKey = /^[a-zA-Z0-9,.\s]$/.test(e.key);
              if (isValidKey) {
                setNumberOfChars((prev) => prev + 1);
              } else if (e.key === "Backspace") {
                setNumberOfChars((prev) => (prev === 0 ? 0 : prev - 1));
              }
            }}
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            disabled={numberOfChars < 200}
          >
            <p>↵</p>
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {/* {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))} */}
        </div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isLoading ? (
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="w-5 h-5 text-amber-500"
            spin
          />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Something went terrifyingly wrong....
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error}
            </span>
          </p>
        ) : (
          dreamInterpretation && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600">
                Dream <span className="blue_gradient">Interpretation</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {dreamInterpretation}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
