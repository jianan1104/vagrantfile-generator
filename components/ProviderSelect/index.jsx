import React from 'react';
import RadioCard from '../RadioCard';
import { providers, virtualizationGroups } from '../constants';

const ProviderSelect = ({ 
  formData, 
  handleInputChange, 
  handleGroupChange, 
  selectedGroup 
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
        htmlFor="provider"
      >
        Provider
      </label>

      <div className="flex mb-2">
        <select
          id="countries"
          onChange={handleGroupChange}
          value={selectedGroup.name}
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
          {virtualizationGroups.map((group) => (
            <option key={group.id} value={group.name}>
              {group.name}
            </option>
          ))}
        </select>
        <label htmlFor="groups" className="sr-only">
          Choose a provider
        </label>
        <select
          id="groups"
          name="provider"
          value={formData.provider}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {selectedGroup.items.map((provider, idx) => (
            <option key={idx} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </div>
      <ul className="grid w-full gap-6 md:grid-cols-4 grid-cols-2">
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
