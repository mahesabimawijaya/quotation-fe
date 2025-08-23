import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import type { Metadata } from "next";
import { QuotationForm } from "../_components/quotation-form";

export const metadata: Metadata = {
  title: "Form Layout",
};

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="Create Quotation" />

      <div className="mx-auto flex max-w-screen-2xl flex-col gap-9">
        <QuotationForm />
      </div>
    </>
  );
}
