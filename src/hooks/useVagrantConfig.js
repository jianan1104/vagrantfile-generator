import { useState, useEffect, useCallback } from "react";
import Handlebars from "handlebars";
import template from "../template";
import { virtualizationGroups } from "../../components/constants";

const compiledTemplate = Handlebars.compile(template);

export const useVagrantConfig = () => {
  const [selectedGroup, setSelectedGroup] = useState(virtualizationGroups[0]);
  const [downloadLink, setDownloadLink] = useState("");
  const [generated, setGenerated] = useState(false);
  const [config, setConfig] = useState("");
  const [formData, setFormData] = useState({
    box: "ubuntu/jammy64",
    name: "webserver_nginx",
    hostname: "webserver",
    provider: "virtualbox",
    ip: "",
    memory: "512",
    cpus: "1",
    disk_size: "",
    count: 1,
    iterationStartFrom0: false,
  });

  const generateDownloadLink = (value) => {
    // Revoke old URL to avoid memory leaks
    if (downloadLink) {
      URL.revokeObjectURL(downloadLink);
    }
    const blob = new Blob([value], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    setDownloadLink(url);
  };

  const generateConfig = useCallback((data = formData) => {
    const start = data.iterationStartFrom0 ? 0 : 1;
    const end = data.iterationStartFrom0 ? Number(data.count) - 1 : Number(data.count);
    const templateData = {
      ...data,
      iterationStart: start,
      iterationEnd: end,
    };
    const generatedConfig = compiledTemplate(templateData);
    return generatedConfig;
  }, [formData]);

  // Effect to handle real-time updates if already generated
  useEffect(() => {
    if (generated) {
      const newConfig = generateConfig(formData);
      setConfig(newConfig);
      generateDownloadLink(newConfig);
    }
  }, [formData, generated, generateConfig]); // Removed generateConfig from dependency to avoid loop if it wasn't wrapped, but it is. 
                             // safer to just depend on formData and generated.

  const handleInputChange = (event) => {
    const { name, value, tagName, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value.trim();

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "provider" && tagName === "INPUT") {
      switch (newValue) {
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
        case "yandex":
          setSelectedGroup(virtualizationGroups[2]);
          break;
        case "vmware_desktop":
          setSelectedGroup(virtualizationGroups[3]);
          break;
        case "libvirt":
          setSelectedGroup(virtualizationGroups[4]);
          break;
        default:
          break;
      }
    }
  };

  const handleGroupChange = (event) => {
    const selected = virtualizationGroups.find(
      (c) => c.name === event.target.value
    );
    setSelectedGroup(selected);
  };

  const handleFinish = (event) => {
    event.preventDefault();
    setGenerated(true);
    // The useEffect will pick this up and generate the config
  };

  const onEditorChange = (value) => {
    setConfig(value);
    generateDownloadLink(value);
  };

  return {
    formData,
    config,
    generated,
    downloadLink,
    selectedGroup,
    handleInputChange,
    handleGroupChange,
    handleFinish,
    onEditorChange,
  };
};
