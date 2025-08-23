import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import type { Metadata } from "next";
import DeliveryOrderForm from "../../_components/do-form";

export const metadata: Metadata = {
  title: "Create Delivery Order",
};

export default function Page() {
  return (
    <>
      <Breadcrumb pageName="Create Delivery Order" />

      <div className="mx-auto flex max-w-screen-2xl flex-col gap-9">
        <DeliveryOrderForm />
      </div>
    </>
  );
}
