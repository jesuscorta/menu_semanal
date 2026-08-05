import { expect, test } from "@playwright/test";

test("shows the private access screen", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Menú semanal" })).toBeVisible();
  await expect(page.getByLabel("Código de acceso")).toBeVisible();
});
