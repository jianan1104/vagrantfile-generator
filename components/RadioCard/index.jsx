import React from "react";
const RadioCard = ({ item, value, handleInputChange, formData }) => {
  return (
    <>
      <li key={item.id}>
        <input
          type="radio"
          id={item.id}
          name={value}
          value={item.value}
          className=" hidden"
          onChange={handleInputChange}
          checked={formData === item.value}
        />
        <label
          htmlFor={item.id}
          // className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          className={`inline-flex w-full cursor-pointer items-center justify-between rounded-lg border  bg-white p-5  hover:bg-gray-100 hover:text-gray-600 ${formData === item.value ? "border-blue-600 text-blue-600" : "border-gray-200 text-gray-500"} dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500`}
        >
          <div className="flex-col items-center justify-center w-full">
            <div className="text-center text-lg font-semibold">{item.name}</div>
            {item.src ? (
              <div className="flex justify-center items-center">
                <img src={item.src} className="h-20" />
              </div>
            ) : null}
          </div>
        </label>
      </li>
    </>
  );
};

export default RadioCard;
