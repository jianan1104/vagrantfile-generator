const generateCpuOptions = (maxCpuCount) => {
  const options = [];
  for (let i = 1; i <= maxCpuCount; i *= 2) {
    options.push({
      id: `${i}cpu`,
      value: `${i}`,
      name: `${i} CPU`,
    });
  }
  return options;
};

// generate options for up to 32 CPUs
const maxCpuCount = 128;
const cpuOptions = generateCpuOptions(maxCpuCount);

export default cpuOptions;
