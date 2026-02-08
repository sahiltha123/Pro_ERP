const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();

        const salaryAggregation = await Employee.aggregate([
            { $group: { _id: null, total: { $sum: "$salary" } } }
        ]);
        const totalPayroll = salaryAggregation.length > 0 ? salaryAggregation[0].total : 0;

        const departments = await Employee.distinct('department');
        const totalDepartments = departments.length;

        const recentHires = await Employee.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalEmployees,
            totalPayroll,
            totalDepartments,
            recentHires
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
