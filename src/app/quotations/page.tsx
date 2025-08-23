import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { Button } from "@/components/ui-elements/button";
import Link from "next/link";
import Card from "@/components/Card";
import QuotationTable from "./_components/quotation-table";

export const metadata: Metadata = {
  title: "Tables",
};

const QuotationsPage = () => {
  return (
    <>
      <Breadcrumb pageName="Quotations" />
      <Card>
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-slate-800">
            Quotation List
          </h2>
          <Link href={"/quotations/create"}>
            <Button variant="green" shape="rounded" size={"small"}>
              Create
            </Button>
          </Link>
        </div>
        <QuotationTable />
      </Card>
    </>
  );
};

export default QuotationsPage;
