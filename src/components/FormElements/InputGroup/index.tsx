import { cn } from "@/lib/utils";
import { type HTMLInputTypeAttribute, useId, forwardRef } from "react";

type InputGroupProps = {
  className?: string;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  name?: string;
  height?: "sm" | "default";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  (
    {
      className,
      label,
      type,
      placeholder,
      required,
      disabled,
      icon,
      iconPosition,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className={className}>
        <label
          htmlFor={id}
          className="text-body-sm font-medium text-dark dark:text-white"
        >
          {label}
          {required && <span className="ml-1 select-none text-red">*</span>}
        </label>

        <div
          className={cn(
            "relative mt-3 [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2",
            iconPosition === "left" ? "[&_svg]:left-4.5" : "[&_svg]:right-4.5",
          )}
        >
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            ref={ref}
            {...props}
            className={cn(
              "w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary",
              type === "file"
                ? getFileStyles("style1")
                : "px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white",
              iconPosition === "left" && "pl-12.5",
              props.height === "sm" && "py-2.5",
            )}
          />
          {icon}
        </div>
      </div>
    );
  },
);

export default InputGroup;

function getFileStyles(variant: "style1" | "style2") {
  switch (variant) {
    case "style1":
      return `file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white`;
    default:
      return `file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 file:focus:border-primary dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white px-3 py-[9px]`;
  }
}
