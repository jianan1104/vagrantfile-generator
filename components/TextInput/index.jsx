const TextInput = ({ name, value, holder, handleInputChange, formData, children}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor={name}
        required
      >
        {name}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        name={value}
        id={value}
        value={formData}
        onChange={handleInputChange}
        placeholder={holder}
      />
      {children}
    </div>
  );
};

export default TextInput;
