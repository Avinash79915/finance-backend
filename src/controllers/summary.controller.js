import Record from "../models/record.model.js";

export const getSummary = async (req, res) => {
  try {
    const records = await Record.find();

    let totalIncome = 0;
    let totalExpense = 0;

    let categoryTotals = {};

    records.forEach((rec) => {
      if (rec.type === "income") {
        totalIncome += rec.amount;
      } else if (rec.type === "expense") {
        totalExpense += rec.amount;
      }

      if (!categoryTotals[rec.category]) {
        categoryTotals[rec.category] = 0;
      }
      categoryTotals[rec.category] += rec.amount;
    });

    const balance = totalIncome - totalExpense;

    const recent = await Record.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalIncome,
      totalExpense,
      balance,
      categoryTotals,
      recent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};