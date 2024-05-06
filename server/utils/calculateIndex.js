function safeNum(input) {
  if (typeof input === "string") {
    input = input.replace(/[^\d.-]/g, ""); // Remove any characters that are not digits, a period, or a minus sign
  }
  const num = parseFloat(input);
  return isNaN(num) ? 0 : num;
}

function calculatePlayerIndex(stats) {
  let score = 0;

  // Scoring and efficiency
  score += safeNum(stats.points);
  score += safeNum(stats.fgm) * 2 - safeNum(stats.fga); // Reward for making shots, penalty for missing
  score += safeNum(stats.tpm) * 3; // Additional points for three-pointers

  // Efficiency impact based on attempts
  if (safeNum(stats.fga) > 0) {
    score += (safeNum(stats.fgp) / 100) * safeNum(stats.fga); // Adjusted for attempts
  }
  if (safeNum(stats.fta) > 0) {
    score += (safeNum(stats.ftp) / 100) * safeNum(stats.fta); // Adjusted for attempts
  }
  if (safeNum(stats.tpa) > 0) {
    score += (safeNum(stats.tpp) / 100) * safeNum(stats.tpa); // Adjusted for attempts
  }

  // Other stats
  score += safeNum(stats.assists) * 1.5;
  score += safeNum(stats.steals) * 3;
  score += safeNum(stats.blocks) * 3;
  score -= safeNum(stats.turnovers) * 2;
  score -= safeNum(stats.pFouls); // Minor penalty for fouls

  // Plus/Minus can be both positive and negative, directly added
  score += safeNum(stats.plusMinus);

  return score;
}

module.exports = { calculatePlayerIndex };
