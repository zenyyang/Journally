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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Journal } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlignJustify,
  ArrowLeftIcon,
  ArrowRightIcon,
  GanttChartSquare,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { CellAction } from "./cell-action";

interface JournalProps {
  id: string;
}

const JournalTable: React.FC<JournalProps> = ({ id }) => {
  const [journalList, setJournalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listView, setListView] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      const response = await axios.get(`/api/${id}/journals`);
      setJournalList(response.data);
      setLoading(false);
    };

    fetchJournals();
  }, []);

  const onViewChange = () => {
    setListView(!listView);
  };

  const paginatedJournals = journalList.slice((page - 1) * 6, page * 6);
  const totalPages = Math.ceil(journalList.length / 6);

  return (
    <div className="border rounded-lg my-10">
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
        {loading ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            <Skeleton className="m-5 w-200 h-[200px] rounded-md" />
            <Skeleton className="m-5 w-200 h-[200px] rounded-md" />
            <Skeleton className="m-5 w-200 h-[200px] rounded-md" />
          </div>
        ) : listView ? (
          <div className=" grid-flow-row lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {paginatedJournals.map((journal: Journal) => {
              const words = journal.content.split(" ");
              const displayContent =
                words.length > 100
                  ? `${words.slice(0, 50).join(" ")}...`
                  : journal.content;
              return (
                <div className="px-5 py-3" key={journal.id}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Card>
                        <CardHeader>
                          <CardTitle key={journal.id}>
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
            {paginatedJournals.map((journal: Journal) => {
              const words = journal.content.split(" ");
              const displayContent =
                words.length > 100
                  ? `${words.slice(0, 50).join(" ")}...`
                  : journal.content;
              return (
                <div className="p-5" key={journal.id}>
                  <Popover>
                    <Card>
                      <CardHeader>
                        <CardTitle
                          key={journal.id}
                          className="flex items-center justify-between"
                        >
                          {journal.title}
                          <div>
                            <CellAction userId={id} journalId={journal.id} />
                          </div>
                        </CardTitle>
                        <CardDescription>
                          Journal entry for{" "}
                          {new Date(journal.createdAt).toDateString()}
                        </CardDescription>
                      </CardHeader>
                      <PopoverTrigger asChild>
                        <CardContent>
                          <div className="w-200">
                            <p>{displayContent}</p>
                          </div>
                        </CardContent>
                      </PopoverTrigger>
                    </Card>
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
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="h-6"
          >
            <ArrowLeftIcon size={12} className=" scale-x-150 scale-y-125" />
          </Button>
          <span>{page.toString()}</span>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="h-6"
          >
            <ArrowRightIcon size={12} className=" scale-x-150 scale-y-125" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JournalTable;
