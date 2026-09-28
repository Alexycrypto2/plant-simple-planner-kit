# Planted & Simple Meal Prep Assistant — Build Plan

A mobile-first web app that turns the V8 cookbook into a personal weekly meal-prep system. Customers sign in, and their plans, pantry and favourites are saved to their account.

## Phase 1 — Foundation (first build)

- **Cookbook content from V8 only**: all 30 recipes (ingredients, steps, macros, prep/cook time, servings, storage, reheating, freezer, chef tips, swaps), 15 smoothies, 4 weekly plans, 7-day high-protein plan, protein cheat sheet, prep hacks, budget grocery guide, pantry tips.
- **Recipe photos** taken from the V8 PDF so every recipe looks like the book.
- **Look and feel** matching the cookbook: same colours, fonts and editorial, photo-led style.
- **Public home page** explaining the product, with sign-up.
- **Sign up / log in** (email + Google) and a short onboarding (goals, servings, dislikes, allergies, prep day, budget).
- **Recipe library**: search, filters (meal type, protein, time, prep-friendly), recipe detail page, favourites.
- **Dashboard**: this week at a glance, next prep step, quick links.
- Bottom tab bar on phones, side menu on desktop.

## Phase 2 — Planning core

- **Weekly planner**: build a week by hand or start from one of the 4 cookbook plans or the 7-day plan; swap any meal.
- **Grocery list**: auto-combined from the week, grouped by aisle, tick-off "grocery mode", hides items in pantry.
- **Pantry**: what I have at home.
- **Prep plan**: ordered prep-day steps (press tofu, cook grains, roast veg, sauces, legumes, assemble, label) and "prep once → many meals".
- **Saved plans**: save, rename and repeat a week.

## Phase 3 — Smart features (AI)

- **AI weekly planner** that only picks real V8 recipes, based on the customer's profile.
- **Smart swap** suggestions, **Use what I have**, **leftover ideas**, **smoothie picker**, **high-protein daily builder**.
- All suggestions clearly labelled and always pointing to cookbook recipes.

## Phase 4 — Polish

- Cooking mode (step-by-step, screen stays on), empty/loading/error states, accessibility pass.
- Premium access control (only buyers can use the app) and a simple admin area to edit recipes.

## Open questions for later

- How will buyers get access — a code from the cookbook, a purchase link, or open to anyone who signs up?

## Technical details

- Lovable Cloud for accounts, database (recipes, plans, pantry, favourites, profiles, roles in separate table) with per-user security rules.
- Cookbook content extracted from the PDF into seeded database tables; photos extracted and hosted.
- AI via the built-in AI service using server functions, restricted to cookbook recipe IDs; deterministic logic for grocery totals and prep ordering.
- Protected pages behind a signed-in area; public home page stays shareable.