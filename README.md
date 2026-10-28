# Juicebox Frontend Assessment

Mobile onboarding flow built from the Juicebox Figma file: homepage, walkthrough, two-step form and result page.

## Run locally

Requirements: Node 20+ and pnpm 10.

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts:

| Script        | What it does                                           |
| ------------- | ------------------------------------------------------ |
| `pnpm build`  | Production build (all routes are statically generated) |
| `pnpm start`  | Serve the production build                             |
| `pnpm lint`   | oxlint                                                 |
| `pnpm format` | oxfmt, writes in place                                 |
| `pnpm check`  | lint + format check                                    |

## Stack

Next.js 16 (App Router, Turbopack, React Compiler), TypeScript, Tailwind CSS v4 on top of CSS variables, GSAP, Lottie (`lottie-web` light build), Lenis, Swiper, react-hook-form + zod, Zustand.

## Flow

```
/              Home: Lottie animation, opinions animate in, "Get a reality check"
/walkthrough   Swiper, 3 slides, "Continue" then "Get started"
/form          Step 1 first name, step 2 email
/result        Greeting with the name, summary of both answers
```

The back arrow steps back through slides and form steps. The refresh icon starts over and clears the answers.

## How the requirements map to the code

| Requirement                 | Where                                                                                                                                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lottie + GSAP               | `src/components/lottie/lottie-hexagon.tsx` loads the provided `JB2G_Lottie.json` as is. Lottie runs with `autoplay: false` and a GSAP tween drives its frames. Used on the homepage and the result page, as the brief asks |
| Lenis                       | `src/providers/smooth-scroll.tsx`, mounted once in the root layout                                                                                                                                                         |
| Home intro                  | `src/app/components/home-hero.tsx`, GSAP timeline with `gsap.matchMedia`                                                                                                                                                   |
| Swiper                      | `src/app/walkthrough/components/walkthrough-slider.tsx`                                                                                                                                                                    |
| Reusable form components    | `src/components/input/text-input.tsx`, `src/components/ui/button.tsx`                                                                                                                                                      |
| Validation                  | `src/app/form/components/schema.ts` (zod), one field validated per step                                                                                                                                                    |
| Result summary              | `src/app/result/components/result-summary.tsx`                                                                                                                                                                             |
| CSS variables               | `src/app/globals.css`. Figma variables live on `:root` and Tailwind utilities read them through `@theme inline`                                                                                                            |
| Desktop-ready media queries | `globals.css` `@media (min-width: 768px)` scales the tokens. Components read tokens, so a desktop layout only needs new values plus `md:` layout classes                                                                   |

## Decisions worth explaining

**Lottie is used exactly as provided.** `public/assets/JB2G_Lottie.json` is imported statically together with `lottie-web` and rendered without changes. `lottie-web` reads `navigator` when its module loads, so the component is loaded with `next/dynamic` and `ssr: false`, which also keeps the 229 KB JSON in its own chunk. The animation is a morphing `#B488F2` hexagon. It sits in the orb slot on the homepage and in the hexagon slot on the result page. The walkthrough orb and the form hexagon are the static Figma images, since the brief does not ask for Lottie there.

**Device chrome is not built.** The Figma frames include an iOS status bar, the Safari URL bar and the iOS keyboard. The real browser provides those, so the layout targets the 390 x 665 viewport left between them.

**Accessible labels without changing the design.** The fields only have placeholders in Figma. The question above each field is the field's `<label>`, errors use `aria-invalid`, `aria-describedby` and `role="alert"`, and focus moves to the next field after each step.

**State.** The answers live in one Zustand slice persisted to `sessionStorage`, so a reload keeps them for the tab only. The result page waits for the store to hydrate before rendering, which avoids a hydration mismatch.

**Result "Continue".** Figma has no screen after the result, so Continue starts a new check instead of being a dead button.

**Reduced motion.** With `prefers-reduced-motion: reduce`, the intro and text reveal are skipped and the Lottie holds its first frame.

## Project structure

```
src/
  app/                    routes; page-only components sit in each route's components/
  components/             shared: ui/button, input/text-input, layout/{app-header,screen}, lottie/lottie-hexagon
  common/                 constants/routes, lib/asset, stores/ (Zustand slice pattern)
  providers/              Lenis
public/assets/            logo, icons, orb and hexagon images, JB2G_Lottie.json
docs/assessment-plan.md   review, flow, diagrams and verification notes
```

## Known limits

- Only the mobile design exists, so desktop just centres the mobile column at a wider max width.
