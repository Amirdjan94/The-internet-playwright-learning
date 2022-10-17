const {chromium} = require ("@playwright/test");
const {expect} = require ("expect");

(async(away)=>{
    const browser = await chromium.launch({headless:false})
    const context = await browser.newContext()
    const page = await context.newPage()
    // Переход на сайт The-internet
    await page.goto('https://the-internet.herokuapp.com/')

    // Проверка заголовка страницы
    await expect(page).toHaveTitle("The Internet")

    // Проверка содержимого страницы
    await expect(page.locator('.heading')).toHaveText('Welcome to the-internet')
    await expect(page.locator('body > .row > #content > h2')).toHaveText('Available Examples')

    // Нажатие на ссылку "A/B Testing"
    await page.locator('text=A/B Testing').click()

    // Проверка URL страницы
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/abtest')

    await page.waitForTimeout(5000)
    await browser.close()
})()