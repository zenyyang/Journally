import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Playground = () => {
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
            <Textarea
              className="h-64 text-base tracking-wide"
              placeholder="Type your activities here..."
              value={
                "- wake up at 7 \n - shower and bf at 8 \n - arrive at school at 9 \n - end of first sess at 11 \n - had lunch with my friends \n - we talked about k-dramas \n - went home at 4 \n - had dinner with my family \n - went to sleep at 10"
              }
              readOnly
            />
          </div>
          <div className="relative">
            <p className=" font-medium mb-3">AI assisted output</p>
            <Textarea
              className="h-52 text-base tracking-wide"
              readOnly
              value={
                "Today, I woke up at 7 AM, feeling refreshed. After a quick shower and breakfast at 8, I headed to school, arriving at 9 AM. The first session ended at 11 AM, and I met up with my friend for lunch. We had a great time chatting about our favorite K-dramas, sharing recommendations, and planning our next binge-watching session. It was a delightful break from the usual routine. The day may have been short on details, but it was rich in connection and shared interests."
              }
            />
            <div className="relative justify-end">
              <Button className="mt-3 w-full"> Generate </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
