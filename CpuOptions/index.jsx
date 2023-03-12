import { cpuOptions } from "./constants";
import RadioGroup from "../RadioGroup";

const CpuOptions = ({ handleInputChange, formData }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="cpus">
          CPUs
        </label>
        <RadioGroup
          items={cpuOptions}
          value="cpus"
          handleInputChange={handleInputChange}
          formData={formData}
        />
      </div>
    </>
  );
};

export default CpuOptions;
