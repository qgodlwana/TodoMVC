
const{test, expect}=require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/vanillajs/');
  });

  const ITEMS = [
  'wake up',
  'turn off alarm',
  'Take a shower'  
];

test('Create And Clear One Task', async ({page}) =>{    
  await expect(page).toHaveTitle('VanillaJS • TodoMVC')
  await expect(page.locator(".header[class='header'] h1")).toBeVisible()
  await page.getByPlaceholder('What needs to be done?').fill(ITEMS[0]);
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await expect(page.locator(".todo-count")).toBeVisible()  
  await page.getByText('Mark all as complete').click();
  await page.getByRole('button', { name: 'Clear completed' }).click();
  });

test('Create, Select And Clear Two Tasks', async ({ page }) => {    
  await page.getByPlaceholder('What needs to be done?').fill(ITEMS[0]);
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill(ITEMS[1]);
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.locator('div').filter({ hasText: ITEMS[0] }).getByRole('checkbox').check();
  expect(await page.locator('div').filter({ hasText: ITEMS[0] }).getByRole('checkbox').isChecked()).toBeTruthy();    
  await page.locator('div').filter({ hasText: ITEMS[1] }).getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Clear completed' }).click();
  });
  
    
test('Create Complete And Clear Two Tasks', async ({ page }) => {   
  await page.getByPlaceholder('What needs to be done?').fill(ITEMS[0]);
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill(ITEMS[1]);
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByText('Mark all as complete').click();
  await page.getByRole('button', { name: 'Clear completed' }).click();
  });   

test('Create And Delete A Task', async ({ page }) => {   
  await page.getByPlaceholder('What needs to be done?').fill(ITEMS[2]);
  await page.getByPlaceholder('What needs to be done?').press('Enter');    
  await page.getByText(ITEMS[2]).hover()
  await page.getByRole('button', { name: '×' }).click();    
  });

test('Create, Update, Complete And Clear A Task', async ({ page }) => {
      
    await page.getByPlaceholder('What needs to be done?').fill(ITEMS[1]);
    await page.getByPlaceholder('What needs to be done?').press('Enter');
    await page.getByText(ITEMS[1]).dblclick();      
    await page.locator('li').filter({ hasText: ITEMS[1] }).getByRole('textbox').fill('update turn off alarm');
    await page.locator('li').filter({ hasText: ITEMS[1] }).getByRole('textbox').press('Enter');      
    await page.locator('div').getByRole('checkbox').check();
    expect(await page.locator('div').getByRole('checkbox').isChecked()).toBeTruthy(); 
    await page.getByRole('button', { name: 'Clear completed' }).click();
    }); 

test('Create, Complete And Delete A Task', async ({ page }) => { 
  await page.getByPlaceholder('What needs to be done?').fill(ITEMS[0]);
  await page.getByPlaceholder('What needs to be done?').press('Enter');  
  await page.locator('div').getByRole('checkbox').check();
  expect(await page.locator('div').getByRole('checkbox').isChecked()).toBeTruthy();  
  await page.getByRole('button', { name: '×' }).click();
});