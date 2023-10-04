import FormPost from "@/app/(dashboard)/(routes)/dashboard/edit/[journalId]/components/form-edit";
import Footer from "@/components/footer";
import NavbarDashboard from "@/components/navbar-dashboard";
import { Separator } from "@/components/ui/separator";

const CreatePage = () => {
  return (
    <div>
      <NavbarDashboard />
      <div className="lg:mx-48 mx-10 mb-60">
        <FormPost />
      </div>

      <Separator />

      <div className="lg:mx-48 mx-10">
        <Footer />
      </div>
    </div>
  );
};

export default CreatePage;
