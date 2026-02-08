import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, updateEmployee, getEmployee } from '../services/employeeService';
import Card from './UI/Card';
import Button from './UI/Button';
import './EmployeeForm.css';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await getEmployee(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.salary || formData.salary <= 0) newErrors.salary = 'Valid salary is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      if (id) {
        await updateEmployee(id, formData);
      } else {
        await createEmployee(formData);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
      setLoading(false);
    }
  };

  // Icons
  const UserIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
  const MailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
  const CaseIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
  const CashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button variant="secondary" size="sm" onClick={() => navigate('/employees')} icon={<span>←</span>}>
          Back
        </Button>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>
          {id ? 'Edit Employee' : 'Add Employee'}
        </h2>
      </div>

      <div className="employee-form-layout">
        {/* Left Column: Preview */}
        <Card className="profile-preview">
          <div className="avatar-large">
            {formData.name.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="preview-name">{formData.name || 'Employee Name'}</div>
          <div className="preview-role">{formData.position || 'Position'}</div>
          <div style={{ marginTop: '2rem', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Department</span>
              <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{formData.department || '-'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
              <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Status</span>
              <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.875rem' }}>Active</span>
            </div>
          </div>
        </Card>

        {/* Right Column: Form */}
        <Card>
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
            <h3 className="form-section-title">Personal Information</h3>

            <div className="form-group">
              <label>Full Name</label>
              <div className="input-group-icon">
                <span className="input-icon"><UserIcon /></span>
                <input
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-with-icon ${errors.name ? 'error' : ''}`}
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-group-icon">
                <span className="input-icon"><MailIcon /></span>
                <input
                  name="email"
                  type="email"
                  placeholder="e.g. john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-with-icon ${errors.email ? 'error' : ''}`}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <h3 className="form-section-title" style={{ marginTop: '2rem' }}>Employment Details</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Position</label>
                <div className="input-group-icon">
                  <span className="input-icon"><CaseIcon /></span>
                  <input
                    name="position"
                    placeholder="e.g. Engineer"
                    value={formData.position}
                    onChange={handleChange}
                    className={`input-with-icon ${errors.position ? 'error' : ''}`}
                  />
                </div>
                {errors.position && <span className="error-message">{errors.position}</span>}
              </div>

              <div className="form-group">
                <label>Department</label>
                <div className="input-group-icon">
                  <span className="input-icon"><CaseIcon /></span>
                  <input
                    name="department"
                    placeholder="e.g. Engineering"
                    value={formData.department}
                    onChange={handleChange}
                    className={`input-with-icon ${errors.department ? 'error' : ''}`}
                  />
                </div>
                {errors.department && <span className="error-message">{errors.department}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Annual Salary (₹)</label>
              <div className="input-group-icon">
                <span className="input-icon"><CashIcon /></span>
                <input
                  name="salary"
                  type="number"
                  placeholder="e.g. 500000"
                  value={formData.salary}
                  onChange={handleChange}
                  className={`input-with-icon ${errors.salary ? 'error' : ''}`}
                />
              </div>
              {errors.salary && <span className="error-message">{errors.salary}</span>}
            </div>

            <div className="form-actions">
              <Button variant="secondary" onClick={() => navigate('/employees')}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : (id ? 'Save Changes' : 'Create Employee')}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default EmployeeForm;
