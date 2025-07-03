import React, { useContext } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CProgress
} from '@coreui/react';
import { ThemeContext } from '../../context/ThemeContext';
import { getThemeValue } from '../../const/colorConst';

const TaskProgress = () => {
  const { theme } = useContext(ThemeContext);
  
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
    }
  };

  // Sample tasks with progress data
  const tasks = [
    { name: 'Website Redesign', progress: 75, color: 'success' },
    { name: 'Mobile App Development', progress: 40, color: 'primary' },
    { name: 'Database Migration', progress: 90, color: 'success' },
    { name: 'API Integration', progress: 30, color: 'warning' },
    { name: 'Security Audit', progress: 15, color: 'danger' }
  ];

  return (
    <CCard style={styles.card}>
      <CCardHeader style={styles.cardHeader}>
        <h5 className="mb-0">Current Tasks</h5>
      </CCardHeader>
      <CCardBody>
        <CListGroup>
          {tasks.map((task, index) => (
            <CListGroupItem key={index} style={styles.card} className="mb-2 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <strong>{task.name}</strong>
                <span>{task.progress}%</span>
              </div>
              <CProgress thin color={task.color} value={task.progress} />
            </CListGroupItem>
          ))}
        </CListGroup>
      </CCardBody>
    </CCard>
  );
};

export default TaskProgress;
