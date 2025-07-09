import React, { useContext } from 'react';
import { 
    CCard, 
    CCardHeader, 
    CCardBody 
} from '@coreui/react';
import { ThemeContext } from '../../context/ThemeContext';
import { getThemeValue } from '../../const/colorConst';
import useTranslation from '../../hooks/useTranslation';

const RecentActivities = () => {
    const { theme } = useContext(ThemeContext);
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

    // Sample activity data
    const activities = [
        {
            user: 'John Doe',
            time: '2 hours ago',
            action: 'Created a new project "Admin Dashboard"',
            color: 'primary'
        },
        {
            user: 'Jane Smith',
            time: '5 hours ago',
            action: 'Completed task "Design Login Page"',
            color: 'success'
        },
        {
            user: 'Mike Johnson',
            time: 'Yesterday',
            action: 'Added new comment on "API Integration"',
            color: 'warning'
        },
        {
            user: 'Sarah Williams',
            time: '2 days ago',
            action: 'Reported bug in production environment',
            color: 'danger'
        }
    ];

    return (
        <CCard style={styles.card}>
            <CCardHeader style={styles.cardHeader}>
                <h4 className="mb-0">{t('recent_activity')}</h4>
            </CCardHeader>
            <CCardBody>
                <div className="clearfix">
                    {activities.map((activity, index) => (
                        <div key={index} className={`d-flex ${index > 0 ? 'mt-3' : ''}`} style={styles.activityItem}>
                            <div style={{...styles.activityDot}} className={`bg-${activity.color} me-3 mt-1`}></div>
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between">
                                    <strong>{activity.user}</strong>
                                    <span className="text-muted">{activity.time}</span>
                                </div>
                                <div>{activity.action}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </CCardBody>
        </CCard>
    );
};

export default RecentActivities;
