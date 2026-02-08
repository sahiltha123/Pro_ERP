import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import Table from '../UI/Table';
import Button from '../UI/Button';
import { getDashboardStats } from '../../services/employeeService';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await getDashboardStats();
            setStats(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching dashboard stats:', err);
            setError('Failed to load dashboard data. Ensure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
        // Optional: Auto-refresh every 30 seconds for "Real-Time" feel
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading && !stats) return <div className="loader">Loading Dashboard...</div>;
    if (error) return (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
            <h3>Connection Error</h3>
            <p>{error}</p>
            <Button onClick={fetchStats}>Retry Connection</Button>
        </div>
    );

    const statCards = [
        { title: 'Total Employees', value: stats.totalEmployees, change: 'Live', color: 'blue' },
        { title: 'Department Count', value: stats.totalDepartments, change: 'Active', color: 'emerald' },
        { title: 'Total Payroll', value: `₹${(stats.totalPayroll / 1000).toFixed(1)}k`, change: 'Monthly', color: 'purple' },
        { title: 'System Status', value: 'Online', change: 'Stable', color: 'amber' }, // Mock for now
    ];

    const columns = [
        { label: 'Name', key: 'name' },
        { label: 'Role', key: 'position' },
        { label: 'Joined', key: 'createdAt', render: (row) => new Date(row.createdAt).toLocaleDateString() },
        {
            label: 'Department', key: 'department', render: (row) => (
                <span className="status-badge status-active">{row.department}</span>
            )
        },
    ];

    return (
        <div className="dashboard-grid">
            <div className="dashboard-header" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ margin: 0 }}>Overview</h2>
                <Button size="sm" variant="secondary" onClick={fetchStats} icon={<span>🔄</span>}>
                    Refresh Data
                </Button>
            </div>

            {statCards.map((stat, i) => (
                <Card key={i} className="stat-card">
                    <div className="stat-header">
                        <h4 className="stat-title">{stat.title}</h4>
                        <span className={`stat-change text-${stat.color}`}>{stat.change}</span>
                    </div>
                    <div className="stat-value">{stat.value}</div>
                </Card>
            ))}

            <div className="dashboard-section-full">
                <Card title="Recent Employee Activity (Real-Time)">
                    <Table columns={columns} data={stats.recentHires || []} />
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
