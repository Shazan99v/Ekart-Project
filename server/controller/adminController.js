import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productsModel.js";

export const getDashboardStats = async (req, res) => {
  try {

    const users = await User.countDocuments();
    const orders = await Order.countDocuments();
    const products = await Product.countDocuments();

    // Total Income
    const income = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$total" },
        },
      },
    ]);

    const totalIncome = income[0]?.total || 0;

    // Last 7 Days Orders (Graph)
    const sales = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          total: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 7 },
    ]);

    res.json({
      users,
      orders,
      products,
      income: totalIncome,
      sales,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Dashboard Error" });
  }
};
