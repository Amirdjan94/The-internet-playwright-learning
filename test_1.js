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

    await page.goto('https://the-internet.herokuapp.com/broken_images')
    await page.waitForLoadState()
    // const element = await page.$$('.example>img')

    const element = await page.waitForSelector('.example>img>>nth=2')
    console.log('Loaded image: ' + await element.getAttribute('src'))

    const response = await page.request.get(await element.getAttribute('src'));
    await expect.poll(async () => {
      const response = await page.request.get('https://api.example.com');
      return response.status();
    }, {
      // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe, .... Defaults to [100, 250, 500, 1000].
      intervals: [1_000, 2_000, 10_000],
      timeout: 60_000
    }).toBe(200)
    // console.log(element)
    await page.waitForTimeout(2000)
    await browser.close()
})()