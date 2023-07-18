import { test, expect } from '@playwright/test'

test('Todo basic', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/angularjs/#/')
  // Validação de título da página.
  const validaTitle = page.locator('header[class=header]')
  await expect(validaTitle).toHaveText('todos')

  // Clique e preenchimento do campo new-todo
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('nova tarefa');

  // Insere a tarefa
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // Validar tarefa inserida na lista 'nova tarefa'
  const validaTarefa = page.locator('div[class=view]')
  await expect(validaTarefa).toHaveText('nova tarefa')

  // Adicionei mais uma tarefa para validar melhor o completed
  await page.getByPlaceholder('What needs to be done?').click();
  await page.getByPlaceholder('What needs to be done?').fill('nova tarefa 2');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  // Check na tarefa "nova tarefa"
  await page.getByRole('checkbox').nth(1).check();

  // checar modificação entre as tarefas completadas
  const completo = page.getByRole('checkbox').nth(1)
  await expect(completo).toBeChecked()
  const validaexibindo = page.locator('div[class=view]')
  await expect(validaexibindo).toHaveCount(2)

  // Clicar aba completed
  await page.getByRole('link', { name: 'Completed' }).click();

  //valida apenas "nova tarefa" a ser exibida
  await expect(validaexibindo).toHaveText('nova tarefa')
  await expect(validaexibindo).toHaveCount(1)

  //limpar completos
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await expect(validaexibindo).toHaveCount(0)

})
