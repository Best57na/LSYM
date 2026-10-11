import Image from "next/image";
import Link from "next/link";

// Transparent PNGs cut from the brand logo. "mark" drops the tagline, which is
// unreadable at navbar size; "full" keeps "LET'S SAVE YOUR MONEY".
const variants = {
  mark: { src: "/brand/lsym-logo-mark.png", width: 690, height: 240, className: "h-10 w-auto" },
  full: { src: "/brand/lsym-logo.png", width: 691, height: 240, className: "h-14 w-auto" },
};

type LogoProps = {
  variant?: keyof typeof variants;
  preload?: boolean;
};

export function Logo({ variant = "mark", preload = false }: LogoProps) {
  const logo = variants[variant];
  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label="LSYM home">
      <Image
        src={logo.src}
        alt="LSYM: Let's Save Your Money"
        width={logo.width}
        height={logo.height}
        className={logo.className}
        preload={preload}
      />
    </Link>
  );
}
