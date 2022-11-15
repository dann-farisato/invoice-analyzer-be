'use strict';
const puppeteer = require('puppeteer');

exports.findHSCode = async (req, res) => {
    console.log('hi')
    try {

        const hsCodesToReturn = [];
        for (let i = 0; i < req.body.length; i++) {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            // await page.goto('https://www.google.com');
            // await page.waitForTimeout(1000);
            // await page.type("input[name = 'q']", `${req.body[i]} hs code`, { delay: 500 });
            await page.goto(`https://www.google.com/search?q=${req.body[i]}+hs+code`);
            const [button] = await page.$x("//button[contains(., 'Accept all')]");
            if (button) {
                await button.click();
            }
            //$eval('#email', el => el.value = 'test@example.com');
            await page.keyboard.press('Enter');
            let element = await page.$('b')
            let result = await page.evaluate(el => el.textContent, element);
            if (Number(result)) {
                console.log(result);
                hsCodesToReturn.push(result);
            } else {
                element = await page.$('i');
                if (element) await element.click();
                element = await page.$("div[id = 'search']");
                let result = await page.evaluate(el => el.textContent, element).then(res => res.match(/\d{8}/)[0]);
                console.log(result)
                hsCodesToReturn.push(result)
            }
            //await browser.close();
        }

        res.status(200);
        res.send(hsCodesToReturn);
    } catch (e) {
        console.log('error in findHsCode in controller', e); // eslint-disable-line no-console
        res.sendStatus(500);
    }
};
