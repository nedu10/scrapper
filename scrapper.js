const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    timeout: 300000,
    headless: true
  });
  const page = await browser.newPage();
  const url = "https://web.bet9ja.com/Sport/Default.aspx";
  await page.goto(url, { waitUntil: "load", timeout: 0 });
  // await page.screenshot({ path: "images/home.png" });

  const get_tabs = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".eventsList div.item.ng-scope")).map(
      element => {
        element.click();
        let tabs_data = Array.from(
          document.querySelectorAll("div.itemContent div.itemRow.ng-scope")
        ).map(each_date => {
          let tab_data_items = Array.from(
            each_date.querySelectorAll(".item.ng-scope")
          ).map(each_game => ({
            date: each_date.querySelector(".date").innerText.trim(),
            time: each_game
              .querySelector(".datiSE .dataInizio")
              .innerText.trim(),
            event: each_game
              .querySelector(".datiSE .sottoevento")
              .innerText.trim(),
            odd_1: Array.from(
              each_game.querySelectorAll(".quoteList div.odds .odd")
            )[0]
              .querySelector(".QuotaValore")
              .innerText.trim(),
            odd_x: Array.from(
              each_game.querySelectorAll(".quoteList div.odds .odd")
            )[1]
              .querySelector(".QuotaValore")
              .innerText.trim(),
            odd_2: Array.from(
              each_game.querySelectorAll(".quoteList div.odds .odd")
            )[2]
              .querySelector(".QuotaValore")
              .innerText.trim(),
            odd_1x: Array.from(
              each_game.querySelectorAll(".quoteList div.odds .odd")
            )[3]
              .querySelector(".QuotaValore")
              .innerText.trim(),
            odd_12: Array.from(
              each_game.querySelectorAll(".quoteList div.odds .odd")
            )[4]
              .querySelector(".QuotaValore")
              .innerText.trim(),
            odd_2x: Array.from(
              each_game.querySelectorAll(".quoteList div.odds .odd")
            )[5]
              .querySelector(".QuotaValore")
              .innerText.trim(),
            odd_over25: Array.from(
              each_game.querySelectorAll(".quoteList div.odds .odd")
            )[6]
              .querySelector(".QuotaValore")
              .innerText.trim(),
            odd_under25: Array.from(
              each_game.querySelectorAll(".quoteList div.odds .odd")
            )[7]
              .querySelector(".QuotaValore")
              .innerText.trim()
          }));

          return tab_data_items;
        });
        return {
          title:
            element.querySelector(".nomeEvento").innerText +
            " - " +
            element.querySelector(".nomeGruppo").innerText,
          tabs_data
        };
      }
    )
  );

  console.log("get_tabs >> ", JSON.stringify(get_tabs));

  await browser.close();
})();
