import React, { useState } from "react";
import LoginWithGoogleButton from "./LoginWithGoogle";
import colors from "../ultil/colors";
import styles from "../ultil/styles";
import shapes from "../ultil/shapes";

const Generate = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [iconStyle, setIconStyle] = useState("");
  const [logoShape, setLogoShape] = useState("");
  const handleLogoDescriptionChange = (e) => {
    const logoDescription = e.target.value;
    // Handle the logo description value as needed
  };

  const handlePrimaryColorChange = (color) => {
    setSelectedColor(color);
    // Handle the primary color value as needed
  };

  const handleShapeChange = (e) => {
    const selectedShape = e.target.value;
    // Handle the selected shape value as needed
  };
  return (
    <div className="container mx-4 py-4">
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

      <div className="mb-4 container flex flex-wrap max-w-md">
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

      <div className="mb-4 max-w-lg">
        <label htmlFor="style" className="block mb-2 font-medium">
          3. Style
        </label>
        <div className="flex flex-row text-center space-x-8">
          {styles.map((style) => (
            <div>
              <input
                className="hidden"
                type="radio"
                value={style.value}
                checked={iconStyle === style.value}
                onChange={() => setIconStyle(style.value)}
              />
              <img
                className={`rounded-2xl`}
                src={style.image}
                alt={style.name}
                width={60}
                onClick={() => setIconStyle(style.value)}
              />
              {style.name}
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
                className={`rounded-2xl`}
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

      {/* Add any additional logo generation or preview elements here */}
    </div>
  );
};

export default Generate;
