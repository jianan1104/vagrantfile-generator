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
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="space-y-2 flex-shrink-0">
          <Label htmlFor="virtualization-group" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Category
          </Label>
          <Select
            id="virtualization-group"
            onChange={handleGroupChange}
            value={selectedGroup.name}
            className="w-[180px]"
          >
            {virtualizationGroups.map((group) => (
              <option key={group.id} value={group.name}>
                {group.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2 flex-1">
          <Label htmlFor="groups" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Provider
          </Label>
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
      </div>

      <ul className="grid w-full gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
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
