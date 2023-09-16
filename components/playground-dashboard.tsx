"use client";

import { useCompletion } from "ai/react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PlaygroundDashboard = () => {
  const [value, setValue] = React.useState("");
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: `/api/${value}/completion`,
      onResponse: (res) => {
        if (res.status === 404) {
          alert("Please select a personality!");
        }
      },
    });

  const [open, setOpen] = React.useState(false);
  const personalities = [
    {
      value: "creative",
      label: "Creative",
    },
    {
      value: "reflective",
      label: "Reflective",
    },
    {
      value: "humorous",
      label: "Humorous",
    },
    {
      value: "storytelling",
      label: "Storytelling",
    },
  ];

  return (
    <div className="border rounded-lg my-10">
      <div className="flex items-center justify-between">
        <p className="mx-5 py-3 text-xl font-medium">Write your journal</p>
        <Button className="mr-5 h-8">Save</Button>
      </div>
      <Separator />
      <div className="p-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="pt-2">
            <p className="font-medium mb-7">Your input</p>
            <form onSubmit={handleSubmit}>
              <Textarea
                className=" h-[270px] text-base tracking-wide"
                placeholder="Type your activities here..."
                disabled={isLoading}
                value={input}
                onChange={handleInputChange}
              />

              <Button className="mt-3 w-full" disabled={isLoading}>
                {" "}
                Generate{" "}
              </Button>
            </form>
          </div>
          <div className="">
            <div className="flex items-center justify-between">
              <p className=" font-medium mb-3">AI assisted output</p>
              <div className="mb-5">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {value
                        ? personalities.find(
                            (framework) => framework.value === value
                          )?.label
                        : "Select personality..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandEmpty>Personality not found.</CommandEmpty>
                      <CommandGroup>
                        {personalities.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Textarea
              className="h-80 text-base tracking-wide"
              placeholder="Click generate to get AI output"
              readOnly
              value={completion}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundDashboard;
