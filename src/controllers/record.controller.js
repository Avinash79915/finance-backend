import Record from "../models/record.model.js";

// Create a new record
export const createRecord = async (req, res) => {
  try {
    const record = await Record.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all records
export const getAllRecords = async (req, res) => {
  try {
    const {
      search,
      page = 1,
      limit = 5,
      type,
      category,
      startDate,
      endDate
    } = req.query;

    let query = { isDeleted: false };

    if (search) {
      query.$or = [
        { category: { $regex: search, $options: "i" } },
        { note: { $regex: search, $options: "i" } }
      ];
    }

    if (type) query.type = type;
    if (category) query.category = category;

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const total = await Record.countDocuments(query);

    const records = await Record.find(query)
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    res.status(200).json({
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      records
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a record
export const updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Soft delete a record
export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true },
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record soft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // GET RECORDS WITH FILTER
// export const getRecords = async (req, res) => {
//   try {
//     const { type, category, startDate, endDate } = req.query;

//     let filter = {};

//     if (type) {
//       filter.type = type;
//     }

//     if (category) {
//       filter.category = category;
//     }

//     if (startDate && endDate) {
//       filter.date = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate),
//       };
//     }

//     console.log("FILTER:", filter);

//     const records = await Record.find(filter).populate(
//       "createdBy",
//       "name email",
//     );

//     res.json(records);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Restore a soft-deleted record
export const restoreRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record restored successfully", record });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};