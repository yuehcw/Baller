const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const NBAPlayer = require("../models/nbaPlayer"); // Adjust the path to your NBAPlayer model

const mongoURI = "mongodb://localhost/Baller";

async function scrapeAllPages() {
  console.log("Fetching total pages from https://www.nba.com/players?page=");
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB.");

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.nba.com/players?page=1");

  let currentPage = 1;
  while (await isNextPageButtonClickable(page)) {
    try {
      console.log(`Scraping page ${currentPage}...`);
      await scrapeCurrentPage(page);

      // Click the "Next Page" button and wait for navigation
      await Promise.all([page.click('button[title="Next Page Button"]')]);

      currentPage++;
    } catch (error) {
      console.error(
        `Navigation to page ${currentPage} failed. Retrying...`,
        error,
      );
    }
  }

  // Scrape the last page
  console.log(`Scraping page ${currentPage}...`);
  await scrapeCurrentPage(page);

  await browser.close();
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

async function isNextPageButtonClickable(page) {
  const nextButton = await page.$('button[title="Next Page Button"]');
  if (!nextButton) {
    return false;
  }

  const isDisabled = await page.evaluate(
    (button) => button.disabled,
    nextButton,
  );
  return !isDisabled;
}

async function scrapeCurrentPage(page) {
  const players = await page.evaluate(() => {
    const rows = document.querySelectorAll(
      "a.Anchor_anchor__cSc3P.RosterRow_playerLink__qw1vG",
    );
    return Array.from(rows).map((row) => {
      const playerUrl = row.getAttribute("href");
      const firstName = row.querySelector(
        "p.RosterRow_playerFirstName__NYm50",
      ).innerText;
      const lastName = row.querySelector(
        "p:not(.RosterRow_playerFirstName__NYm50)",
      ).innerText;
      const headshotUrl = row
        .querySelector("img.PlayerImage_image__wH_YX")
        .getAttribute("src");

      return {
        firstName,
        lastName,
        headshotUrl,
      };
    });
  });

  console.log(`Extracted ${players.length} players.`);

  for (const player of players) {
    console.log(
      `Extracted: ${player.firstName} ${player.lastName}, ${player.headshotUrl}`,
    );
    await NBAPlayer.updateOne(
      { firstName: player.firstName, lastName: player.lastName },
      { $set: { headshotUrl: player.headshotUrl } },
      { upsert: true },
    );
  }
}

scrapeAllPages().catch(console.error);
