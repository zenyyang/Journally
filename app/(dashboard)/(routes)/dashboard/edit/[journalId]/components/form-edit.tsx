"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useCompletion } from "ai/react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";

import JournalEditForm from "./journal-edit-form";

const FormPost = () => {
  const params = useParams();
  const { userId } = useAuth();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [input1, setInput1] = useState("");
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

  useEffect(() => {
    const fetchJournal = async () => {
      const response = await axios.get(
        `/api/${userId}/journals/${params.journalId}`
      );

      setTitle(response.data.title);
      setDate(new Date(response.data.createdAt));
      setInput1(response.data.content);
    };
    fetchJournal();
  }, []);

  return (
    <div>
      <div>
        <div className="border rounded-lg my-10">
          <div className="flex items-center">
            <p className="mx-5 py-3 text-xl font-medium">Edit your journal</p>
            <div className="flex items-center ml-auto">
              <Button
                onClick={() => {
                  router.push("/dashboard");
                }}
                className="h-8 mr-3 bg-inherit border text-black hover:text-white"
              >
                Back
              </Button>
              <JournalEditForm
                content={input}
                title={title}
                date={buttonText}
              />
            </div>
          </div>
          <Separator />
          <div className="p-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="pt-2">
                <div className="grid md:grid-cols-3 items-center mb-3">
                  <p className="font-medium md:mb-0 mb-3">Your input</p>
                  <div className="flex items-center justify-between gap-2 col-span-2">
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="md:w-40 w-20 h-10 font-medium"
                      placeholder="Title"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="md:w-[240px] pl-3 text-left font-normal ml-auto"
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
                </div>
                <form onSubmit={handleSubmit}>
                  <Textarea
                    className=" h-[270px] text-base tracking-wide"
                    placeholder="Type your activities here..."
                    disabled={isLoading}
                    value={input ? input : input1}
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
              <div>
                <div className="sm:grid md:flex items-center justify-between">
                  <p className=" font-medium mb-3 ">AI assisted output</p>
                  <div className="mb-5 md:ml-auto ">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="md:w-[200px] justify-between"
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
      </div>
    </div>
  );
};

export default FormPost;
