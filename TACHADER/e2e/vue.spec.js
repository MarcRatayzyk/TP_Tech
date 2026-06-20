import { test, expect } from '@playwright/test'

test('affiche le titre du task board', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Task Board')
})
