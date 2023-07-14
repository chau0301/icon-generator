import React, { useState } from "react";
import colors from "../ultil/colors";
import styles from "../ultil/styles";
import shapes from "../ultil/shapes";
import LoginWithGoogleButton from "./LoginWithGoogle";
import {  useSession } from "next-auth/react";
import Router from "next/router";

const Generate = () => {
  const { data: session } = useSession();

  const [logoDescription, setLogoDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [logoStyle, setLogoStyle] = useState("");
  const [logoShape, setLogoShape] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [waitingGenerate, setWaitingGenerate] = useState(false);

  const handleLogoDescriptionChange = (e) => {
    setLogoDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      selectedColor,
      logoStyle,
      logoShape,
      logoDescription,
    };
    if (!selectedColor || !logoStyle || !logoShape || !logoDescription) {
      alert(`Missing`);
      return true;
    }
    try {
      setWaitingGenerate(true);
      const body = { ...formData };
      const response = await fetch(`/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      let data = await response.json();
      data = data.url;
      if (Array.isArray(data) && data.length > 0) {
        // Assuming the response contains an array of image objects with 'url' property
        setGeneratedImages(data);
      }
    } catch (error) {
      console.error(error);
    }
    setWaitingGenerate(false);
  };

  return (
    <main className="container mx-4 py-4">
      <h1 className="text-2xl font-bold mb-4">Logo Generator</h1>
      <div className="mb-4">
        <label htmlFor="logoDescription" className="block mb-2 font-medium">
          1. Description
        </label>
        <input
          type="text"
          id="logoDescription"
          placeholder="a happy duck"
          className="w-full border border-gray-300 px-3 py-2 rounded max-w-sm text-black"
          onChange={handleLogoDescriptionChange}
        />
      </div>

      <div className="mb-4 flex flex-wrap max-w-md">
        <label className="block mb-2 font-medium">2. Primary Color</label>
        <div className="flex flex-wrap">
          {colors.map((color) => (
            <label key={color.name}>
              <input
                className="square"
                type="radio"
                value={color.value}
                checked={selectedColor === color.value}
                onChange={() => setSelectedColor(color.value)}
              />
              <span
                className={`colorIndicator ${
                  selectedColor === color.value ? "selectedColor" : ""
                }`}
                style={{ backgroundColor: color.value }}
              ></span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="style" className="block mb-2 font-medium">
          3. Style
        </label>
        <div className="flex text-center flex-wrap max-w-md">
          {styles.map((style) => (
            <div
              className={`m-2 ${
                logoStyle === style.value
                  ? "opacity-100 transform scale-125"
                  : "opacity-50"
              }`}
            >
              <input
                className="hidden"
                type="radio"
                value={style.value}
                checked={logoShape === style.value}
                onChange={() => setLogoStyle(style.value)}
              />
              <img
                className={`rounded-2xl max-w-xl `}
                src={style.image}
                alt={style.name}
                width={60}
                onClick={() => setLogoStyle(style.value)}
              />
              <span className="text-xs">{style.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="shape" className="block mb-2 font-medium">
          4. Shape
        </label>
        <div className="flex flex-row text-center space-x-8">
          {shapes.map((shape) => (
            <div
              className={
                logoShape === shape.value
                  ? "opacity-100 transform scale-125"
                  : "opacity-50"
              }
            >
              <input
                className="hidden"
                type="radio"
                value={shape.value}
                checked={logoShape === shape.value}
                onChange={() => setLogoShape(shape.value)}
              />
              <img
                className={`rounded-2xl max-w-xl`}
                src={shape.image}
                alt={shape.name}
                width={60}
                onClick={() => setLogoShape(shape.value)}
              />
              {shape.name}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-sm my-8">
        {session ? (
          <button
            type="submit"
            className="border-white border-2 hover:bg-white hover:text-black w-full p-2 hover:cursor-pointer"
            onClick={handleSubmit}
            disabled={waitingGenerate}
          >
            {waitingGenerate ? (
              <svg
                aria-hidden="true"
                className="inline w-8 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              "Generate logo"
            )}
          </button>
        ) : (
          // ! <LoginWithGoogleButton />
          <button
          type="submit"
          className="border-white border-2 hover:bg-white hover:text-black w-full p-2 hover:cursor-pointer"
          onClick={handleSubmit}
          disabled={waitingGenerate}
        >
          {waitingGenerate ? (
            <svg
              aria-hidden="true"
              className="inline w-8 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          ) : (
            "Generate logo"
          )}
        </button>
        )}
      </div>

      {generatedImages.length > 0 && (
        <div className="max-w-sm flex flex-wrap">
          {generatedImages.map((image, index) => (
            <img
              className={`rounded-2xl max-w-xl m-auto`}
              key={index}
              src={image}
              width={120}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Generate;
