"use client";

import { useCompletion } from "ai/react";

import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PlaygroundDashboard = () => {
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion();

  return (
    <div className="border rounded-lg my-5">
      <div className="flex items-center justify-between">
        <p className="mx-5 py-3 text-xl font-medium">Write your journal</p>
        <Button className="mr-5 h-8">Save</Button>
      </div>
      <Separator />
      <div className="p-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <p className="font-medium mb-3">Your input</p>
            <form onSubmit={handleSubmit}>
              <Textarea
                className="h-64 text-base tracking-wide"
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
          <div className="relative">
            <p className=" font-medium mb-3">AI assisted output</p>
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
