const { test, expect } = require('@playwright/test');

test('search fligh ny to berlin', async ({ page, context }) => {
  await page.goto('https://www.aviasales.com/');
  await page.locator('[data-selene-widget="navbar"] [data-test-id="switch"]').click();
  //await page.locator('[data-test-id="origin-autocomplete-field"]').click();
  await page.locator('[data-test-id="origin-autocomplete-field"]').fill('NEW York');
  await page.getByText('John F. Kennedy International Airport').click();
  await page.locator('[data-test-id="destination-autocomplete-field"]').fill('Berli');
  await page.getByText('Germany').click();
  await page.getByLabel('Mon Oct 30 2023').getByText('30').click();
  await page.locator('[data-test-id="no-return-ticket"]').click();
  await page.locator('[data-test-id="passengers-field"]').click();
  await page.locator('[data-test-id="passengers-adults-field"] a').nth(1).click();
  
  //wait for new page to open after submit search
  const page1Promise = page.waitForEvent('popup');
  await page.locator('[data-test-id="form-submit"]').click();
  const page1 = await page1Promise;

  //assertions
  await expect(page1).toHaveTitle(/NYC/);
  await expect(page1.locator('#origin')).toHaveValue('John F. Kennedy International Airport');
  await expect(page1.locator('#destination')).toHaveValue('Berlin');
  await expect(page1.locator('[data-test-id="departure-date-input"]')).toHaveValue('Mon, October 30');
  await expect(page1.locator('[data-test-id="return-date-input"]')).toHaveValue('');
  await expect(page1.locator('.additional-fields div:nth-of-type(2)')).toHaveText('2 passengers');
});