import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar, Footer, TextInput, RadioCard, ProviderSelect } from "../components";
import { boxes, cpuOptions, memoryOptions } from "../components/constants";
import { useVagrantConfig } from "./hooks/useVagrantConfig";

import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import { Badge } from "./components/ui/badge";
import {
  Download,
  Play,
  ExternalLink,
  Monitor,
  Server,
  Cpu,
  Network,
  Check,
  Copy,
  ChevronRight,
  Terminal,
  Sparkles,
} from "lucide-react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-one_dark";

const STEPS = [
  { id: "os", label: "Base Image", icon: Monitor, description: "Choose your operating system" },
  { id: "provider", label: "Provider", icon: Server, description: "Select virtualization provider" },
  { id: "resources", label: "Resources", icon: Cpu, description: "Configure CPU, memory & disk" },
  { id: "network", label: "Network", icon: Network, description: "Set identity & networking" },
];

const StepIndicator = ({ steps, activeStep, onStepClick, generated }) => (
  <nav className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
    {steps.map((step, index) => {
      const isActive = activeStep === index;
      const isPast = activeStep > index;
      const Icon = step.icon;

      return (
        <React.Fragment key={step.id}>
          <button
            type="button"
            onClick={() => onStepClick(index)}
            className={`
              flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap
              ${isActive
                ? "bg-primary/10 text-primary"
                : isPast
                  ? "text-foreground hover:bg-accent"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }
            `}
          >
            <div className={`
              flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-200
              ${isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : isPast
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }
            `}>
              {isPast ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
            </div>
            <span className="hidden sm:inline">{step.label}</span>
          </button>
          {index < steps.length - 1 && (
            <ChevronRight className="h-4 w-4 text-border flex-shrink-0" />
          )}
        </React.Fragment>
      );
    })}
  </nav>
);

const TerminalPreview = ({ config, downloadLink, generated, onEditorChange }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(config);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = config;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [config]);

  if (!generated) {
    return (
      <div className="rounded-xl border border-dashed border-border/60 bg-card">
        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
          <div className="rounded-2xl bg-accent/50 p-5 mb-5">
            <Terminal className="h-10 w-10 text-muted-foreground/60" />
          </div>
          <h3 className="text-base font-semibold mb-2">Your Vagrantfile will appear here</h3>
          <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
            Configure your VM settings and hit Generate to see a live, editable preview.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-border overflow-hidden shadow-lg"
    >
      {/* Terminal Title Bar */}
      <div className="terminal-bg flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-white/40 font-mono">Vagrantfile</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2.5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            type="button"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-xs text-emerald-400">Copied</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span className="text-xs">Copy</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
          <a href={downloadLink} download="Vagrantfile">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2.5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              type="button"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">Download</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Editor */}
      <div className="terminal-bg">
        <AceEditor
          mode="ruby"
          theme="one_dark"
          name="editor"
          onChange={onEditorChange}
          fontSize={13}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={config}
          width="100%"
          height="520px"
          style={{ background: "transparent", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          }}
        />
      </div>
    </motion.div>
  );
};

const stepVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
};

const VagrantConfigGenerator = () => {
  const [activeStep, setActiveStep] = useState(0);
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

  const isLastStep = activeStep === STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) return;
    setActiveStep((prev) => prev - 1);
  };

  const handleGenerate = (e) => {
    handleFinish(e);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-8 lg:py-12">
        {/* Hero Header */}
        <div className="mb-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="font-mono text-[10px] px-2 py-0.5">
              Infrastructure as Code
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Build your{" "}
            <span className="gradient-text">Vagrantfile</span>
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Configure your virtual machine step by step and generate a production-ready Vagrant configuration in seconds.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,1fr] xl:grid-cols-[3fr,2fr]">
          {/* Configuration Panel */}
          <div className="space-y-6">
            {/* Step Navigation */}
            <StepIndicator
              steps={STEPS}
              activeStep={activeStep}
              onStepClick={setActiveStep}
              generated={generated}
            />

            <form onSubmit={handleGenerate}>
              <AnimatePresence mode="wait">
                {/* Step 0: OS Selection */}
                {activeStep === 0 && (
                  <motion.div key="step-os" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                            <Monitor className="h-4.5 w-4.5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Operating System</CardTitle>
                            <CardDescription>
                              Choose a base box or{" "}
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://app.vagrantup.com/boxes/search"
                                className="font-medium text-primary hover:text-primary/80 transition-colors"
                              >
                                search Vagrant Cloud
                                <ExternalLink className="ml-1 inline h-3 w-3" />
                              </a>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <TextInput
                          handleInputChange={handleInputChange}
                          formData={formData.box}
                          name="Box Image"
                          value="box"
                          holder="e.g. ubuntu/jammy64"
                        />
                        <ul className="grid w-full gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
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
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 1: Provider */}
                {activeStep === 1 && (
                  <motion.div key="step-provider" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                            <Server className="h-4.5 w-4.5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Virtualization Provider</CardTitle>
                            <CardDescription>
                              Select the backend that powers your virtual machines.
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ProviderSelect
                          formData={formData}
                          handleInputChange={handleInputChange}
                          handleGroupChange={handleGroupChange}
                          selectedGroup={selectedGroup}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 2: Resources */}
                {activeStep === 2 && (
                  <motion.div key="step-resources" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                            <Cpu className="h-4.5 w-4.5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Resources</CardTitle>
                            <CardDescription>
                              Allocate compute, memory, and storage for your VM.
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">CPUs</Label>
                          <ul className="grid w-full gap-2.5 grid-cols-4 md:grid-cols-8">
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

                        <div className="h-px bg-border/50" />

                        <div className="space-y-3">
                          <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Memory</Label>
                          <ul className="grid w-full gap-2.5 grid-cols-2 md:grid-cols-4">
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

                        <div className="h-px bg-border/50" />

                        <TextInput
                          handleInputChange={handleInputChange}
                          formData={formData.disk_size}
                          name="Disk Size"
                          value="disk_size"
                          holder="e.g. 20GB"
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 3: Network & Identity */}
                {activeStep === 3 && (
                  <motion.div key="step-network" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                            <Network className="h-4.5 w-4.5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">Network & Identity</CardTitle>
                            <CardDescription>
                              Configure machine identity, networking, and scaling.
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <TextInput
                            handleInputChange={handleInputChange}
                            formData={formData.name}
                            name="Machine Name"
                            value="name"
                            holder="e.g. webserver"
                          />
                          <TextInput
                            handleInputChange={handleInputChange}
                            formData={formData.hostname}
                            name="Host Name"
                            value="hostname"
                            holder="e.g. webserver.local"
                          />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <TextInput
                            handleInputChange={handleInputChange}
                            formData={formData.ip}
                            name="IP Address"
                            value="ip"
                            holder="e.g. 192.168.33.10"
                          />
                          <TextInput
                            handleInputChange={handleInputChange}
                            formData={formData.count}
                            name="Instance Count"
                            value="count"
                            holder="1"
                            type="number"
                          />
                        </div>
                        <div className="flex items-center space-x-2.5 pt-1">
                          <Checkbox
                            id="iterationStartFrom0"
                            name="iterationStartFrom0"
                            checked={formData.iterationStartFrom0}
                            onChange={handleInputChange}
                          />
                          <Label htmlFor="iterationStartFrom0" className="cursor-pointer text-sm">
                            Start iteration from 0
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  className="text-muted-foreground"
                >
                  Back
                </Button>
                <div className="flex items-center gap-3">
                  {!isLastStep ? (
                    <Button type="button" onClick={handleNext}>
                      Continue
                      <ChevronRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="glow" size="lg">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Vagrantfile
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <TerminalPreview
              config={config}
              downloadLink={downloadLink}
              generated={generated}
              onEditorChange={onEditorChange}
            />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default VagrantConfigGenerator;
