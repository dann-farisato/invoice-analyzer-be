'use strict';
const puppeteer = require('puppeteer');

exports.findHSCode = async (req, res) => {
    try {
        process.setMaxListeners(Infinity)
        const hsCodesToReturn = [];
        for (let i = 0; i < req.body.length; i++) {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(`https://www.google.com/search?q=${req.body[i]}+hs+code`);
            const [button] = await page.$x("//button[contains(., 'Accept all')]");
            if (button) {
                await button.click();
            }
            await page.keyboard.press('Enter');
            let element = await page.$('b');
            try {
                let result = await page.evaluate(el => {
                    console.log(el);
                    el && el.textContent
                }, element);
                if (Number(result)) {
                    hsCodesToReturn.push(result);
                } else {
                    element = await page.$('i');
                    if (element) await element.click();
                    element = await page.$("div[id = 'search']");
                    let result = await page.evaluate(el => el.textContent, element).then(res => res.match(/\d{8}/)[0]);
                    hsCodesToReturn.push(result)
                }
            } catch (error) {
                console.log("error", error);
            }
        }
        res.status(200);
        res.send(hsCodesToReturn);
    } catch (e) {
        console.log('error in findHsCode in controller', e); // eslint-disable-line no-console
        res.sendStatus(500);
    }
};
