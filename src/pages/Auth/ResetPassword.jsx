import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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

const ResetPassword = () => {
  const { theme } = useContext(ThemeContext);
  const { resetPassword } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'danger' });
  const [token, setToken] = useState('');
  const [validToken, setValidToken] = useState(true);

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
      backgroundColor: getThemeValue(theme, 'success'),
      color: 'white',
      border: 'none',
    },
    link: {
      color: getThemeValue(theme, 'primary'),
      textDecoration: 'none',
    }
  };

  useEffect(() => {
    // Get token from URL params
    const resetToken = searchParams.get('token');
    if (resetToken) {
      setToken(resetToken);
      // In a real app, you'd validate the token here
      // For demo purposes, we'll assume it's valid
      setValidToken(true);
    } else {
      setValidToken(false);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setAlert({ show: false, message: '', type: 'danger' });
    
    try {
      const result = await resetPassword(token, formData.password);
      
      if (result.success) {
        setAlert({ show: true, message: result.message, type: 'success' });
        setTimeout(() => {
          navigate('/auth/login');
        }, 2000);
      } else {
        setAlert({ show: true, message: result.message || 'Failed to reset password', type: 'danger' });
      }
    } catch (error) {
      setAlert({ show: true, message: 'An error occurred while resetting password', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  if (!validToken) {
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
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Invalid Token
                    </h3>
                  </CCardHeader>
                  <CCardBody className="p-4 text-center">
                    <p className="text-muted">
                      The password reset token is invalid or has expired.
                    </p>
                    <Link to="/auth/forgot-password" className="btn btn-warning">
                      Request New Reset Link
                    </Link>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </>
    );
  }

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
                  <i className="bi bi-shield-lock me-2"></i>
                  Reset Password
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

                <div className="text-center mb-4">
                  <p className="text-muted">
                    Enter your new password below to reset your account password.
                  </p>
                </div>

                <CForm onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <CFormLabel htmlFor="password">New Password</CFormLabel>
                    <CFormInput
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      invalid={!!errors.password}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />
                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                  </div>

                  <div className="mb-3">
                    <CFormLabel htmlFor="confirmPassword">Confirm New Password</CFormLabel>
                    <CFormInput
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      invalid={!!errors.confirmPassword}
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                    />
                    {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                  </div>

                  <CButton 
                    type="submit" 
                    color="success" 
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <CSpinner size="sm" className="me-2" />
                        Resetting Password...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </CButton>
                </CForm>

                <div className="text-center">
                  <p className="mb-0">
                    Remember your password?{' '}
                    <Link to="/auth/login" style={styles.link}>
                      Sign in here
                    </Link>
                  </p>
                </div>

                <div className="mt-3 text-center">
                  <small className="text-muted">
                    Your password must be at least 6 characters long.
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

export default ResetPassword;
