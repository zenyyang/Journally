import NavbarDashboard from "@/components/navbar-dashboard";

import PlaygroundDashboard from "./components/playground-dashboard";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";

const DashboardPage = () => {
  return (
    <div>
      <NavbarDashboard />
      <div className="lg:mx-48 mx-10 mb-60">
        <PlaygroundDashboard />
      </div>
      <Separator />
      <div className="lg:mx-48 mx-10">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;
