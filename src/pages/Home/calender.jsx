import { useState, useContext } from 'react';
import {
    CCard,
    CRow,
    CCol,
    CCardHeader,
    CCardBody,
    CCallout
} from '@coreui/react';
import { ThemeContext } from '../../context/ThemeContext';
import { getThemeValue } from '../../const/colorConst';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useTranslation from '../../hooks/useTranslation';

const CalendarComponent = ({ className = "" }) => {
    const { theme } = useContext(ThemeContext);
    const [date, setDate] = useState(new Date());
    const { t } = useTranslation();

    // Apply theme to component styles
    const styles = {
        card: {
            backgroundColor: getThemeValue(theme, 'bgCard'),
            color: getThemeValue(theme, 'textPrimary'),
            border: `1px solid ${getThemeValue(theme, 'border')}`,
        },
        cardHeader: {
            backgroundColor: getThemeValue(theme, 'bgCard'),
            borderBottom: `1px solid ${getThemeValue(theme, 'border')}`,
        },
        calendarContainer: {
            backgroundColor: getThemeValue(theme, 'bgCard'),
            color: getThemeValue(theme, 'textPrimary'),
            border: `1px solid ${getThemeValue(theme, 'border')}`,
            padding: '1rem',
            borderRadius: '0.25rem',
            overflow: 'hidden'
        },
        calendarDot: {
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            flexShrink: 0,
        }
    };

    return (
        <div className={`calendar-wrapper ${className}`}>
            <CCard style={styles.card}>
                <CCardHeader style={styles.cardHeader}>
                    <h4 className="mb-0">{t('calendar_events')}</h4>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol md={6}>
                            <div style={styles.calendarContainer} className="rounded mb-4 mb-md-0">
                                <Calendar
                                    onChange={setDate}
                                    value={date}
                                    className={`w-100 border-0`}
                                    style={{
                                        backgroundColor: theme === 'dark' ? '#343A40' : '#fff',
                                        color: theme === 'dark' ? '#F8F9FA' : '#212529',
                                    }}
                                />
                            </div>
                        </CCol>
                        <CCol md={6}>
                            <div className="mt-4 mt-md-0">
                                <h5>{t('upcoming_events')}</h5>
                                <CCallout color="info" className="d-flex align-items-center mb-2">
                                    <div style={{ ...styles.calendarDot }} className="bg-info me-2"></div>
                                    <div>
                                        <div className="fw-bold">{t('team_meeting')}</div>
                                        <div className="small">{t('today')}, 2:00 PM</div>
                                    </div>
                                </CCallout>
                                <CCallout color="danger" className="d-flex align-items-center mb-2">
                                    <div style={{ ...styles.calendarDot }} className="bg-danger me-2"></div>
                                    <div>
                                        <div className="fw-bold">{t('project_deadline')}</div>
                                        <div className="small">{t('tomorrow')}, 5:00 PM</div>
                                    </div>
                                </CCallout>
                                <CCallout color="success" className="d-flex align-items-center">
                                    <div style={{ ...styles.calendarDot }} className="bg-success me-2"></div>
                                    <div>
                                        <div className="fw-bold">{t('product_launch')}</div>
                                        <div className="small">Oct 15, 10:00 AM</div>
                                    </div>
                                </CCallout>
                            </div>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </div>
    );
};

// Simple error boundary for CalendarComponent
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can log error info here if needed
        // console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', color: 'red' }}>
                    <h2>Something went wrong.</h2>
                    <pre>{this.state.error && this.state.error.toString()}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

const CalendarComponentWithBoundary = (props) => (
    <ErrorBoundary>
        <CalendarComponent {...props} />
    </ErrorBoundary>
);

export default CalendarComponentWithBoundary;
