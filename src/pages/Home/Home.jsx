import React, { useState, useContext } from 'react';
import { 
    CCard, 
    CCardHeader, 
    CCardBody, 
    CRow, 
    CCol, 
    CForm, 
    CFormInput,
    CFormLabel,
    CFormSelect,
    CButton,
    CFormCheck,
    CAlert,
    CCallout
} from '@coreui/react';
import { ThemeContext } from '../../context/ThemeContext';
import { getThemeValue } from '../../const/colorConst';
import CalendarComponent from './calender';
import useTranslation from '../../hooks/useTranslation';

// Removed Home.css import

const Home = () => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
        agreeTerms: false
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState('');

    // Apply theme to component styles
    const styles = {
        container: {
            backgroundColor: getThemeValue(theme, 'bgCard'),
            color: getThemeValue(theme, 'textPrimary'),
        },
        card: {
            backgroundColor: getThemeValue(theme, 'bgCard'),
            color: getThemeValue(theme, 'textPrimary'),
            border: `1px solid ${getThemeValue(theme, 'border')}`,
        },
        cardHeader: {
            backgroundColor: getThemeValue(theme, 'bgCard'),
            borderBottom: `1px solid ${getThemeValue(theme, 'border')}`,
        },
        statsCard: (color) => ({
            backgroundColor: getThemeValue(theme, color),
            color: getThemeValue(theme, 'white'),
        }),

        // Activity styles
        activityDot: {
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            flexShrink: 0,
        },

        activityItem: {
            borderLeft: 0,
            paddingBottom: '15px',
            position: 'relative',
        },
    };

    return (
        <div className="container-home" style={styles.container}>
            <h1 className="mb-4">{t('dashboard_overview')}</h1>
            {/* Stats Row */}
            <CRow className="mb-4">
                <CCol sm={6} lg={3} className="mb-3 mb-lg-0">
                    <div className="p-3 rounded" style={styles.statsCard('primary')}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">5,024</h5>
                                <div className="small text-light">{t('dashboard_total_users')}</div>
                            </div>
                            <i className="bi bi-people-fill fs-1"></i>
                        </div>
                    </div>
                </CCol>
                
                <CCol sm={6} lg={3} className="mb-3 mb-lg-0">
                    <div className="p-3 rounded" style={styles.statsCard('success')}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">$24,350</h5>
                                <div className="small text-light">{t('monthly_sales')}</div>
                            </div>
                            <i className="bi bi-currency-dollar fs-1"></i>
                        </div>
                    </div>
                </CCol>
                
                <CCol sm={6} lg={3} className="mb-3 mb-lg-0">
                    <div className="p-3 rounded" style={styles.statsCard('warning')}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">321</h5>
                                <div className="small text-light">{t('dashboard_pending_orders')}</div>
                            </div>
                            <i className="bi bi-hourglass-split fs-1"></i>
                        </div>
                    </div>
                </CCol>
                
                <CCol sm={6} lg={3} className="mb-3 mb-lg-0">
                    <div className="p-3 rounded" style={styles.statsCard('info')}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">78%</h5>
                                <div className="small text-light">{t('server_load')}</div>
                            </div>
                            <i className="bi bi-cpu fs-1"></i>
                        </div>
                    </div>
                </CCol>
            </CRow>
            
            {/* Main Content Row */}
        <CRow>
            {/* Calendar and Events */}
            <CCol lg={12}>
                <CalendarComponent />
            </CCol>
        </CRow>
            
            {/* Recent Activity Row */}
            <CRow>
                <CCol md={12}>
                    <CCard style={styles.card}>
                        <CCardHeader style={styles.cardHeader}>
                            <h4 className="mb-0">{t('recent_activity')}</h4>
                        </CCardHeader>
                        <CCardBody>
                            <div className="clearfix">
                                <div className="d-flex" style={styles.activityItem}>
                                    <div style={{...styles.activityDot}} className="bg-primary me-3 mt-1"></div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between">
                                            <strong>John Doe</strong>
                                            <span className="text-muted">2 hours ago</span>
                                        </div>
                                        <div>Created a new project "Admin Dashboard"</div>
                                    </div>
                                </div>
                                
                                <div className="d-flex mt-3" style={styles.activityItem}>
                                    <div style={{...styles.activityDot}} className="bg-success me-3 mt-1"></div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between">
                                            <strong>Jane Smith</strong>
                                            <span className="text-muted">5 hours ago</span>
                                        </div>
                                        <div>Completed task "Design Login Page"</div>
                                    </div>
                                </div>
                                
                                <div className="d-flex mt-3" style={styles.activityItem}>
                                    <div style={{...styles.activityDot}} className="bg-warning me-3 mt-1"></div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between">
                                            <strong>Mike Johnson</strong>
                                            <span className="text-muted">Yesterday</span>
                                        </div>
                                        <div>Added new comment on "API Integration"</div>
                                    </div>
                                </div>
                                
                                <div className="d-flex mt-3" style={styles.activityItem}>
                                    <div style={{...styles.activityDot}} className="bg-danger me-3 mt-1"></div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between">
                                            <strong>Sarah Williams</strong>
                                            <span className="text-muted">2 days ago</span>
                                        </div>
                                        <div>Reported bug in production environment</div>
                                    </div>
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
};

export default Home;