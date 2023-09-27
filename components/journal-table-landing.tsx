import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlignJustify,
  ArrowLeftIcon,
  ArrowRightIcon,
  GanttChartSquare,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const JournalTableLanding = () => {
  const [listView, setListView] = useState(false);

  const onViewChange = () => {
    setListView(!listView);
  };

  const data = [
    {
      _id: { $oid: "650bd4ecac19191e78769ab3" },
      title: "Friday the 13th",
      content:
        "Today was a rather strange day. It all started when I was walking outside when I noticed a strange pattern in the clouds. Right there and then it hit me that there was a message in the sky that only I could decode. After a few minutes, I realized that it was a code for \"djksad ad sad a w a.\" Whoever sent this message must be quite the character!\n\nBeing the imaginative guy that I am, I couldn't help but come up with a story that might explain the weird code and why it showed up. Maybe it's an invitation to some sort of secret club with exclusive members? Or maybe it's a code for some hidden treasure in a nearby town? Whatever it is, I'm sure it's going to be an adventure.\n\nThe possibilities are endless and I'm sure I'm going to have a lot of fun trying to figure out what this message is all about. Who knows, maybe I'll end up with a fortune by the end of it! Now if you'll excuse me, I'm off to crack this strange code and see what I can uncover!",
      createdAt: "Fri Sep 13 2023",
      userId: "user_2VR3yRDyusz49VxDzT3Ci2GPxEE",
    },
    {
      _id: { $oid: "650bdb4ab1cd473281450346" },
      title: "Just another day",
      content:
        "It's another one of those days, you know, the ones where you just feel a little off. I can't put my finger on it. It's almost as if my brain's been served up with a side of dksdjlw and ads and ada and wd and sad. You'd think I was ordering off a Chinese takeout menu with all this nonsense, but nope, I'm just talking about my state of mind. \n\nI tried to take myself out for a walk to clear my head, but it only made me think of more things like why am I the only one in the park and why does my reflection in the store window just keep laughing at me! I mean I know I'm known for being a bit of a jokester but this is next level nonsense!\n\nI think I need some rest now. Hopefully I'll feel better in the morning, until then I'm just going to laugh this weird state of mind away!",
      createdAt: "Wed Sep 12 2023",
      userId: "user_2VR3yRDyusz49VxDzT3Ci2GPxEE",
    },
    {
      _id: { $oid: "650bdb4ab1cd473281450346" },
      title: "Cafe Coffee",
      content:
        "It's another one of those days, you know, the ones where you just feel a little off. I can't put my finger on it. It's almost as if my brain's been served up with a side of dksdjlw and ads and ada and wd and sad. You'd think I was ordering off a Chinese takeout menu with all this nonsense, but nope, I'm just talking about my state of mind. \n\nI tried to take myself out for a walk to clear my head, but it only made me think of more things like why am I the only one in the park and why does my reflection in the store window just keep laughing at me! I mean I know I'm known for being a bit of a jokester but this is next level nonsense!\n\nI think I need some rest now. Hopefully I'll feel better in the morning, until then I'm just going to laugh this weird state of mind away!",
      createdAt: "Wed Sep 12 2023",
      userId: "user_2VR3yRDyusz49VxDzT3Ci2GPxEE",
    },
  ];

  return (
    <div className="border rounded-lg mb-10">
      <div className="flex items-center justify-between">
        <p className="mx-6 py-3 text-2xl font-medium">Journal Table</p>
        <Button
          onClick={onViewChange}
          className="h-8 ml-auto mr-5 bg-white border hover:bg-slate-100"
        >
          {listView ? (
            <GanttChartSquare size={16} className="text-black" />
          ) : (
            <AlignJustify size={16} className="text-black" />
          )}
        </Button>
      </div>
      <Separator />
      <div>
        {listView ? (
          <div className=" grid-flow-row lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {data.map((journal) => {
              const words = journal.content.split(" ");
              const displayContent =
                words.length > 100
                  ? `${words.slice(0, 50).join(" ")}...`
                  : journal.content;
              return (
                <div className="px-5 py-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Card>
                        <CardHeader>
                          <CardTitle key={journal._id.$oid}>
                            {journal.title}
                          </CardTitle>
                          <CardDescription>
                            Journal entry for{" "}
                            {new Date(journal.createdAt).toDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="w-200">
                            <p>{displayContent}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </PopoverTrigger>
                    <PopoverContent className="p-7 lg:w-[700px] md:w-[500px] w-[300px] ">
                      <div>
                        <h1 className="text-2xl font-bold">{journal.title}</h1>
                      </div>
                      {journal.content}
                    </PopoverContent>
                  </Popover>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {data.map((journal) => {
              const words = journal.content.split(" ");
              const displayContent =
                words.length > 100
                  ? `${words.slice(0, 50).join(" ")}...`
                  : journal.content;
              return (
                <div className="p-5">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Card>
                        <CardHeader>
                          <CardTitle key={journal._id.$oid}>
                            {journal.title}
                          </CardTitle>
                          <CardDescription>
                            Journal entry for {journal.createdAt}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="w-200">
                            <p>{displayContent}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </PopoverTrigger>
                    <PopoverContent className="p-7 lg:w-[700px] md:w-[500px] w-[300px] ">
                      <div>
                        <h1 className="text-2xl font-bold">{journal.title}</h1>
                      </div>
                      {journal.content}
                    </PopoverContent>
                  </Popover>
                </div>
              );
            })}
          </div>
        )}
        <div className="px-5 pb-3 flex items-center justify-end gap-5">
          <Button disabled={true} className="h-6">
            <ArrowLeftIcon size={12} className=" scale-x-150 scale-y-125" />
          </Button>
          <span>1</span>
          <Button disabled={true} className="h-6">
            <ArrowRightIcon size={12} className=" scale-x-150 scale-y-125" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JournalTableLanding;
