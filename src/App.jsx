import React from "react";
import { Navbar, Footer, TextInput, RadioCard, ProviderSelect } from "../components";
import { boxes, cpuOptions, memoryOptions } from "../components/constants";
import { useVagrantConfig } from "./hooks/useVagrantConfig";

import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card";
import { Label } from "./components/ui/label";
import { Checkbox } from "./components/ui/checkbox";
import { Separator } from "./components/ui/separator";
import { Download, Play, ExternalLink } from "lucide-react";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/theme-one_dark";

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
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Configure Your Vagrantfile
          </h1>
          <p className="text-muted-foreground">
            Select your options below and generate a ready-to-use Vagrant configuration.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,1fr] xl:grid-cols-[3fr,2fr]">
          {/* Configuration Form */}
          <div className="space-y-6">
            <form onSubmit={handleFinish} className="space-y-6">
              {/* Box Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Operating System</CardTitle>
                  <CardDescription>
                    Choose a base box or{" "}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://app.vagrantup.com/boxes/search"
                      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      search for more
                      <ExternalLink className="ml-1 inline h-3 w-3" />
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TextInput
                    handleInputChange={handleInputChange}
                    formData={formData.box}
                    name="Box Image"
                    value="box"
                    holder="ubuntu/jammy64"
                  />
                  <ul className="grid w-full gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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

              {/* Provider Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Provider</CardTitle>
                  <CardDescription>
                    Select a virtualization provider for your VM.
                  </CardDescription>
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

              {/* Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resources</CardTitle>
                  <CardDescription>
                    Configure CPU, memory, and disk allocation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>CPUs</Label>
                    <ul className="grid w-full gap-3 grid-cols-4 md:grid-cols-8">
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

                  <Separator />

                  <div className="space-y-3">
                    <Label>Memory</Label>
                    <ul className="grid w-full gap-3 grid-cols-2 md:grid-cols-4">
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

                  <Separator />

                  <TextInput
                    handleInputChange={handleInputChange}
                    formData={formData.disk_size}
                    name="Disk Size"
                    value="disk_size"
                    holder="20GB"
                  />
                </CardContent>
              </Card>

              {/* Network & Identity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Network & Identity</CardTitle>
                  <CardDescription>
                    Set machine name, hostname, IP, and instance count.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
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
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
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
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="iterationStartFrom0"
                      name="iterationStartFrom0"
                      checked={formData.iterationStartFrom0}
                      onChange={handleInputChange}
                    />
                    <Label htmlFor="iterationStartFrom0" className="cursor-pointer">
                      Start iteration from 0
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Generate Button */}
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                <Play className="mr-2 h-4 w-4" />
                Generate Vagrantfile
              </Button>
            </form>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
            {generated ? (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Preview</CardTitle>
                    <a href={downloadLink} download="Vagrantfile">
                      <Button variant="outline" size="sm" type="button">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </a>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-md border">
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
                      height="500px"
                      setOptions={{
                        showLineNumbers: true,
                        tabSize: 2,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <Play className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">No preview yet</h3>
                  <p className="text-sm text-muted-foreground max-w-[250px]">
                    Configure your VM settings and click "Generate Vagrantfile" to see a preview.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default VagrantConfigGenerator;
