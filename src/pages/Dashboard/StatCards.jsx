import React, { useContext } from 'react';
import { CCol, CRow } from '@coreui/react';
import { ThemeContext } from '../../context/ThemeContext';
import { getThemeValue } from '../../const/colorConst';
import useTranslation from '../../hooks/useTranslation';

const StatCards = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  // Apply theme to component styles
  const styles = {
    widgetCard: (color) => ({
      backgroundColor: getThemeValue(theme, 'bgCard'),
      color: getThemeValue(theme, 'textPrimary'),
      border: `1px solid ${getThemeValue(theme, 'border')}`,
      borderLeft: `4px solid ${getThemeValue(theme, color)}`,
    })
  };

  return (
    <CRow className="mb-4">
      <CCol sm={6} lg={3} className="mb-3 mb-xl-0">
        <div className="p-3" style={styles.widgetCard('primary')}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="text-medium-emphasis small text-uppercase fw-bold">{t('dashboard_total_users')}</div>
              <div className="fs-4 fw-bold">2,458</div>
              <div className="small mt-1">
                <span className="text-success fw-bold">↑ 12%</span> {t('dashboard_since_last_month')}
              </div>
            </div>
            <div className="bg-primary text-white p-2 rounded">
              <i className="bi bi-people-fill fs-3"></i>
            </div>
          </div>
        </div>
      </CCol>

      <CCol sm={6} lg={3} className="mb-3 mb-xl-0">
        <div className="p-3" style={styles.widgetCard('success')}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="text-medium-emphasis small text-uppercase fw-bold">{t('dashboard_revenue')}</div>
              <div className="fs-4 fw-bold">$86,521</div>
              <div className="small mt-1">
                <span className="text-success fw-bold">↑ 8%</span> {t('dashboard_since_last_month')}
              </div>
            </div>
            <div className="bg-success text-white p-2 rounded">
              <i className="bi bi-currency-dollar fs-3"></i>
            </div>
          </div>
        </div>
      </CCol>

      <CCol sm={6} lg={3} className="mb-3 mb-xl-0">
        <div className="p-3" style={styles.widgetCard('warning')}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="text-medium-emphasis small text-uppercase fw-bold">{t('dashboard_pending_orders')}</div>
              <div className="fs-4 fw-bold">42</div>
              <div className="small mt-1">
                <span className="text-danger fw-bold">↓ 5%</span> {t('dashboard_since_last_week')}
              </div>
            </div>
            <div className="bg-warning text-white p-2 rounded">
              <i className="bi bi-box-seam fs-3"></i>
            </div>
          </div>
        </div>
      </CCol>

      <CCol sm={6} lg={3} className="mb-3 mb-xl-0">
        <div className="p-3" style={styles.widgetCard('info')}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="text-medium-emphasis small text-uppercase fw-bold">{t('dashboard_visitors')}</div>
              <div className="fs-4 fw-bold">14,589</div>
              <div className="small mt-1">
                <span className="text-success fw-bold">↑ 18%</span> {t('dashboard_since_last_month')}
              </div>
            </div>
            <div className="bg-info text-white p-2 rounded">
              <i className="bi bi-graph-up fs-3"></i>
            </div>
          </div>
        </div>
      </CCol>
    </CRow>
  );
};

export default StatCards;
