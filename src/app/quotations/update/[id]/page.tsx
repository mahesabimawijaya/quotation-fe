import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import type { Metadata } from "next";
import EditQuotationForm from "../../_components/quotation-update-form";

export const metadata: Metadata = {
  title: "Form Layout",
};

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="Update Quotation" />

      <div className="mx-auto flex max-w-screen-2xl flex-col gap-9">
        <EditQuotationForm />
      </div>
    </>
  );
}
