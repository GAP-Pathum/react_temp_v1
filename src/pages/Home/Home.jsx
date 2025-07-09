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
import RecentActivities from './RecentActivities';
import useTranslation from '../../hooks/useTranslation';
import { useAuth } from '../../context/AuthContext';

// Removed Home.css import

const Home = () => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'admin',
        agreeTerms: false
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState('');

    // Apply theme to component styles
    const styles = {
        container: {
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
    };

    return (
        <div className="container-home p-3" style={styles.container}>
            <h1 className="mb-2">{t('welcome')}{user?.name ? user.name + '!' : '!'}</h1>
            {/* Stats Row */}
            <CRow className="mb-2">
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
            <CRow className="mb-2">
                {/* Calendar and Events */}
                <CCol lg={12}>
                    <CalendarComponent />
                </CCol>
            </CRow>

            {/* Recent Activity Row */}
            <CRow>
                <CCol md={12}>
                    <RecentActivities />
                </CCol>
            </CRow>
        </div>
    );
};

export default Home;