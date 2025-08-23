import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import type { Metadata } from "next";
import EditDOForm from "../../_components/do-update-form";

export const metadata: Metadata = {
  title: "Update Delivery Order",
};

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="Update Delivery Order" />

      <div className="mx-auto flex max-w-screen-2xl flex-col gap-9">
        <EditDOForm />
      </div>
    </>
  );
}
