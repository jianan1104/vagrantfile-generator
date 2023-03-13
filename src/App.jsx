import React, { useState, useCallback } from "react";
import Handlebars from "handlebars";
import template from "./template";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Navbar, Footer, TextInput, RadioCard } from "../components";
import { saveAs } from "file-saver";
import {
  boxes,
  providers,
  cpuOptions,
  memoryOptions,
} from "../components/constants";

const VagrantConfigGenerator = () => {
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
  });

  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormData((formData) => ({
        ...formData,
        [name]: value.trim(),
      }));
    },
    [setFormData]
  );

  const handleFinish = useCallback(
    (event) => {
      event.preventDefault();
      const compiledTemplate = Handlebars.compile(template);
      const generatedConfig = compiledTemplate(formData);
      setConfig(generatedConfig);
      setGenerate(true);
    },
    [formData]
  );

  const downloadConfig = useCallback(() => {
    const blob = new Blob([config], { type: "application/octet-stream" });
    saveAs(blob, "Vagrantfile");
  }, [config]);

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
          <button
            type="submit"
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generate Config
          </button>
        </form>
        {generated && (
          <div className="mb-4">
            <h2 className="text-4xl font-bold dark:text-white mb-4">
              Preview 👀
            </h2>
            <SyntaxHighlighter
              language="ruby"
              style={atomOneDark}
              showLineNumbers
              className="mb-4"
            >
              {config}
            </SyntaxHighlighter>
            <button
              onClick={downloadConfig}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Download Config
            </button>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default VagrantConfigGenerator;
// import Handlebars from "handlebars";
// import template from "./template";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import {
//   BoxesList,
//   Navbar,
//   ProviderList,
//   MemoryOptions,
//   CpuOptions,
//   Footer,
//   TextInput,
// } from "../components";
// import { saveAs } from "file-saver";

// const VagrantConfigGenerator = () => {
//   const [generated, setGenerate] = useState(false);
//   const [config, setConfig] = useState("");
//   const [formData, setFormData] = useState({
//     box: "ubuntu/bionic64",
//     hostname: "webserver",
//     provider: "virtualbox",
//     ip: "",
//     memory: "512",
//     cpus: "1",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value.trim() });
//   };

//   const handleFinish = (event) => {
//     event.preventDefault();
//     const compiledTemplate = Handlebars.compile(template);
//     const generatedConfig = compiledTemplate(formData);
//     setConfig(generatedConfig);
//     setGenerate(true);
//   };

//   const downloadConfig = () => {
//     const blob = new Blob([config], { type: "application/octet-stream" });
//     saveAs(blob, "Vagrantfile");
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto my-4">
//         <form onSubmit={handleFinish}>
//           <TextInput
//             handleInputChange={handleInputChange}
//             formData={formData}
//             name="Box"
//             value="box"
//           >
//             <p
//               id="helper-text-explanation"
//               className="mt-2 text-sm text-gray-500 dark:text-gray-400"
//             >
//               Want to search a box? Find{" "}
//               <a
//                 target="_blank"
//                 href="https://app.vagrantup.com/boxes/search"
//                 className="font-medium text-blue-600 hover:underline dark:text-blue-500"
//               >
//                 box
//               </a>
//               .
//             </p>
//             <BoxesList
//               handleInputChange={handleInputChange}
//               formData={formData}
//             />
//           </TextInput>
//           <ProviderList
//             handleInputChange={handleInputChange}
//             formData={formData}
//           />
//           <CpuOptions
//             handleInputChange={handleInputChange}
//             formData={formData}
//           />
//           <MemoryOptions
//             handleInputChange={handleInputChange}
//             formData={formData}
//           />
//           <TextInput
//             handleInputChange={handleInputChange}
//             formData={formData}
//             name="IP Address"
//             value="ip"
//             holder="192.168.33.10"
//           />
//           <TextInput
//             handleInputChange={handleInputChange}
//             formData={formData}
//             name="Host Name"
//             value="hostname"
//             holder="webserver"
//           />
//           <button
//             type="submit"
//             className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Generate Config
//           </button>
//         </form>
//         {generated ? (
//           <div className="mb-4">
//             <h2 className="text-4xl font-bold dark:text-white mb-4">
//               Preview 👀
//             </h2>
//             <SyntaxHighlighter
//               language="ruby"
//               style={atomOneDark}
//               showLineNumbers
//               className="mb-4"
//             >
//               {config}
//             </SyntaxHighlighter>
//             <button
//               onClick={downloadConfig}
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Download Config
//             </button>
//           </div>
//         ) : null}
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default VagrantConfigGenerator;
