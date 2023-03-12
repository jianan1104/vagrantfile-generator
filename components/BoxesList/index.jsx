import { boxes } from "./constants";
import RadioGroup from "../RadioGroup";

const BoxesList = ({ handleInputChange, formData }) => {
  return (
    <>
      <div className="mb-4">
        <RadioGroup
          items={boxes}
          value="box"
          handleInputChange={handleInputChange}
          formData={formData}
        />
      </div>
    </>
  );
};

export default BoxesList;
