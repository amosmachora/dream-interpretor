import { faIceCream } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import React from "react";

export const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <div className="flex items-end">
          <FontAwesomeIcon
            icon={faIceCream}
            className="object-cover mr-2 h-10 text-amber-500"
          />
          <p className="font-semibold text-lg">Dream Interpretor</p>
        </div>
        <button
          type="button"
          onClick={() =>
            window.open(
              "https://github.com/amos-machora/dream-interpretor",
              "_blank"
            )
          }
          className="black_btn"
        >
          Code
          <FontAwesomeIcon icon={faGithub} className="ml-3" />
        </button>
      </nav>

      <h1 className="head_text">
        Interpret your dreams with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        So you just had a really weird dream? Leverage AI to get an
        understanding of what it means!. In not less than 200 characters enter a
        description of your dream
      </h2>
    </header>
  );
};
