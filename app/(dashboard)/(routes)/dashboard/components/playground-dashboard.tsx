"use client";

import { useCompletion } from "ai/react";
import toast from "react-hot-toast";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";

import JournalForm from "./journal-form";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import JournalTable from "./journal-table";

const PlaygroundDashboard = () => {
  const { userId } = useAuth();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const buttonText = date ? date.toDateString() : "Pick a date";

  if (!userId) {
    router.push("/sign-in");
  }

  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: `/api/${userId}/${value}/completion`,
      onResponse: (res) => {
        if (res.status === 404) {
          toast.error("Please select a personality!");
        }
      },
    });
  const [open, setOpen] = useState(false);
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
    <div>
      <div className="border rounded-lg my-10">
        <div className="flex items-center justify-between">
          <p className="mx-5 py-3 text-xl font-medium">Write your journal</p>
          <JournalForm content={input} title={buttonText} />
        </div>
        <Separator />
        <div className="p-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="pt-2">
              <div className="flex items-center mb-3">
                <p className="font-medium ">Your input</p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-[240px] pl-3 text-left font-normal ml-auto"
                      placeholder="Pick a date"
                    >
                      <span>{buttonText}</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[240px] p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <form onSubmit={handleSubmit}>
                <Textarea
                  className=" h-[270px] text-base tracking-wide"
                  placeholder="Type your activities here..."
                  disabled={isLoading}
                  value={input}
                  onChange={handleInputChange}
                />
                {input ? (
                  <Button className="mt-3 w-full" disabled={isLoading}>
                    {" "}
                    Generate{" "}
                  </Button>
                ) : (
                  <Button className="mt-3 w-full" disabled={true}>
                    {" "}
                    Generate{" "}
                  </Button>
                )}
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
      <div className="border rounded-lg my-10">
        <div className=" items-center justify-between">
          <p className="mx-5 py-3 text-xl font-medium">Journal Table</p>
        </div>
        <Separator />
        <JournalTable id={userId} />
      </div>
    </div>
  );
};

export default PlaygroundDashboard;
