import React from "react";
import RadioCard from "../RadioCard";
import { providers, virtualizationGroups } from "../constants";
import { Label } from "../../src/components/ui/label";
import { Select } from "../../src/components/ui/select";

const ProviderSelect = ({
  formData,
  handleInputChange,
  handleGroupChange,
  selectedGroup,
}) => {
  return (
    <div className="space-y-3 mb-6">
      <Label htmlFor="provider">Provider</Label>

      <div className="flex gap-2">
        <Select
          id="virtualization-group"
          onChange={handleGroupChange}
          value={selectedGroup.name}
          className="w-[200px] shrink-0"
        >
          {virtualizationGroups.map((group) => (
            <option key={group.id} value={group.name}>
              {group.name}
            </option>
          ))}
        </Select>
        <Select
          id="groups"
          name="provider"
          value={formData.provider}
          onChange={handleInputChange}
        >
          {selectedGroup.items.map((provider, idx) => (
            <option key={idx} value={provider}>
              {provider}
            </option>
          ))}
        </Select>
      </div>

      <ul className="grid w-full gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {providers.map((provider) => (
          <RadioCard
            key={provider.id}
            item={provider}
            value="provider"
            handleInputChange={handleInputChange}
            formData={formData.provider}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProviderSelect;
