import Draw from "../models/Draw.js";
import Score from "../models/Score.js";
import Subscription from "../models/Subscription.js";

import { calculatePool } from "../utils/prizePool.js";
import { getDrawWinners } from "../utils/winners.js";
import { calculatePrizes } from "../utils/prizeDistribution.js";
import { handleJackpot } from "../utils/jackpot.js";
import { generateDrawNumbers } from "../utils/drawGenerator.js";
import { getMatchCount } from "../utils/matchLogic.js";

const processDrawLogic = async () => {
  // 🔹 1. Generate numbers
  const drawNumbers = generateDrawNumbers();

  // 🔹 2. Active subscriptions
  const activeSubs = await Subscription.find({
    status: "active",
    endDate: { $gt: new Date() }
  });

  if (activeSubs.length === 0) {
    throw new Error("No active subscriptions");
  }

  const userIds = activeSubs.map(sub => sub.user);

  // 🔹 3. Get scores
  const allScores = await Score.find({
    user: { $in: userIds }
  });

  // 🔹 4. Group scores
  const userMap = {};
  allScores.forEach(score => {
    const userId = score.user.toString();
    if (!userMap[userId]) userMap[userId] = [];
    userMap[userId].push(score);
  });

  // 🔹 5. Match calculation
  let results = [];
  for (let userId in userMap) {
    const scores = userMap[userId];
    if (scores.length < 5) continue;

    const matchCount = getMatchCount(scores, drawNumbers);

    results.push({
      user: userId,
      match: matchCount
    });
  }

  if (results.length === 0) {
    throw new Error("No users with 5 scores");
  }

  // 🔹 6. Money calculation
  let totalAmount = 0;
  let charityTotal = 0;

  activeSubs.forEach(sub => {
    const amount = Number(sub.amount) || 0;
    const percentage = Number(sub.charityPercentage) || 0;

    const charity = (amount * percentage) / 100;

    charityTotal += charity;
    totalAmount += (amount - charity);
  });

  if (isNaN(totalAmount)) {
    throw new Error("Calculation error (NaN)");
  }

  // 🔹 7. Pool
  const pool = calculatePool(totalAmount);

  // 🔹 8. Winners
  const winners = getDrawWinners(results);

  // 🔹 9. Prize distribution
  const prizes = calculatePrizes(pool, winners);

  // 🔹 10. Jackpot
  const lastDraw = await Draw.findOne().sort({ createdAt: -1 });
  const previousJackpot = Number(lastDraw?.jackpot) || 0;
  const jackpot = handleJackpot(previousJackpot, pool, winners);

  // 🔹 11. Final result mapping
  results = results.map(r => {
    let type = "No Prize";
    let prize = 0;

    if (r.match === 5) {
      type = "5-match";
      prize = prizes.fivePrize;
    } else if (r.match === 4) {
      type = "4-match";
      prize = prizes.fourPrize;
    } else if (r.match === 3) {
      type = "3-match";
      prize = prizes.threePrize;
    }

    return {
      ...r,
      result: {
        type,
        prize,
        status: "pending"
      }
    };
  });

  return {
    drawNumbers,
    results,
    pool,
    charityTotal,
    jackpot
  };
};


export const simulateDraw = async (req, res) => {
  try {
    const data = await processDrawLogic();

    res.json({
      message: "Simulation successful ",
      simulation: true,
      drawNumbers: data.drawNumbers,
      totalPool: data.pool.totalPool,
      charityTotal: data.charityTotal,
      jackpot: data.jackpot,
      results: data.results
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const runDraw = async (req, res) => {
  try {

    //  ADD HERE (START)
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const existingDraw = await Draw.findOne({
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth
      }
    });

    if (existingDraw) {
      return res.status(400).json({
        message: "Draw already executed this month"
      });
    }
    // ADD HERE (END)


    // THEN RUN LOGIC
    const data = await processDrawLogic();

    const draw = await Draw.create({
      numbers: data.drawNumbers,
      results: data.results,
      totalPool: Number(data.pool.totalPool) || 0,
      fiveMatchPool: Number(data.pool.fiveMatchPool) || 0,
      fourMatchPool: Number(data.pool.fourMatchPool) || 0,
      threeMatchPool: Number(data.pool.threeMatchPool) || 0,
      jackpot: Number(data.jackpot) || 0
    });

    res.json({
      message: "Draw executed successfully ",
      drawId: draw._id,
      drawNumbers: data.drawNumbers,
      totalPool: data.pool.totalPool,
      charityTotal: data.charityTotal,
      jackpot: data.jackpot,
      results: data.results
    });

  } catch (error) {
    console.error("DRAW ERROR ", error);

    res.status(500).json({
      message: error.message
    });
  }
};