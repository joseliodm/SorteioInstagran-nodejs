const puppeter = require('puppeteer');

//Ler comentarios

async function start() {

   async function loadMore(page, selector){
    const moreButton = await page.$(selector)
    if(moreButton) {
        console.log('More');
        await moreButton.click()
        await page.waitForTimeout(2000);
        await loadMore(page, selector)
        

}
else{console.log('No more')}
    }
//pegar os comentarios

async function getComments(page, selector){ 
    const comments = await page.$$eval(selector, links => links.map(link => link.innerText))
    return comments
}

const browser = await puppeter.launch(  {headless: false} );
const page = await browser.newPage();
// Acessa a página do instagram.
await page.goto("https://www.instagram.com", { waitUntil: "networkidle0" });
await page.click(`input[type="text"]`); // Da um click falso no input de login
await page.keyboard.type("dominio595", {delay:100}); // digita uma string no input
await page.click('input[type="password"]'); //Da um click falso no input de sennha
await page.keyboard.type("jdm12jdm", {delay:100}); // digita uma string no input
await page.click(".L3NKy"); // Clica em um elemento HTML cujo a classe é ".L3NKy"
await page.waitForNavigation();
await page.goto("https://www.instagram.com/p/CaCuWmmsd77/", { waitUntil: "networkidle0" });

const comments = await getComments(page,'.C4VMK > h3 > div > span > a')

await loadMore(page, '.EtaWk > ul > li > div > button');
function count(comments){
    const counted = comments.reduce((acc, comment) => {
        if(!acc[comment]){
            acc[comment] = 0
        }
        acc[comment] += 1
        return acc
    }, {})
    return counted
}
sort(count(comments))

const comments2 = await getComments(page,'.C4VMK > h3 > div > span > a')

await loadMore(page, '.EtaWk > ul > li > div > button');
function count2(comments2){
    const counted2 = comments2.reduce((acc, comment) => {
        if(!acc[comment]){
            acc[comment] = 0
        }
        acc[comment] += 1
        return acc
    }, {})
    return counted2
}
console.log(count2(comments2));
function sort(counted){
    const sorted = Object.entries(counted).sort((a, b) => b[1] - a[1])
    return sorted
}
const counted = count(comments)
const sorted = sort(counted)
const top5 = sorted.slice(0,1)
console.log(top5)
await browser.close();
}

start()