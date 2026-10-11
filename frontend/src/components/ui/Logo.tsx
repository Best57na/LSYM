import { ReceiptText } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2" aria-label="SlipWise home">
      <span className="bg-brand-gradient grid h-8 w-8 place-items-center rounded-lg text-white">
        <ReceiptText className="h-4.5 w-4.5" aria-hidden />
      </span>
      <span className="text-lg font-semibold tracking-wide text-brand-600">SlipWise</span>
    </Link>
  );
}
