import { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';
import Table from './UI/Table';
import Card from './UI/Card';
import Button from './UI/Button';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this employee?')) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      label: 'Employee',
      key: 'name',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: '#eff6ff', color: '#2563eb',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '600', fontSize: '0.875rem'
          }}>
            {row.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: '500' }}>{row.name}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{row.email}</div>
          </div>
        </div>
      )
    },
    { label: 'Position', key: 'position' },
    {
      label: 'Department',
      key: 'department',
      render: (row) => (
        <span style={{
          padding: '0.25rem 0.75rem', borderRadius: '999px',
          background: '#f1f5f9', color: '#475569', fontSize: '0.75rem', fontWeight: 600
        }}>
          {row.department}
        </span>
      )
    },
    {
      label: 'Salary',
      key: 'salary',
      render: (row) => `₹${row.salary.toLocaleString()}`
    }
  ];

  const renderActions = (row) => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button size="sm" variant="secondary" onClick={() => navigate(`/edit/${row._id}`)}>Edit</Button>
      <Button size="sm" variant="danger" onClick={() => handleDelete(row._id)}>Delete</Button>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>Employees</h2>
          <p style={{ color: '#64748b', margin: '0.25rem 0 0 0' }}>Manage your team members</p>
        </div>
        <Button onClick={() => navigate('/add')}>Add Employee</Button>
      </div>

      <Card>
        <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
          <div className="input-group-icon" style={{ maxWidth: '300px' }}>
            <span className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-with-icon"
            />
          </div>
        </div>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Loading...</div>
        ) : (
          <Table columns={columns} data={filteredEmployees} actions={renderActions} />
        )}
      </Card>
    </div>
  );
}

export default EmployeeList;
