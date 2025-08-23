export interface Quotation {
  id: number;
  quotation_number: string;
  seq: number;
  requestor: string;
  company: string;
  project_name: string;
  valid_time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total_amount: string;
  pph: string;
  grand_total: string;
  file_url: string | null;
  file_path: string | null;
  status: string;
  revision_count: number;
  created_at: string;
  updated_at: string;
  email_send_at: string;
}
