import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
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

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setAlert({ show: false, message: '', type: 'danger' });
    
    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      });
      
      if (result.success) {
        setAlert({ show: true, message: 'Login successful!', type: 'success' });
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setAlert({ show: true, message: result.message || 'Login failed', type: 'danger' });
      }
    } catch (error) {
      setAlert({ show: true, message: 'An error occurred during login', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthBackground theme={theme} />
      <div className="d-flex align-items-center justify-content-center" style={styles.container}>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6} lg={4}>
              <CCard style={styles.card}>
                <CCardHeader style={styles.cardHeader} className="text-center">
                  <h3 className="mb-0">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
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
                      <CFormLabel htmlFor="password">Password</CFormLabel>
                      <CFormInput
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        invalid={!!errors.password}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                      />
                      {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
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
                          Signing in...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </CButton>
                  </CForm>

                  <div className="text-center">
                    <p className="mb-2">
                      <Link to="/auth/forgot-password" style={styles.link}>
                        Forgot your password?
                      </Link>
                    </p>
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link to="/auth/register" style={styles.link}>
                        Sign up here
                      </Link>
                    </p>
                  </div>

                  <div className="mt-4 text-center">
                    <small className="text-muted">
                      Demo credentials:<br />
                      Email: admin@test.com<br />
                      Password: password
                    </small>
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

export default Login;
