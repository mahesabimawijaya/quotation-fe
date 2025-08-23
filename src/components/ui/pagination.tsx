import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  totalData: number;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  rowsPerPage,
  onPageChange,
  totalData,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalData / rowsPerPage);
  const startData = (currentPage - 1) * rowsPerPage + 1;
  const endData = Math.min(currentPage * rowsPerPage, totalData);

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <p>Rows per page: </p>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="mx-2 rounded border border-gray-300 p-1"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="flex items-center rounded bg-gray-200 px-2 py-1 hover:opacity-75 disabled:opacity-50"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center rounded bg-gray-200 px-2 py-1 hover:opacity-75 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span>
          {startData.toLocaleString()} - {endData.toLocaleString()} of{" "}
          {totalData.toLocaleString()}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center rounded bg-gray-200 px-2 py-1 hover:opacity-75 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="flex items-center rounded bg-gray-200 px-2 py-1 hover:opacity-75 disabled:opacity-50"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
