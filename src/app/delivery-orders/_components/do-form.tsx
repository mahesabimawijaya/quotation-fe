"use client";
import { useForm, useFieldArray } from "react-hook-form";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { api } from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Term = { text: string };

type Item = {
  product_number: string;
  description: string;
  qty: number;
  nett_price: number;
  total_price: number;
};

type FormValues = {
  requestor: string;
  company: string;
  project_name: string;
  valid_time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  quotation_number: string;
  revision_count: number;
  po_file: FileList;
  received_by: string;
  approved_by: string;
  prepared_by: string;
  received_sign: FileList;
  approved_sign: FileList;
  prepared_sign: FileList;
  items: Item[];
  terms_and_conditions: Term[];
};

export default function DeliveryOrderForm() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collapse, setCollapse] = useState(true);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      items: [],
      terms_and_conditions: [{ text: "" }],
    },
  });

  const formValues = watch();

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray<FormValues, "items">({
    control,
    name: "items",
  });

  const { fields: tcFields } = useFieldArray<
    FormValues,
    "terms_and_conditions"
  >({
    control,
    name: "terms_and_conditions",
  });

  // Fetch existing quotation
  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const { data } = await api.get(`/quotations/${params.id}`);
        reset(data); // Fill form with existing data
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch quotation");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchQuotation();
    }
  }, [params.id, reset, router]);

  // Auto calculate total_price
  watch("items").forEach((item, index) => {
    const qty = Number(item.qty) || 0;
    const nett = Number(item.nett_price) || 0;
    const total = qty * nett;
    if (total !== item.total_price) {
      setValue(`items.${index}.total_price`, total, { shouldValidate: false });
    }
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("quotation_id", params.id as string);
    formData.append("received_by", data.received_by);
    formData.append("prepared_by", data.prepared_by);
    formData.append("approved_by", data.approved_by);
    formData.append("items", data.items ? JSON.stringify(data.items) : "[]");
    formData.append("po_file", data.po_file[0]);
    formData.append("received_sign", data.received_sign[0]);
    formData.append("prepared_sign", data.prepared_sign[0]);
    formData.append("approved_sign", data.approved_sign[0]);

    try {
      const res = await api.post("/delivery-orders", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        toast.success("Delivery Order submitted");
        // router.push("/quotations");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit Delivery Order");
    }
  };

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10 text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <ShowcaseSection title="Create Delivery Order" className="!p-6.5">
      <button
        type="button"
        onClick={handleCollapse}
        className="mb-4 flex w-full items-center justify-between rounded-md border p-2"
      >
        <h3 className="font-medium text-dark dark:text-white">
          Chosen Quotation : {formValues.quotation_number}
        </h3>
        {collapse ? <ChevronDown /> : <ChevronUp />}
      </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        {!collapse && (
          <>
            {/* --- Same structure as create form --- */}
            <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
              <div className="w-full gap-4 xl:w-1/2">
                <InputGroup
                  disabled
                  label="Requestor"
                  type="text"
                  placeholder="Enter requestor name"
                  {...register("requestor", {
                    required: "Requestor name is required",
                  })}
                />
                {errors.requestor && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.requestor.message}
                  </p>
                )}
              </div>
              <div className="w-full gap-4 xl:w-1/2">
                <InputGroup
                  disabled
                  label="Company"
                  type="text"
                  placeholder="Enter company name"
                  {...register("company", {
                    required: "Company name is required",
                  })}
                />
                {errors.company && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.company.message}
                  </p>
                )}
              </div>
            </div>

            {/* Project & Valid Time */}
            <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
              <div className="w-full gap-4 xl:w-1/2">
                <InputGroup
                  disabled
                  label="Project Name"
                  type="text"
                  placeholder="Enter project name"
                  {...register("project_name", {
                    required: "Project name is required",
                  })}
                />
                {errors.project_name && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.project_name.message}
                  </p>
                )}
              </div>
              <div className="w-full gap-4 xl:w-1/2">
                <InputGroup
                  disabled
                  label="Valid Time"
                  type="text"
                  placeholder="Enter valid time"
                  {...register("valid_time", {
                    required: "Valid time is required",
                  })}
                />
                {errors.valid_time && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.valid_time.message}
                  </p>
                )}
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
              <div className="w-full gap-4 xl:w-1/2">
                <InputGroup
                  disabled
                  label="Customer Name"
                  type="text"
                  placeholder="Enter customer name"
                  {...register("customer_name", {
                    required: "Customer name is required",
                  })}
                />
                {errors.customer_name && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.customer_name.message}
                  </p>
                )}
              </div>
              <div className="w-full gap-4 xl:w-1/2">
                <InputGroup
                  disabled
                  label="Customer Email"
                  type="email"
                  placeholder="Enter customer email"
                  {...register("customer_email", {
                    required: "Customer email is required",
                  })}
                />
                {errors.customer_email && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.customer_email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone & Address */}
            <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
              <div className="w-full gap-4 xl:w-1/2">
                <InputGroup
                  disabled
                  label="Customer Phone Number"
                  type="text"
                  placeholder="Enter customer phone number"
                  {...register("customer_phone", {
                    required: "Customer phone number is required",
                  })}
                />
                {errors.customer_phone && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.customer_phone.message}
                  </p>
                )}
              </div>
              <div className="w-full gap-4 xl:w-1/2">
                <InputGroup
                  disabled
                  label="Customer Address"
                  type="text"
                  placeholder="Enter customer address"
                  {...register("customer_address", {
                    required: "Customer address is required",
                  })}
                />
                {errors.customer_address && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.customer_address.message}
                  </p>
                )}
              </div>
            </div>

            <h3 className="mb-5 text-lg font-semibold">Terms & Conditions</h3>
            {tcFields.map((field, index) => (
              <div key={field.id} className="mb-2 flex items-center gap-2">
                <input
                  disabled
                  {...register(`terms_and_conditions.${index}` as const)}
                  className="flex-1 border p-2"
                />
              </div>
            ))}
          </>
        )}

        {/* Signs & PO File */}
        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
          <div className="w-full gap-4 xl:w-1/2">
            <InputGroup
              label="PO File"
              placeholder="Upload PO File"
              type="file"
              {...register("po_file", {
                required: "PO file is required",
              })}
              required
            />
            {errors.po_file && (
              <p className="ml-2 mt-2 text-sm text-red-500">
                {errors.po_file.message}
              </p>
            )}
          </div>
          <div className="w-full gap-4 xl:w-1/2">
            <InputGroup
              label="Received By Sign"
              placeholder="Received by sign"
              type="file"
              {...register("received_sign", {
                required: "Received by sign is required",
              })}
              required
            />
            {errors.received_sign && (
              <p className="ml-2 mt-2 text-sm text-red-500">
                {errors.received_sign.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
          <div className="w-full gap-4 xl:w-1/2">
            <InputGroup
              label="Prepared By Sign"
              placeholder="Prepared by sign"
              type="file"
              {...register("prepared_sign", {
                required: "Prepared by sign is required",
              })}
              required
            />
            {errors.po_file && (
              <p className="ml-2 mt-2 text-sm text-red-500">
                {errors.po_file.message}
              </p>
            )}
          </div>
          <div className="w-full gap-4 xl:w-1/2">
            <InputGroup
              label="Approved By Sign"
              type="file"
              placeholder="Approved by sign"
              {...register("approved_sign", {
                required: "Approved by sign is required",
              })}
            />
            {errors.company && (
              <p className="ml-2 mt-2 text-sm text-red-500">
                {errors.company.message}
              </p>
            )}
          </div>
        </div>

        {/* Received By, Prepared By, Approved By */}
        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
          <div className="w-full gap-4 xl:w-1/2">
            <InputGroup
              label="Received By"
              type="text"
              placeholder="Enter received by"
              {...register("received_by", {
                required: "Received by is required",
              })}
            />
            {errors.received_by && (
              <p className="ml-2 mt-2 text-sm text-red-500">
                {errors.received_by.message}
              </p>
            )}
          </div>
          <div className="w-full gap-4 xl:w-1/2">
            <InputGroup
              label="Prepared By"
              type="text"
              placeholder="Enter prepared by"
              {...register("prepared_by", {
                required: "Prepared by is required",
              })}
            />
            {errors.prepared_by && (
              <p className="ml-2 mt-2 text-sm text-red-500">
                {errors.prepared_by.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
          <div className="w-full gap-4 xl:w-1/2">
            <InputGroup
              label="Approved By"
              type="text"
              placeholder="Enter approved by"
              {...register("approved_by", {
                required: "Approved by is required",
              })}
            />
            {errors.approved_by && (
              <p className="ml-2 mt-2 text-sm text-red-500">
                {errors.approved_by.message}
              </p>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="mb-4.5">
          <h3 className="mb-2 font-semibold">Items</h3>
          {itemFields.map((field, index) => (
            <div
              key={field.id}
              className="mb-4 flex flex-col gap-4 xl:flex-row"
            >
              <div className="w-full xl:w-1/5">
                <InputGroup
                  label="Product Number"
                  type="text"
                  placeholder="PRD001"
                  {...register(`items.${index}.product_number` as const, {
                    required: "Product Number is required",
                  })}
                />
                {errors.items?.[index]?.product_number && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.items[index]?.product_number?.message}
                  </p>
                )}
              </div>
              <div className="w-full xl:w-2/5">
                <InputGroup
                  label="Description"
                  type="text"
                  placeholder="Product description"
                  {...register(`items.${index}.description` as const, {
                    required: "Description is required",
                  })}
                />
                {errors.items?.[index]?.description && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.items[index]?.description?.message}
                  </p>
                )}
              </div>
              <div className="w-full xl:w-1/5">
                <InputGroup
                  label="Qty"
                  type="number"
                  placeholder="1"
                  {...register(`items.${index}.qty` as const, {
                    valueAsNumber: true,
                    required: "Qty is required",
                  })}
                />
                {errors.items?.[index]?.qty && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.items[index]?.qty?.message}
                  </p>
                )}
              </div>
              <div className="w-full xl:w-1/5">
                <InputGroup
                  label="Nett Price"
                  type="number"
                  placeholder="1"
                  {...register(`items.${index}.nett_price` as const, {
                    valueAsNumber: true,
                    required: "Nett Price is required",
                  })}
                />
                {errors.items?.[index]?.nett_price && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.items[index]?.nett_price?.message}
                  </p>
                )}
              </div>

              <div className="w-full xl:w-1/5">
                <InputGroup
                  label="Total Price"
                  type="number"
                  placeholder="1"
                  {...register(`items.${index}.total_price` as const, {
                    valueAsNumber: true,
                    required: "Total Price is required",
                  })}
                />
                {errors.items?.[index]?.total_price && (
                  <p className="ml-2 mt-2 text-sm text-red-500">
                    {errors.items[index]?.total_price?.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="mb-4 rounded bg-blue-500 px-3 py-1 text-white"
            onClick={() =>
              appendItem({
                product_number: "",
                description: "",
                qty: 1,
                nett_price: 0,
                total_price: 0,
              })
            }
          >
            Add Item
          </button>
        </div>

        <button className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          Create Delivery Order
        </button>
      </form>
      <Toaster />
    </ShowcaseSection>
  );
}
