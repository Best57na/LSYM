"use client";

import { Show, UserButton } from "@clerk/nextjs";

import { ButtonLink } from "@/components/ui/ButtonLink";

/** Log in / Sign up when signed out, the Clerk user menu when signed in. */
export function NavAuthButtons() {
  return (
    <Show
      when="signed-in"
      fallback={
        <div className="flex items-center gap-2">
          {/* Wrapper handles visibility: `hidden` on the button would clash with its inline-flex */}
          <span className="hidden sm:block">
            <ButtonLink href="/sign-in" variant="secondary">
              Log in
            </ButtonLink>
          </span>
          <ButtonLink href="/sign-up">Sign up</ButtonLink>
        </div>
      }
    >
      <UserButton />
    </Show>
  );
}
