import React, { useState, useCallback } from "react";
import Handlebars from "handlebars";
import template from "./template";
import { Navbar, Footer, TextInput, RadioCard } from "../components";
import {
  boxes,
  providers,
  cpuOptions,
  memoryOptions,
  virtualizationGroups,
} from "../components/constants";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-monokai";

const VagrantConfigGenerator = () => {
  const [selectedGroup, setSelectedGroup] = useState(virtualizationGroups[0]);
  const [downloadLink, setDownloadLink] = useState("");
  const [generated, setGenerate] = useState(false);
  const [config, setConfig] = useState("");
  const [formData, setFormData] = useState({
    box: "ubuntu/focal64",
    name: "webserver_nginx",
    hostname: "webserver",
    provider: "virtualbox",
    ip: "",
    memory: "512",
    cpus: "1",
    count: 1,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value.trim(),
    }));
    if (generated) {
      const generatedConfig = generateConfig();
      setConfig(generatedConfig);
    }
    if (name === "provider" && event.target.tagName === "INPUT") {
      switch (value) {
        case "virtualbox":
        case "hyperv":
          setSelectedGroup(virtualizationGroups[0]);
          break;
        case "docker":
          setSelectedGroup(virtualizationGroups[1]);
          break;
        case "aws":
        case "google":
        case "digitalocean":
          setSelectedGroup(virtualizationGroups[2]);
          break;
        case "vmware_desktop":
          setSelectedGroup(virtualizationGroups[3]);
          break;
        case "libvirt":
          setSelectedGroup(virtualizationGroups[4]);
          break;
      }
    }
  };

  const generateDownloadLink = (value) => {
    const blob = new Blob([value], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    setDownloadLink(url);
  };

  const onEditorChange = useCallback(
    (value) => {
      setConfig(value);
      generateDownloadLink(value);
    },
    [config]
  );

  const generateConfig = useCallback(() => {
    const compiledTemplate = Handlebars.compile(template);
    const generatedConfig = compiledTemplate(formData);
    generateDownloadLink(generatedConfig);
    return generatedConfig;
  }, [formData]);

  const handleFinish = (event) => {
    event.preventDefault();
    const generatedConfig = generateConfig();
    setConfig(generatedConfig);
    setGenerate(true);
  };

  const handleGroupChange = (event) => {
    const selected = virtualizationGroups.find(
      (c) => c.name === event.target.value
    );
    setSelectedGroup(selected);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-4 p-4">
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
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
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
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
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
              className="block text-gray-700 font-bold mb-2"
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
          <button
            type="submit"
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generate Config
          </button>
        </form>
        {generated && (
          <div className="mb-4">
            <h2 className="text-3xl font-bold dark:text-white mb-4">
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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
