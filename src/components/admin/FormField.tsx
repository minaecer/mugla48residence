"use client";

import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "date" | "textarea" | "select";
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  className?: string;
}

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  options,
  rows = 4,
  className = "",
}: FormFieldProps) {
  const baseClasses =
    "w-full px-4 py-2.5 border border-light-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors disabled:bg-cream disabled:cursor-not-allowed";

  const errorClasses = error ? "border-red-400 focus:ring-red-200" : "";

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-primary mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={`${baseClasses} ${errorClasses} resize-none`}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`${baseClasses} ${errorClasses}`}
        >
          <option value="">Seçiniz</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`${baseClasses} ${errorClasses}`}
        />
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
