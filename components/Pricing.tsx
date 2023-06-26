import { useSession } from "next-auth/react";
import React, { useState } from "react";

const PricingComponent = () => {
  const price = 0.00069;
  const { data: session, status } = useSession();
  const [value, setValue] = useState(10000);

  const handleChange = (e) => {
    setValue(parseInt(e.target.value));
  };

  const handleSubmit = async () => {
    try {
      const body = {};
      const response = await fetch(`/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4">
      <h1 className="text-4xl">Pricing</h1>
      <p className="py-4">
        <span className="text-7xl text-green-600 font-bold">${price}</span>per
        character
      </p>

      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white py-4">
        Tokens (1 token = 1 character)
      </p>
      <div className="w-80">
        <div className="flex-grow">
          <div className="range-slider flex items-center">
            <span>10,000</span>
            <input
              type="range"
              min="10000"
              max="100000"
              step="10000"
              value={value}
              onChange={handleChange}
              className="slider m-2"
              id="myRange"
            />
            <span>100,000</span>
          </div>
        </div>
        {session ? (
          <button
            className="text-left my-8 border-white border-2 p-2 hover:bg-white hover:text-black"
            onClick={handleSubmit}
          >
            <span>Buy {(value / 1000).toLocaleString()}</span>k Tokens
            <span className="p-1 text-white bg-green-800 rounded-xl mx-2">
              ${(value * price).toFixed(2).toLocaleString()}
            </span>
          </button>
        ) : (
          <div className="text-left my-8">
            <span>Buy {(value / 1000).toLocaleString()}</span>k Tokens
            <span className="p-1 text-white bg-green-800 rounded-xl mx-2">
              ${(value * price).toFixed(2).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingComponent;