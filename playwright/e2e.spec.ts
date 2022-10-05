import { test, expect } from '@playwright/test';
const baseUrl = 'http://localhost:3333';

test.describe('list view', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}`, { waitUntil: 'networkidle' });
  });

  test('expect six buttons, one for each episode', async ({ page }) => {
    const buttons = page.locator('button');
    await expect(buttons).toHaveCount(6, { timeout: 10000 });
  });

  test('expect 4th button to be episode 1', async ({ page }) => {
    const button4 = page.locator('button >> nth=3');
    await expect(button4).toContainText('Episode 1');
    await expect(button4).toContainText('The Phantom Menace');
  });

  test('expect 1st button to be episode 4', async ({ page }) => {
    const button4 = page.locator('button >> nth=0');
    await expect(button4).toContainText('(Episode 4)');
    await expect(button4).toContainText('A New Hope');
  });

  test('navigate to detail view', async ({ page }) => {
    await page.locator('button:text("A New Hope (Episode 4)")').click();
    await expect(page).toHaveURL(/.*\/films\/4$/);
  });
});

test.describe('detail view', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/films/4`, { waitUntil: 'networkidle', timeout: 30000 });
  });

  test('navigate to list view', async ({ page }) => {
    const button = page.locator('button:text("back")');
    button.click();
    await expect(page).toHaveURL(/.*\/films$/, { timeout: 10000 });
  });
});
