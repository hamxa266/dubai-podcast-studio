import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentProps,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";
import { isExternal } from "@/lib/routes";

type Variant = "primary" | "ink" | "outline" | "quiet";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Trailing icon slot. Phosphor only, one family site-wide. */
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type LinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

/*
  Pills. Every control on this site is a pill; media and containers are sharp.
  That is the whole shape system, two values.

  Contrast, measured:
    primary  #1A1A1A on #F2FF00  15.81:1  AA
    ink      #FFFFFF on #1A1A1A  17.40:1  AA
    outline  #1A1A1A on #FFFFFF  17.40:1  AA, border #8A8A8A 3.45:1 non-text
    quiet    #6E6E6E on #FFFFFF   5.10:1  AA

  The accent is a FILL. It is never a text colour, a border or a ring on a
  light ground, because yellow on white measures 1.10:1. There is deliberately
  no variant here that would let you do that.
*/
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill " +
  "font-medium transition duration-[var(--dur-base)] ease-out-expo " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  /** Booking, and nothing else. */
  primary: "bg-accent text-accent-ink hover:bg-accent-hover hover:-translate-y-px",
  /** Secondary solid, for use on the light ground where yellow would shout. */
  ink: "bg-ink text-paper hover:bg-ink/90 hover:-translate-y-px",
  outline:
    "border border-line-strong text-ink hover:border-ink hover:bg-ash hover:-translate-y-px",
  quiet:
    "text-muted underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink",
};

/* 40 / 44 / 52px. `sm` is used only in the desktop header, where the input is
   a pointer; everything a thumb has to hit is md or lg. */
const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

function classes({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: Pick<BaseProps, "variant" | "size" | "fullWidth" | "className">) {
  return cn(
    base,
    variants[variant],
    /* quiet is a text link. Box sizing would make it read as a ghost button
       and compete with the real CTA. */
    variant !== "quiet" && sizes[size],
    fullWidth && "w-full",
    className,
  );
}

export function Button(props: ButtonProps | LinkProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    iconRight,
    fullWidth,
    ...rest
  } = props;

  const content = (
    <>
      {children}
      {iconRight ? (
        <span aria-hidden="true" className="shrink-0">
          {iconRight}
        </span>
      ) : null}
    </>
  );

  const cls = classes({ variant, size, fullWidth, className });

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };

    /* Booking, WhatsApp and maps all leave the site. New tab so the visitor
       does not lose their place, and screen readers are told. */
    if (isExternal(href)) {
      return (
        <a
          {...anchorRest}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          {content}
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      );
    }

    return (
      <Link {...anchorRest} href={href} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      className={cls}
    >
      {content}
    </button>
  );
}

/* ComponentProps rather than ButtonHTMLAttributes: React 19 treats `ref` as a
   regular prop, and only ComponentProps carries it in the types. */
interface IconButtonProps extends Omit<ComponentProps<"button">, "children"> {
  /** Required. An icon alone tells a screen reader nothing. */
  label: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "accent" | "ink" | "outline" | "outline-ink";
}

const iconSizes = { sm: "size-9", md: "size-11", lg: "size-13" } as const;

const iconVariants = {
  accent: "bg-accent text-accent-ink hover:bg-accent-hover",
  ink: "bg-ink text-paper hover:bg-ink/90",
  outline: "border border-line-strong text-ink hover:border-ink hover:bg-ash",
  /* The same control on a dark ground. `outline` would put ink-coloured
     glyphs on near-black. */
  "outline-ink":
    "border border-line-dark-strong text-paper hover:border-paper hover:bg-paper/10",
} as const;

/**
 * Circular icon button.
 *
 * The reference leans on these heavily: 33px, 44px and 52px yellow and black
 * circles for carousel arrows, close buttons and inline actions. They are a
 * large part of why that page reads the way it does.
 */
export function IconButton({
  label,
  children,
  size = "md",
  variant = "outline",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      aria-label={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-pill",
        "transition duration-[var(--dur-base)] ease-out-expo active:scale-[0.94]",
        "disabled:pointer-events-none disabled:opacity-40",
        iconSizes[size],
        iconVariants[variant],
        className,
      )}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
