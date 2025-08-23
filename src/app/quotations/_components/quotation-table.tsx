"use client";

import { Badge } from "@/components/ui/badge";
import Pagination from "@/components/ui/pagination";
import { Quotation } from "@/interfaces/Quotation";
import { api } from "@/lib/axios";
import { formatCurrency, formatDate } from "@/utils/helper";
import { Loader2, Pencil, Send, ShoppingCart, Trash } from "lucide-react";
import { FC, useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import SendMailModal from "./quotation-email-modal";
import Link from "next/link";
import DeleteQuotationModal from "./quotation-delete-modal";

const QuotationTable: FC = () => {
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpenMail, setIsOpenMail] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(
    null,
  );

  const fetchQuotations = async () => {
    try {
      const { data } = await api.get(
        `/quotations?page=${currentPage}&limit=${rowsPerPage}`,
      );
      console.log(data);
      setRecords(data.data);
      setTotal(data.pagination.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, [currentPage, rowsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const columns: TableColumn<Quotation>[] = [
    {
      name: <div className="w-full text-center">Action</div>,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Link href={`/delivery-orders/create/${row.id}`}>
            <ShoppingCart size={20} className="cursor-pointer" />
          </Link>
          <Link href={`/quotations/update/${row.id}`}>
            <Pencil size={20} color="blue" className="cursor-pointer" />
          </Link>
          <Send
            onClick={() => {
              setIsOpenMail(true);
              setSelectedQuotation(row);
            }}
            size={20}
            color="green"
            className="cursor-pointer"
          />
          <Trash
            onClick={() => {
              setIsOpenDelete(true);
              setSelectedQuotation(row);
            }}
            size={20}
            color="red"
            className="cursor-pointer"
          />
        </div>
      ),
    },
    {
      name: "Created Date",
      sortable: true,
      selector: (row) => formatDate(row.created_at),
      width: "150px",
    },
    {
      name: "Email Sent Date",
      sortable: true,
      selector: (row) =>
        row.email_send_at ? formatDate(row.email_send_at) : "-",
      width: "150px",
    },
    {
      name: "ID - Client",
      sortable: true,
      selector: (row) => row.requestor,
      width: "250px",
      cell: (row) => (
        <div>
          {row.quotation_number} - {row.customer_name}
        </div>
      ),
    },
    {
      name: "Project Name",
      sortable: true,
      selector: (row) => row.project_name,
      width: "160px",
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => row.status,
      cell: (row) => <Badge>{row.status}</Badge>,
      width: "120px",
    },
    {
      name: "Amount",
      sortable: true,
      selector: (row) => row.grand_total,
      cell: (row) => (
        <div className="font-medium text-green-600">
          {formatCurrency(Number(row.grand_total))}
        </div>
      ),
      width: "160px",
    },
    {
      name: "Valid Time",
      sortable: true,
      selector: (row) => row.valid_time,
    },
  ];

  return (
    <>
      <div className="max-w-[1000px] overflow-x-auto">
        <DataTable
          columns={columns}
          data={records}
          pagination
          paginationServer
          paginationPerPage={rowsPerPage}
          highlightOnHover
          striped
          noDataComponent="No results found"
          progressComponent={
            <div className="bg-background flex w-full items-center justify-center py-4 dark:text-white">
              <Loader2 className="h-4 w-4 animate-spin" /> <span>Loading</span>
            </div>
          }
          progressPending={loading}
          paginationComponent={() => (
            <Pagination
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              totalData={total}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          )}
        />
      </div>
      <SendMailModal
        open={isOpenMail}
        onClose={() => setIsOpenMail(false)}
        fetchQuotations={fetchQuotations}
        quotation={selectedQuotation}
      />
      <DeleteQuotationModal
        open={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        fetchQuotations={fetchQuotations}
        quotation={selectedQuotation}
      />
    </>
  );
};

export default QuotationTable;
