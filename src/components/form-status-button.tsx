"use client";

import { useFormStatus } from "react-dom";

export function FormStatusButton({ idle, pending, className, type = "submit" }: { idle: string; pending: string; className: string; type?: "submit" | "button" }) {
  const { pending: isPending } = useFormStatus();
  return <button className={className} disabled={isPending} type={type}>{isPending ? pending : idle}</button>;
}
