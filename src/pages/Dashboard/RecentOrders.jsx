import React, { useContext } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CBadge
} from '@coreui/react';
import { ThemeContext } from '../../context/ThemeContext';
import { getThemeValue } from '../../const/colorConst';

const RecentOrders = () => {
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
    },
    tableContainer: {
      backgroundColor: getThemeValue(theme, 'bgCard'),
      color: getThemeValue(theme, 'textPrimary'),
      border: `1px solid ${getThemeValue(theme, 'border')}`,
    }
  };

  // Get order status badge color
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Processing':
        return 'primary';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  // Sample data for recent orders
  const recentOrders = [
    { id: '#ORD-2458', customer: 'John Smith', date: '28 Jun 2025', amount: '$845.00', status: 'Completed' },
    { id: '#ORD-2457', customer: 'Alice Johnson', date: '27 Jun 2025', amount: '$1,245.00', status: 'Processing' },
    { id: '#ORD-2456', customer: 'Robert Williams', date: '26 Jun 2025', amount: '$395.50', status: 'Completed' },
    { id: '#ORD-2455', customer: 'Emma Brown', date: '25 Jun 2025', amount: '$129.99', status: 'Pending' },
    { id: '#ORD-2454', customer: 'Michael Lee', date: '25 Jun 2025', amount: '$540.00', status: 'Cancelled' },
  ];

  return (
    <CCard style={styles.card}>
      <CCardHeader style={styles.cardHeader}>
        <h5 className="mb-0">Recent Orders</h5>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive style={styles.tableContainer}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.amount}</td>
                <td>
                  <CBadge color={getBadgeColor(order.status)}>
                    {order.status}
                  </CBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default RecentOrders;
