"use client";

import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { useState, type ComponentProps, type ReactNode } from "react";

const controlClass =
  "h-12 w-full rounded-xl bg-white px-4 text-sm text-ink ring-1 ring-line transition-shadow placeholder:text-muted/70 focus:ring-2 focus:ring-brand-400 focus:outline-none aria-invalid:ring-2 aria-invalid:ring-rose/70";

type FieldProps = {
  id: string;
  label: string;
  error?: string | null;
  children: ReactNode;
};

/** Label + control + error message, with the error linked for screen readers. */
export function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose">
          {error}
        </p>
      )}
    </div>
  );
}

type ControlProps = { invalid?: boolean };

/** aria props that tie a control to the error rendered by <Field>. */
function errorProps(id: string | undefined, invalid?: boolean) {
  return invalid ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};
}

export function Input({ invalid, className = "", ...props }: ComponentProps<"input"> & ControlProps) {
  return <input className={`${controlClass} ${className}`} {...errorProps(props.id, invalid)} {...props} />;
}

export function PasswordInput({ invalid, ...props }: ComponentProps<"input"> & ControlProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        className={`${controlClass} pr-12`}
        {...errorProps(props.id, invalid)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute inset-y-0 right-0 grid w-12 place-items-center text-muted hover:text-brand-600"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function Select({ invalid, children, ...props }: ComponentProps<"select"> & ControlProps) {
  return (
    <div className="relative">
      <select
        className={`${controlClass} appearance-none pr-10`}
        {...errorProps(props.id, invalid)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
    </div>
  );
}

type CheckboxProps = Omit<ComponentProps<"input">, "type"> &
  ControlProps & {
    label: ReactNode;
  };

export function Checkbox({ invalid, label, id, ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-brand-600"
        {...errorProps(id, invalid)}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
