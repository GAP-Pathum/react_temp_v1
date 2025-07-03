import React from 'react';
import {
  CCol,
  CRow
} from '@coreui/react';
import GraphsComponent from './GraphsComponent';
import StatCards from './StatCards';
import RecentOrders from './RecentOrders';
import TaskProgress from './TaskProgress';
import useTranslation from '../../hooks/useTranslation';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="mb-4">{t('dashboard_overview')}</h1>
      
      {/* Stats Cards */}
      <StatCards />

      {/* Graphs Section */}
      <CRow className="mb-4">
        <CCol md={12}>
          <GraphsComponent />
        </CCol>
      </CRow>
      
      {/* Recent Orders and Tasks */}
      <CRow>
        {/* Recent Orders Table */}
        <CCol lg={8} className="mb-4">
          <RecentOrders />
        </CCol>
        
        {/* Task Progress */}
        <CCol lg={4}>
          <TaskProgress />
        </CCol>
      </CRow>
    </div>
  );
};

export default Dashboard;