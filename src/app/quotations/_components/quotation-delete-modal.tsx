import { Button } from "@/components/ui-elements/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Quotation } from "@/interfaces/Quotation";
import { api } from "@/lib/axios";
import { Loader, Mail, Trash } from "lucide-react";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface DeleteQuotationModalProps {
  open: boolean;
  onClose: () => void;
  fetchQuotations: () => void;
  quotation: Quotation | null;
}

const DeleteQuotationModal: FC<DeleteQuotationModalProps> = ({
  open,
  onClose,
  fetchQuotations,
  quotation,
}) => {
  const [loading, setLoading] = useState(false);
  const sendQuotation = async () => {
    setLoading(true);
    try {
      const res = await api.delete(`/quotations/${quotation?.id}`);
      if (res.status === 200) {
        toast.success("Quotation Deleted");
        fetchQuotations();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete quotation");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader className="flex-row items-center justify-between py-0">
          <DialogTitle>Delete Quotation</DialogTitle>
        </DialogHeader>
        <div className="my-2 flex flex-col items-center justify-center">
          <p className="text-center font-medium">
            Delete quotation {quotation?.quotation_number} -{" "}
            {quotation?.customer_name}?
          </p>
        </div>
        <div className="flex w-full items-center gap-3">
          <Button
            onClick={onClose}
            shape={"rounded"}
            size={"small"}
            className="w-1/2 bg-red-600"
          >
            No
          </Button>
          <Button
            onClick={sendQuotation}
            disabled={loading}
            shape={"rounded"}
            size={"small"}
            className="w-1/2"
          >
            {loading ? (
              <span>
                <Loader className="animate-spin" />
              </span>
            ) : (
              "Yes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteQuotationModal;
