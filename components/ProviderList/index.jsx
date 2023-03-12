import { providers } from "./constants";
import RadioGroup from "../RadioGroup";

const ProviderList = ({ handleInputChange, formData }) => {
  return (
    <>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="provider"
        >
          Provider
        </label>
        <RadioGroup
          items={providers}
          value="provider"
          handleInputChange={handleInputChange}
          formData={formData}
        />
      </div>
    </>
  );
};

export default ProviderList;
