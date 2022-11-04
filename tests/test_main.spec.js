// @ts-check
const { test, expect } = require('@playwright/test');

// test.describe ('all tests', () => {
    test ('Open site', async ({page})=>{
        // Переход на сайт The-internet
        await page.goto('/')

        // Ожидание полной загрузки страницы
        await page.waitForLoadState()

        // Проверка заголовка страницы
        await expect(page).toHaveTitle("The Internet")

        // Проверка содержимого страницы
        await expect(page.locator('.heading')).toHaveText('Welcome to the-internet')
        await expect(page.locator('body > .row > #content > h2')).toHaveText('Available Examples')
    });
    
    test ('Open A/B Testing', async ({page})=>{
        
        await page.goto('/')
        // Ожидание полной загрузки страницы
        await page.waitForLoadState()

        // Нажатие на ссылку "A/B Testing" и ожидание полной загрузки страницы
        await page.locator('text=A/B Testing').click()
        await page.waitForLoadState()

        // Проверка URL страницы
        await expect(page).toHaveURL('/abtest')
        
        // Проверка содержимого страницы
        await expect(page.locator('body > .row > #content > .example > h3')).toContainText('A/B Test')
        await expect(page.locator('body > .row > #content > .example > p')).toContainText('Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through)')
        
        // Переход на предыдущую страницу и ожидание полной загрузки страницы
        await page.goBack()
        await page.waitForLoadState()

        // Проверка URL страницы
        await expect(page).toHaveURL('/')

    });
    
    test('Open Add/Remove Elements', async ({page})=>{

        //Переход на страницу и ожидание полной загрузки
        await page.goto('/')
        await page.waitForLoadState()

        // Нажатие на ссылку "Add/Remove Elements" и ожидание полной загрузки страницы
        await page.locator('text=Add/Remove Elements').click()
        await page.waitForLoadState()

        // Проверка URL страницы
        await expect(page).toHaveURL('/add_remove_elements/')

        // Нажатие на кнопку "Add Element'"
        await page.locator('text=Add Element').click()
        await page.locator('text=Add Element').click()
        await page.locator('text=Add Element').click()

        // Проверка количества кнопок Delete
        await expect(page.locator('text=Delete')).toHaveCount(3)

        // Клик на кнопку "Delete"
        await page.locator('text=Delete >> nth=0').click()
        await page.locator('text=Delete >> nth=0').click()
        await page.locator('text=Delete >> nth=0').click()

        // Переход на предыдущую страницу и ожидание полной загрузки страницы
        await page.goBack()
        await page.waitForLoadState()
        
        // Проверка URL страницы
        await expect(page).toHaveURL('/')

    });
    test ('Basic Auth', async ({page})=>{

        //Переход на страницу и ожидание полной загрузки
        await page.goto('/')
        await page.waitForLoadState()

        // Клик на ссылку "Basic Auth", авторизация и ожидание полной загрузки страницы
        await page.locator('text=Basic Auth').click()
        await page.waitForLoadState()

        // Проверка перехода на страницу путем проверки просмотра контента
        // I am manually  to encode the username and password and define the Authorization header in playwright.config.ts
        await expect(page.locator('id=content')).toContainText('Congratulations', {timeout: 10000})
        
        // Переход на предыдущую страницу и ожидание полной загрузки страницы
        await page.goBack()
        await page.waitForLoadState()
        
        // Проверка URL страницы
        await expect(page).toHaveURL('/')
    });
    test ('Checkbox', async ({page})=>{
        
        // Переход на страницу и ожидание полной загрузки
        await page.goto('/')
        await page.waitForLoadState()

        // Клик на ссылку "Checkboxes", авторизация и ожидание полной загрузки страницы 
        await page.locator('text=Checkboxes').click()
        await page.waitForLoadState()

        // Проверка URL страницы и проверка заголовка
        expect(page).toHaveURL('/checkboxes')
        expect(page.locator('id=content')).toContainText('Checkboxes')

        // Проверка состояний чекбоксов   
        expect(await page.isChecked('input[type=checkbox]:nth-child(1)')).toBeFalsy()
        expect(await page.isChecked('input[type=checkbox]:nth-child(3)')).toBeTruthy()

        // Переключение чекбоксов на противоположные
        await page.locator('input[type=checkbox]:nth-child(1)').check()
        await page.locator('input[type=checkbox]:nth-child(3)').uncheck()

        // Проверка состояний чекбоксов   
        expect(await page.isChecked('input[type=checkbox]:nth-child(1)')).toBeTruthy()
        expect(await page.isChecked('input[type=checkbox]:nth-child(3)')).toBeFalsy()

        // Переход на предыдущую страницу и ожидание полной загрузки страницы
        await page.goBack()
        await page.waitForLoadState()
        
        // Проверка URL страницы
        await expect(page).toHaveURL('/')
    });

    test ('Testing download', async ({page})=>{
        // Переход на страницу и ожидание полной загрузки
        await page.goto('/')
        await page.waitForLoadState()
 
        // Клик на ссылку "File Download", авторизация и ожидание полной загрузки страницы 
        await page.locator('text="File Download"').click()
        await page.waitForLoadState()

        // Проверка URL страницы и проверка заголовка
        expect(page).toHaveURL('/download')
        expect(page.locator('id=content')).toContainText('File Downloader')

        const [ download ] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('teste.txt').click(),
          ]);
          const path = await download.path();
          console.log(path);
        page.waitForTimeout(3000)

    });

    test ('Drag and Drop', async ({page})=>{

        // Переход на страницу и ожидание полной загрузки
        await page.goto('/')
        await page.waitForLoadState()
 
        // Клик на ссылку "Drag and Drop, авторизация и ожидание полной загрузки страницы 
        await page.locator('text="Drag and Drop"').click()
        await page.waitForLoadState()

        // Проверка URL страницы и проверка заголовка
        expect(page).toHaveURL('drag_and_drop')
        expect(page.locator('id=content')).toContainText('Drag and Drop')

       // Проверка расположения элементов
       expect(page.locator('.column:nth-child(1)')).toContainText('A')

       // Перетаскивание элементов
       await page.locator('.column:nth-child(1)').dragTo(page.locator('.column:nth-child(2)'))

       // Проверка расположения элементов
       expect(page.locator('.column:nth-child(1)')).toContainText('B')
       await page.waitForTimeout(10000)
    })
    
// });
