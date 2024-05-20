const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const NBAPlayer = require("../models/nbaPlayer"); // Adjust the path to your NBAPlayer model

const mongoURI = "mongodb://localhost/Baller";

async function scrapeAllPages() {
  console.log("Fetching total pages from https://www.nba.com/players?page=");
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB.");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });

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
    const rows = document.querySelectorAll("table.players-list tbody tr");
    return Array.from(rows)
      .map((row) => {
        const playerLink = row.querySelector(
          "a.Anchor_anchor__cSc3P.RosterRow_playerLink__qw1vG",
        );
        if (!playerLink) return null; // 如果没有找到链接，跳过该行

        const firstName =
          row
            .querySelector("p.RosterRow_playerFirstName__NYm50")
            ?.innerText.trim() || null;

        const lastName =
          row
            .querySelector("p:not(.RosterRow_playerFirstName__NYm50)")
            ?.innerText.trim() || null;

        const headshotUrl = row
          .querySelector("img.PlayerImage_image__wH_YX")
          .getAttribute("src");

        // 获取球员的其他信息
        const number = row.children[2]?.innerText || null;
        const position = row.children[3]?.innerText || null;
        const height = row.children[4]?.innerText || null;
        const weight = row.children[5]?.innerText.replace(" lbs", "") || null; // 去除单位
        const lastAttended = row.children[6]?.innerText || null;
        const country = row.children[7]?.innerText || null;

        return {
          firstName,
          lastName,
          headshotUrl,
          number,
          position,
          height,
          weight,
          lastAttended,
          country,
        };
      })
      .filter((player) => player !== null);
  });

  console.log(`Extracted ${players.length} players.`);

  for (const player of players) {
    console.log(
      `Extracted: ${player.firstName} ${player.lastName}, ${player.headshotUrl}, ${player.number}, ${player.position}, ${player.height}, ${player.weight}, ${player.lastAttended}, ${player.country}`,
    );
    await NBAPlayer.updateOne(
      {
        firstName: player.firstName.trim(),
        lastName: player.lastName.trim(),
      },
      {
        $set: {
          headshotUrl: player.headshotUrl,
          number: player.number,
          position: player.position,
          height: player.height,
          weight: player.weight,
          lastAttended: player.lastAttended,
          country: player.country,
        },
      },
      { upsert: true },
    );
  }
}

scrapeAllPages().catch(console.error);
