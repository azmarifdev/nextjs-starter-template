import { expect, test } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /starter template/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /sign in/i })).toBeVisible();
});

test("protected routes require auth", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login$/);
});

test("authenticated user can access dashboard", async ({ page }) => {
  const loginResponse = await page.request.post("/api/v1/auth/login", {
    data: {
      email: "admin@example.com",
      password: "secret123"
    }
  });
  expect(loginResponse.ok()).toBeTruthy();

  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: /dashboard overview/i })).toBeVisible();
});
