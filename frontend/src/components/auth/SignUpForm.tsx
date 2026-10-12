"use client";

import { useAuth, useSignUp } from "@clerk/nextjs";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Input, PasswordInput, Select } from "@/components/ui/form";
import { CURRENCIES, DEFAULT_CURRENCY } from "@/lib/currencies";
import {
  PASSWORD_MIN_LENGTH,
  splitFullName,
  validateSignUp,
  type SignUpFieldErrors,
  type SignUpValues,
} from "@/lib/signUpValidation";

const AFTER_SIGN_UP_URL = "/";

export function SignUpForm() {
  const { signUp } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) router.replace(AFTER_SIGN_UP_URL);
  }, [isSignedIn, router]);

  // After signUp.password() succeeds, Clerk waits for the email to be verified.
  const awaitingEmailCode =
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0;

  return awaitingEmailCode ? <VerifyEmailStep /> : <DetailsStep />;
}

function DetailsStep() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const [clientErrors, setClientErrors] = useState<SignUpFieldErrors>({});
  const busy = fetchStatus === "fetching";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: SignUpValues = {
      fullName: String(data.get("fullName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      password: String(data.get("password") ?? ""),
      confirmPassword: String(data.get("confirmPassword") ?? ""),
      currency: String(data.get("currency") ?? ""),
      termsAccepted: data.get("terms") === "on",
    };

    const validation = validateSignUp(values);
    setClientErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const { error } = await signUp.password({
      emailAddress: values.email,
      password: values.password,
      ...splitFullName(values.fullName),
      // Copied to the user's unsafeMetadata once sign-up completes.
      unsafeMetadata: { currency: values.currency, termsAcceptedAt: new Date().toISOString() },
    });
    if (error) return;

    await signUp.verifications.sendEmailCode();
  }

  // Client-side errors win; otherwise show what Clerk's server returned.
  const fieldError = {
    fullName:
      clientErrors.fullName ?? clerkMessage(errors.fields.firstName ?? errors.fields.lastName),
    email: clientErrors.email ?? clerkMessage(errors.fields.emailAddress),
    password: clientErrors.password ?? clerkMessage(errors.fields.password),
    confirmPassword: clientErrors.confirmPassword,
    currency: clientErrors.currency,
    termsAccepted: clientErrors.termsAccepted,
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Create your account</h1>
        <p className="mt-1.5 text-sm text-muted">Start tracking expenses for free</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        <Field id="fullName" label="Full name" error={fieldError.fullName}>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            placeholder="Jane Doe"
            invalid={!!fieldError.fullName}
          />
        </Field>

        <Field id="email" label="Email" error={fieldError.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            invalid={!!fieldError.email}
          />
        </Field>

        <Field id="password" label="Password" error={fieldError.password}>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
            invalid={!!fieldError.password}
          />
        </Field>

        <Field id="confirmPassword" label="Confirm password" error={fieldError.confirmPassword}>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Repeat password"
            invalid={!!fieldError.confirmPassword}
          />
        </Field>

        <Field id="currency" label="Currency" error={fieldError.currency}>
          <Select
            id="currency"
            name="currency"
            defaultValue={DEFAULT_CURRENCY}
            invalid={!!fieldError.currency}
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </Select>
        </Field>

        <div>
          <Checkbox
            id="terms"
            name="terms"
            invalid={!!fieldError.termsAccepted}
            label={
              <>
                I agree to the{" "}
                <Link href="/terms" className="font-medium text-brand-600 hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="font-medium text-brand-600 hover:underline">
                  Privacy Policy
                </Link>
              </>
            }
          />
          {fieldError.termsAccepted && (
            <p id="terms-error" className="mt-1.5 text-xs text-rose">
              {fieldError.termsAccepted}
            </p>
          )}
        </div>

        <GlobalErrors messages={errors.global?.map((e) => e.message)} />

        {/* Clerk mounts its bot-protection CAPTCHA here when enabled. */}
        <div id="clerk-captcha" />

        <Button type="submit" size="lg" variant="dark" loading={busy} className="w-full">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-brand-600 hover:underline">
          Log in
        </Link>
      </p>
    </>
  );
}

function VerifyEmailStep() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();
  const [resent, setResent] = useState(false);
  const busy = fetchStatus === "fetching";

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = String(new FormData(event.currentTarget).get("code") ?? "").trim();

    await signUp.verifications.verifyEmailCode({ code });
    if (signUp.status !== "complete") return;

    await signUp.finalize({
      navigate: ({ decorateUrl }) => {
        // decorateUrl may return an absolute URL (Safari ITP workaround).
        const url = decorateUrl(AFTER_SIGN_UP_URL);
        if (url.startsWith("http")) window.location.href = url;
        else router.push(url);
      },
    });
  }

  async function handleResend() {
    const { error } = await signUp.verifications.sendEmailCode();
    setResent(!error);
  }

  return (
    <>
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
          <MailCheck className="h-6 w-6" aria-hidden />
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink">Check your email</h1>
        <p className="mt-1.5 text-sm text-muted">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-ink">{signUp.emailAddress}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="mt-8 space-y-4">
        <Field id="code" label="Verification code" error={clerkMessage(errors.fields.code)}>
          <Input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="123456"
            className="text-center text-lg tracking-[0.5em]"
            invalid={!!errors.fields.code}
          />
        </Field>

        <GlobalErrors messages={errors.global?.map((e) => e.message)} />

        <Button type="submit" size="lg" variant="dark" loading={busy} className="w-full">
          Verify email
        </Button>
      </form>

      <div className="mt-6 flex flex-col items-center gap-2 text-sm">
        <button
          type="button"
          onClick={handleResend}
          disabled={busy}
          className="font-semibold text-brand-600 hover:underline disabled:opacity-60"
        >
          Send a new code
        </button>
        {resent && <p className="text-xs text-income">A new code is on its way.</p>}
        <button
          type="button"
          onClick={() => signUp.reset()}
          className="text-muted hover:text-ink"
        >
          Use a different email
        </button>
      </div>
    </>
  );
}

function GlobalErrors({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <div role="alert" className="rounded-xl bg-rose/10 px-4 py-3 text-sm text-rose">
      {messages.map((m) => (
        <p key={m}>{m}</p>
      ))}
    </div>
  );
}

function clerkMessage(error: { message: string; longMessage?: string } | null | undefined) {
  return error ? (error.longMessage ?? error.message) : undefined;
}
