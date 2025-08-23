import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import Card from "@/components/Card";
import DOTable from "./_components/do-table";

export const metadata: Metadata = {
  title: "Delivery Orders",
};

const DeliveryOrdersPage = () => {
  return (
    <>
      <Breadcrumb pageName="Delivery Orders" />
      <Card>
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-slate-800">
            Delivery Order List
          </h2>
          <Link href={"/delivery-orders/create"}>
            <Button variant="green" shape="rounded" size={"small"}>
              Create
            </Button>
          </Link>
        </div>
        <DOTable />
      </Card>
    </>
  );
};

export default DeliveryOrdersPage;
