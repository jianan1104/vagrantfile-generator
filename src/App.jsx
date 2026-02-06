import React from "react";
import { Navbar, Footer, TextInput, RadioCard, ProviderSelect } from "../components";
import { boxes, cpuOptions, memoryOptions } from "../components/constants";
import { useVagrantConfig } from "./hooks/useVagrantConfig";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-monokai";

const VagrantConfigGenerator = () => {
  const {
    formData,
    config,
    generated,
    downloadLink,
    selectedGroup,
    handleInputChange,
    handleGroupChange,
    handleFinish,
    onEditorChange,
  } = useVagrantConfig();

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-4 p-4 transition-colors duration-200">
        <form onSubmit={handleFinish}>
          <TextInput
            handleInputChange={handleInputChange}
            formData={formData.box}
            name="Box"
            value="box"
          >
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400 mb-2"
            >
              Want to search a box? Find{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://app.vagrantup.com/boxes/search"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                boxes
              </a>
              .
            </p>
            <ul className="grid w-full gap-6 md:grid-cols-4 grid-cols-2">
              {boxes.map((box) => (
                <RadioCard
                  key={box.id}
                  item={box}
                  value="box"
                  handleInputChange={handleInputChange}
                  formData={formData.box}
                />
              ))}
            </ul>
          </TextInput>
          
          <ProviderSelect 
            formData={formData}
            handleInputChange={handleInputChange}
            handleGroupChange={handleGroupChange}
            selectedGroup={selectedGroup}
          />

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
              htmlFor="cpus"
            >
              CPUs
            </label>
            <ul className="grid w-full gap-6 md:grid-cols-4 grid-cols-2">
              {cpuOptions.map((cpuOption) => (
                <RadioCard
                  key={cpuOption.id}
                  item={cpuOption}
                  value="cpus"
                  handleInputChange={handleInputChange}
                  formData={formData.cpus}
                />
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 font-bold mb-2"
              htmlFor="memory"
            >
              Memory
            </label>
            <ul className="grid w-full gap-6 md:grid-cols-4 grid-cols-2">
              {memoryOptions.map((memoryOption) => (
                <RadioCard
                  key={memoryOption.id}
                  item={memoryOption}
                  value="memory"
                  handleInputChange={handleInputChange}
                  formData={formData.memory}
                />
              ))}
            </ul>
          </div>
          <TextInput
            handleInputChange={handleInputChange}
            formData={formData.disk_size}
            name="Disk Size"
            value="disk_size"
            holder="20GB"
          />
          <TextInput
            handleInputChange={handleInputChange}
            formData={formData.name}
            name="Machine Name"
            value="name"
            holder="VM Name"
          />
          <TextInput
            handleInputChange={handleInputChange}
            formData={formData.hostname}
            name="Host Name"
            value="hostname"
            holder="webserver"
          />
          <TextInput
            handleInputChange={handleInputChange}
            formData={formData.ip}
            name="IP Address"
            value="ip"
            holder="192.168.33.10"
          />
          <TextInput
            handleInputChange={handleInputChange}
            formData={formData.count}
            name="Count"
            value="count"
            holder="1"
            type="number"
          />
          <div className="mb-4 flex items-center">
            <input
              id="iterationStartFrom0"
              type="checkbox"
              name="iterationStartFrom0"
              checked={formData.iterationStartFrom0}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="iterationStartFrom0"
              className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Start iteration from 0
            </label>
          </div>
          <button
            type="submit"
            className="mb-4 bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            Generate Config
          </button>
        </form>
        {generated && (
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Preview 👀
            </h2>
            <AceEditor
              className="mb-4"
              mode="ruby"
              theme="monokai"
              name="editor"
              onChange={onEditorChange}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={config}
              width="100%"
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
            <a
              href={downloadLink}
              download="Vagrantfile"
              className="bg-green-500 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              Download Config
            </a>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default VagrantConfigGenerator;