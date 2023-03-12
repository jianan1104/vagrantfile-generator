import { memoryOptions } from "./constants";
import RadioGroup from "../RadioGroup";

const MemoryOptions = ({ handleInputChange, formData }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="memory">
          Memory
        </label>
        <RadioGroup
          items={memoryOptions}
          value="memory"
          handleInputChange={handleInputChange}
          formData={formData}
        />
      </div>
    </>
  );
};

export default MemoryOptions;
