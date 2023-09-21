"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface JournalFormProps {
  title: string | undefined;
  content: string;
}

const JournalForm: React.FC<JournalFormProps> = ({ title, content }) => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await axios.post(`/api/${userId}/journals`, {
        title,
        content,
        userId,
      });
      toast.success("Journal saved successfully");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mr-5">
      <form onSubmit={onSubmit}>
        <Button type="submit" disabled={loading}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default JournalForm;
