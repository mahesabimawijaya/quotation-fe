import { Button } from "@/components/ui-elements/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Quotation } from "@/interfaces/Quotation";
import { api } from "@/lib/axios";
import { Loader, Mail } from "lucide-react";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface SendMailModalProps {
  open: boolean;
  onClose: () => void;
  fetchQuotations: () => void;
  quotation: Quotation | null;
}

const SendMailModal: FC<SendMailModalProps> = ({
  open,
  onClose,
  fetchQuotations,
  quotation,
}) => {
  const [loading, setLoading] = useState(false);
  const sendQuotation = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/quotations-email/${quotation?.id}`);
      if (res.status === 200) {
        toast.success("Email sent");
        fetchQuotations();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader className="flex-row items-center justify-between py-0">
          <DialogTitle>Send Email</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <Mail size={120} color="#5750F1" />
          <p className="text-center font-medium">
            Send quotation {quotation?.quotation_number} to{" "}
            {quotation?.customer_email}?
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

export default SendMailModal;
