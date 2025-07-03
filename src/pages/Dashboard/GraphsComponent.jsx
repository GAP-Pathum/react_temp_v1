import React, { useContext } from 'react';
import { 
    CCard, 
    CCardHeader, 
    CCardBody, 
    CRow,
    CCol
} from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';
import { ThemeContext } from '../../context/ThemeContext';
import { getThemeValue } from '../../const/colorConst';

const GraphsComponent = () => {
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

    // Get theme specific colors for charts
    const primaryColor = getThemeValue(theme, 'primary');
    const secondaryColor = getThemeValue(theme, 'secondary');
    const infoColor = getThemeValue(theme, 'info');
    const warningColor = getThemeValue(theme, 'warning');
    const successColor = getThemeValue(theme, 'success');
    const dangerColor = getThemeValue(theme, 'danger');
    
    // Text color for labels
    const textColor = getThemeValue(theme, 'textPrimary');
    const gridColor = getThemeValue(theme, 'border');

    return (
        <CCard style={styles.card}>
            <CCardHeader style={styles.cardHeader}>
                <h4 className="mb-0">Charts and Graphs</h4>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    {/* Line chart */}
                    <CCol lg={6} className="mb-4">
                        <div className="mb-3">
                            <h5>Monthly Sales Performance</h5>
                            <p className="text-muted small">Revenue trends over the past 6 months</p>
                        </div>
                        <CChart
                            type="line"
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                                datasets: [
                                    {
                                        label: 'Sales',
                                        backgroundColor: 'rgba(255, 118, 0, 0.1)',
                                        borderColor: primaryColor,
                                        pointBackgroundColor: primaryColor,
                                        pointBorderColor: '#fff',
                                        data: [12500, 14800, 13200, 16500, 19000, 22300]
                                    },
                                    {
                                        label: 'Expenses',
                                        backgroundColor: 'rgba(23, 162, 184, 0.1)',
                                        borderColor: infoColor,
                                        pointBackgroundColor: infoColor,
                                        pointBorderColor: '#fff',
                                        data: [8500, 9200, 8900, 9800, 10200, 11500]
                                    }
                                ]
                            }}
                            options={{
                                maintainAspectRatio: true,
                                plugins: {
                                    legend: {
                                        display: true,
                                        labels: {
                                            color: textColor
                                        }
                                    }
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            color: gridColor
                                        },
                                        ticks: {
                                            color: textColor
                                        }
                                    },
                                    y: {
                                        grid: {
                                            color: gridColor
                                        },
                                        ticks: {
                                            color: textColor,
                                            callback: (value) => '$' + value
                                        }
                                    }
                                }
                            }}
                        />
                    </CCol>

                    {/* Pie chart */}
                    <CCol lg={6} className="mb-4">
                        <div className="mb-3">
                            <h5>Revenue Distribution</h5>
                            <p className="text-muted small">Revenue by product category</p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <CChart
                                type="doughnut"
                                data={{
                                    labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Others'],
                                    datasets: [
                                        {
                                            backgroundColor: [primaryColor, infoColor, warningColor, successColor, dangerColor],
                                            data: [35, 25, 20, 15, 5]
                                        }
                                    ]
                                }}
                                options={{
                                    maintainAspectRatio: true,
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                color: textColor
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </CCol>
                </CRow>

                {/* Bar chart */}
                <CRow>
                    <CCol lg={12}>
                        <div className="mb-3">
                            <h5>User Engagement</h5>
                            <p className="text-muted small">Weekly active users by platform</p>
                        </div>
                        <CChart
                            type="bar"
                            data={{
                                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                                datasets: [
                                    {
                                        label: 'Desktop',
                                        backgroundColor: primaryColor,
                                        data: [42, 58, 66, 75]
                                    },
                                    {
                                        label: 'Mobile',
                                        backgroundColor: successColor,
                                        data: [88, 92, 97, 102]
                                    },
                                    {
                                        label: 'Tablet',
                                        backgroundColor: warningColor,
                                        data: [23, 25, 28, 32]
                                    }
                                ]
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: textColor
                                        }
                                    }
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            color: gridColor
                                        },
                                        ticks: {
                                            color: textColor
                                        }
                                    },
                                    y: {
                                        grid: {
                                            color: gridColor
                                        },
                                        ticks: {
                                            color: textColor
                                        }
                                    }
                                }
                            }}
                        />
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
};

export default GraphsComponent;
