import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
  CAlert,
  CSpinner,
  CRow,
  CCol,
  CContainer
} from '@coreui/react';
import { ThemeContext } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { getThemeValue } from '../../const/colorConst';
import useTranslation from '../../hooks/useTranslation';
import AuthBackground from './components/authbg.jsx';

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const { register } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'danger' });

  // Apply theme to component styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${getThemeValue(theme, 'primary')}20, ${getThemeValue(theme, 'secondary')}20)`,
      color: getThemeValue(theme, 'textPrimary'),
    },
    card: {
      backgroundColor: getThemeValue(theme, 'bgCard'),
      color: getThemeValue(theme, 'textPrimary'),
      border: `1px solid ${getThemeValue(theme, 'border')}`,
      boxShadow: theme === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    cardHeader: {
      backgroundColor: getThemeValue(theme, 'primary'),
      color: 'white',
      border: 'none',
    },
    link: {
      color: getThemeValue(theme, 'primary'),
      textDecoration: 'none',
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setAlert({ show: false, message: '', type: 'danger' });
    
    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role
      });
      
      if (result.success) {
        setAlert({ show: true, message: 'Registration successful!', type: 'success' });
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setAlert({ show: true, message: result.message || 'Registration failed', type: 'danger' });
      }
    } catch (error) {
      setAlert({ show: true, message: 'An error occurred during registration', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthBackground theme={theme} />
      <div className="d-flex align-items-center justify-content-center py-4" style={styles.container}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} lg={6}>
            <CCard style={styles.card}>
              <CCardHeader style={styles.cardHeader} className="text-center">
                <h3 className="mb-0">
                  <i className="bi bi-person-plus me-2"></i>
                  Create Account
                </h3>
              </CCardHeader>
              <CCardBody className="p-4">
                {alert.show && (
                  <CAlert 
                    color={alert.type} 
                    dismissible 
                    onClose={() => setAlert({ show: false, message: '', type: 'danger' })}
                  >
                    {alert.message}
                  </CAlert>
                )}

                <CForm onSubmit={handleSubmit}>
                  <CRow className="mb-3">
                    <CCol md={6}>
                      <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                      <CFormInput
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        invalid={!!errors.firstName}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && <div className="invalid-feedback d-block">{errors.firstName}</div>}
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                      <CFormInput
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        invalid={!!errors.lastName}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && <div className="invalid-feedback d-block">{errors.lastName}</div>}
                    </CCol>
                  </CRow>

                  <div className="mb-3">
                    <CFormLabel htmlFor="email">Email Address</CFormLabel>
                    <CFormInput
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      invalid={!!errors.email}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <CFormLabel htmlFor="phone">Phone Number</CFormLabel>
                    <CFormInput
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      invalid={!!errors.phone}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                  </div>

                  <CRow className="mb-3">
                    <CCol md={6}>
                      <CFormLabel htmlFor="password">Password</CFormLabel>
                      <CFormInput
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        invalid={!!errors.password}
                        placeholder="Enter password"
                        autoComplete="new-password"
                      />
                      {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="confirmPassword">Confirm Password</CFormLabel>
                      <CFormInput
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        invalid={!!errors.confirmPassword}
                        placeholder="Confirm password"
                        autoComplete="new-password"
                      />
                      {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                    </CCol>
                  </CRow>

                  <div className="mb-3">
                    <CFormLabel htmlFor="role">Role</CFormLabel>
                    <CFormSelect
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                    </CFormSelect>
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="agreeTerms">
                      I agree to the{' '}
                      <Link to="/terms" style={styles.link}>
                        Terms and Conditions
                      </Link>
                    </label>
                    {errors.agreeTerms && <div className="invalid-feedback d-block">{errors.agreeTerms}</div>}
                  </div>

                  <CButton 
                    type="submit" 
                    color="primary" 
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <CSpinner size="sm" className="me-2" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </CButton>
                </CForm>

                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link to="/auth/login" style={styles.link}>
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      </div>
    </>
  );
};

export default Register;
