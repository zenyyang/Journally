import NavbarDashboard from "@/components/navbar-dashboard";
import PlaygroundDashboard from "@/components/playground-dashboard";

const DashboardPage = () => {
  return (
    <div>
      <NavbarDashboard />
      <div className="lg:mx-48 mx-10">
        <PlaygroundDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
