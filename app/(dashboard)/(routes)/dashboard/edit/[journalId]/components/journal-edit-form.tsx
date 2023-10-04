"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

interface JournalFormProps {
  title: string;
  content: string;
  date: string;
}

const JournalEditForm: React.FC<JournalFormProps> = ({ title, content }) => {
  const { userId } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await axios.patch(`/api/${userId}/journals/${params.journalId}`, {
        title,
        content,
      });
      toast.success("Journal edited successfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error) {
      if (!title) toast.error("Title is required");
      else if (!content) toast.error("Content is required");
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mr-5">
      <form onSubmit={onSubmit}>
        <Button type="submit" className="h-8" disabled={loading}>
          Edit
        </Button>
      </form>
    </div>
  );
};

export default JournalEditForm;
