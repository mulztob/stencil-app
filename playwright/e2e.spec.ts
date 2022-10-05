import { test, expect } from '@playwright/test';

test.describe('app-root', () => {
  test('expect title "Star Wars API Test App using Stencil.JS"', async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
    const h = page.locator('h1');
    await expect(h).toContainText('Star Wars API Test App using Stencil.JS');
  });
});

test.describe('list view', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('', { waitUntil: 'networkidle' });
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
    await page.goto('/films/4', { waitUntil: 'networkidle', timeout: 30000 });
  });

  test('navigate to list view', async ({ page }) => {
    const button = page.locator('button:text("back")');
    button.click();
    await expect(page).toHaveURL(/.*\/films$/, { timeout: 10000 });
  });

  test('Title "A New Hope"', async ({ page }) => {
    const h = page.locator('div.films-details > h1');
    await expect(h).toContainText('A New Hope');
  });

  test('has an abstract', async ({ page }) => {
    const p = page.locator('p.abstract');
    await expect(p).toContainText(`It is a period of civil war.
Rebel spaceships, striking
from a hidden base, have won
their first victory against
the evil Galactic Empire.

During the battle, Rebel
spies managed to steal secret
plans to the Empire's
ultimate weapon, the DEATH
STAR, an armored space
station with enough power
to destroy an entire planet.

Pursued by the Empire's
sinister agents, Princess
Leia races home aboard her
starship, custodian of the
stolen plans that can save her
people and restore
freedom to the galaxy....`);
  });
});
