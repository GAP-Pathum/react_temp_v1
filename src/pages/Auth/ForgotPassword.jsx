import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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

const ForgotPassword = () => {
  const { theme } = useContext(ThemeContext);
  const { forgotPassword } = useAuth();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'danger' });
  const [emailSent, setEmailSent] = useState(false);

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
      backgroundColor: getThemeValue(theme, 'warning'),
      color: 'white',
      border: 'none',
    },
    link: {
      color: getThemeValue(theme, 'primary'),
      textDecoration: 'none',
    }
  };

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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
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
      const result = await forgotPassword(formData.email);
      
      if (result.success) {
        setEmailSent(true);
        setAlert({ show: true, message: result.message, type: 'success' });
      } else {
        setAlert({ show: true, message: result.message || 'Failed to send reset email', type: 'danger' });
      }
    } catch (error) {
      setAlert({ show: true, message: 'An error occurred while sending reset email', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    setAlert({ show: false, message: '', type: 'danger' });
    
    try {
      const result = await forgotPassword(formData.email);
      
      if (result.success) {
        setAlert({ show: true, message: 'Reset email resent successfully', type: 'success' });
      } else {
        setAlert({ show: true, message: result.message || 'Failed to resend reset email', type: 'danger' });
      }
    } catch (error) {
      setAlert({ show: true, message: 'An error occurred while resending reset email', type: 'danger' });
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
                  <i className="bi bi-key me-2"></i>
                  Forgot Password
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

                {!emailSent ? (
                  <>
                    <div className="text-center mb-4">
                      <p className="text-muted">
                        Enter your email address and we'll send you a link to reset your password.
                      </p>
                    </div>

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

                      <CButton 
                        type="submit" 
                        color="warning" 
                        className="w-100 mb-3"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <CSpinner size="sm" className="me-2" />
                            Sending Reset Email...
                          </>
                        ) : (
                          'Send Reset Email'
                        )}
                      </CButton>
                    </CForm>
                  </>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      <i className="bi bi-envelope-check-fill text-success" style={{ fontSize: '3rem' }}></i>
                      <h5 className="mt-3">Email Sent!</h5>
                      <p className="text-muted">
                        We've sent a password reset link to <strong>{formData.email}</strong>.
                        Please check your email and follow the instructions to reset your password.
                      </p>
                    </div>

                    <CButton 
                      color="outline-warning" 
                      className="w-100 mb-3"
                      onClick={handleResendEmail}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <CSpinner size="sm" className="me-2" />
                          Resending...
                        </>
                      ) : (
                        'Resend Email'
                      )}
                    </CButton>
                  </>
                )}

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
                    If you don't receive the email within a few minutes, check your spam folder.
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

export default ForgotPassword;
