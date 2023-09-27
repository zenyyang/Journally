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

const Playground = () => {
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState("");
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
                      <span>Pick a date</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar mode="single" className="rounded-md border" />
                  </PopoverContent>
                </Popover>
              </div>
              <Textarea
                className=" h-[270px] text-base tracking-wide"
                placeholder="Type your activities here..."
                value={`- wake up at 7\n- shower at 7:30 and breakfast after\n- went to school, arrived at 9\n- had math class till 11\n- had lunch with my friends, got chicken breast\n- had ethic and society class after till 3\n- went back home\n- play video games and went to sleep`}
                readOnly={true}
              />

              <Button className="mt-3 w-full"> Generate </Button>
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
                value={`So, the day started with the usual battle between me and my alarm clock at 7 AM. Somehow, the alarm clock always wins, and I reluctantly crawl out of bed. I'm convinced it's plotting against me.\nI decided to give the shower a miss at 7 and declared it a "7:30 AM shower event." Breakfast came next, but don't expect gourmet cooking; it was a competition between me and my toaster. Toaster: 1, Me: 0\nSchool was the next destination, and I arrived fashionably late at 9 AM. They say punctuality is the key to success, but I think my key's been misplaced for a while\nMath class at 9 AM, and I swear time slows down when you're in there. It's like watching paint dry, but with numbers\nLunch was the highlight of the day. Chicken breast – because clearly, I'm on a diet. My friends tried to steal some, but I guarded it like a treasure\nEthics and society class from 1 to 3 PM. The irony? I'm learning about ethics while planning to steal office supplies for my home office\nFinally, back home, where my true talent shines: video games. Hours passed, and then it hit me – I forgot to adult today. So, off to bed I went, hoping I'll remember how to adult tomorrow.`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
