"use client";

import NavbarDashboard from "@/components/navbar-dashboard";

import PlaygroundDashboard from "./components/playground-dashboard";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";
import JournalTable from "./components/journal-table";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const { userId } = useAuth();
  const router = useRouter();

  const onNewJournal = () => {
    router.push("/dashboard/create");
  };

  return (
    <div>
      <NavbarDashboard />
      <div className="lg:mx-48 mx-10 mb-60">
        <PlaygroundDashboard />
        <JournalTable id={userId} />
      </div>
      <Separator />
      <div className="lg:mx-48 mx-10">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;
