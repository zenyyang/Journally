import axios from "axios";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Journal } from "@prisma/client";
import { useEffect, useState } from "react";

interface JournalProps {
  id: string | null | undefined;
}

const JournalTable: React.FC<JournalProps> = ({ id }) => {
  const [journalList, setJournalList] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      const response = await axios.get(`/api/${id}/journals`);
      setJournalList(response.data);
    };

    fetchJournals();
  }, []);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {journalList.map((journal: Journal) => {
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
                    <CardTitle key={journal.id}>{journal.title}</CardTitle>
                    <CardDescription>
                      Journal entry for {journal.title}
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
  );
};

export default JournalTable;
