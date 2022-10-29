const {chromium} = require ("@playwright/test");
const {expect} = require ("expect");

(async(away)=>{
    const browser = await chromium.launch({headless:false})
    const context = await browser.newContext({
        // Эта часть кода для http авторизации
        httpCredentials: {
          username: 'admin',
          password: 'admin',
        },
      });
    const page = await context.newPage()
    // // Переход на сайт The-internet
    // await page.goto('https://the-internet.herokuapp.com/')

    // // Проверка заголовка страницы
    // await expect(page).toHaveTitle("The Internet")

    // // Проверка содержимого страницы
    // await expect(page.locator('.heading')).toHaveText('Welcome to the-internet')
    // await expect(page.locator('body > .row > #content > h2')).toHaveText('Available Examples')

    // // Нажатие на ссылку "A/B Testing"
    // await page.locator('text=A/B Testing').click()

    // // Проверка URL страницы
    // await expect(page).toHaveURL('https://the-internet.herokuapp.com/abtest')

    // // Ожидание полной загрузки страницы
    // await page.waitForLoadState()

    // // Проверка содержимого страницы
    // await expect(page.locator('body > .row > #content > .example > h3')).toContainText('A/B Test')
    // await expect(page.locator('body > .row > #content > .example > p')).toContainText('Also known as split testing. This is a way in which businesses are able to simultaneously test and learn different versions of a page to see which text and/or functionality works best towards a desired outcome (e.g. a user action such as a click-through)')

    // // Переход на предыдущую страницу и ожидание полной загрузки страницы
    // await page.goBack()
    // await page.waitForLoadState()

    // // Нажатие на ссылку "Add/Remove Elements" и ожидание полной загрузки страницы
    // await page.locator('text=Add/Remove Elements').click()
    // await page.waitForLoadState()

    // // Проверка URL страницы
    // await expect(page).toHaveURL('https://the-internet.herokuapp.com/add_remove_elements/')

    // // Нажатие на кнопку "Add Element'"
    // await page.locator('text=Add Element').click()
    // await page.locator('text=Add Element').click()
    // await page.locator('text=Add Element').click()

    // // Проверка количества кнопок Delete
    // await expect(page.locator('text=Delete')).toHaveCount(3)

    // // Клик на кнопку "Delete"
    // await page.locator('text=Delete >> nth=0').click()
    // await page.locator('text=Delete >> nth=0').click()
    // await page.locator('text=Delete >> nth=0').click()

    // // Переход на предыдущую страницу и ожидание полной загрузки страницы
    // await page.goBack()
    // await page.waitForLoadState()

    // // Проверка URL страницы
    // await expect(page).toHaveURL('https://the-internet.herokuapp.com/')

    // // Клик на ссылку "Basic Auth", авторизация и ожидание полной загрузки страницы
    // await page.locator('text=Basic Auth').click()
    // await page.waitForLoadState()

    
    await page.waitForTimeout(2000)
    await browser.close()
})()