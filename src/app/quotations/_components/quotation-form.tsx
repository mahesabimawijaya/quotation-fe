"use client";
import { useForm, useFieldArray } from "react-hook-form";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { api } from "@/lib/axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";

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
  items: Item[];
  terms_and_conditions: Term[];
};

export function QuotationForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      items: [
        {
          product_number: "",
          description: "",
          qty: 1,
          nett_price: 0,
          total_price: 0,
        },
      ],
      terms_and_conditions: [{ text: "" }],
    },
  });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray<FormValues, "items">({
    control,
    name: "items",
  });

  // Terms & Conditions (new one)
  const {
    fields: tcFields,
    append: appendTC,
    remove: removeTC,
  } = useFieldArray<FormValues, "terms_and_conditions">({
    control,
    name: "terms_and_conditions",
  });

  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);
    setLoading(true);
    try {
      const res = await api.post("/quotations", data);
      console.log(res);
      if (res.status === 200) {
        toast.success("Quotation created");
        router.push("/quotations");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error in creating quotation");
    } finally {
      setLoading(false);
    }
  };

  // Optional: calculate total_price when qty or nett_price changes
  watch("items").forEach((item, index) => {
    const qty = Number(item.qty) || 0;
    const nett = Number(item.nett_price) || 0;
    const total = qty * nett;
    if (total !== item.total_price) {
      setValue(`items.${index}.total_price`, total, { shouldValidate: false });
    }
  });

  return (
    <ShowcaseSection title="Quotation Form" className="!p-6.5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
          <div className="w-full gap-4 xl:w-1/2">
            <InputGroup
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
              label="Company"
              type="text"
              placeholder="Enter company name"
              {...register("company", { required: "Company name is required" })}
            />
            {errors.company && (
              <p className="ml-2 mt-2 text-sm text-red-500">
                {errors.company.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
          <div className="w-full gap-4 xl:w-1/2">
            <InputGroup
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

        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
          <div className="w-full gap-4 xl:w-1/2">
            <InputGroup
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

        <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
          <div className="w-full gap-4 xl:w-1/2">
            <InputGroup
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
                  disabled
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

        <h3 className="text-lg font-semibold">Terms & Conditions</h3>
        {tcFields.map((field, index) => (
          <div key={field.id} className="mb-2 flex items-center gap-2">
            <input
              {...register(`terms_and_conditions.${index}` as const)}
              className="flex-1 border p-2"
            />
            <button
              type="button"
              className="text-red-600"
              onClick={() => removeTC(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendTC({ text: "" })}
          className="rounded bg-blue-500 px-3 py-1 text-white"
        >
          + Add Term
        </button>

        <button className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          {loading ? <Loader className="animate-spin" /> : "Send Quotation"}
        </button>
      </form>
      <Toaster />
    </ShowcaseSection>
  );
}
