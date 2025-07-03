import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { LanguageContext, languages } from '../../context/LanguageContext';
import { getThemeValue } from '../../const/colorConst';
import { CForm, CFormSwitch, CCard, CCardHeader, CCardBody, CRow, CCol, CFormSelect } from '@coreui/react';
import useTranslation from '../../hooks/useTranslation';

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, changeLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

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
    }
  };

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div style={styles.container} className="p-2 ">
      <h1 className="mb-3">{t('settings_title')}</h1>

      <CRow>
        <CCol md={6}>
          <CCard style={styles.card} className="mb-4">
            <CCardHeader style={styles.cardHeader}>
              <h4 className="mb-0">{t('settings_appearance')}</h4>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <label htmlFor="darkModeSwitch" className="form-label mb-0">
                    <strong>{t('settings_dark_mode')}</strong>
                    <p className="text-muted small mb-0">
                      {t('settings_dark_mode_desc')}
                    </p>
                  </label>
                  <CFormSwitch
                    id="darkModeSwitch"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    size="lg"
                  />
                </div>

                <div>
                  <label htmlFor="languageSelect" className="form-label">
                    <strong>{t('settings_language')}</strong>
                    <p className="text-muted small mb-2">
                      {t('settings_language_desc')}
                    </p>
                  </label>
                  <CFormSelect
                    id="languageSelect"
                    aria-label="Language Select"
                    value={language}
                    onChange={handleLanguageChange}
                  >
                    <option value="en">{t('settings_english')}</option>
                    <option value="si">{t('settings_sinhala')}</option>
                  </CFormSelect>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard style={styles.card} className="mb-4">
            <CCardHeader style={styles.cardHeader}>
              <h4 className="mb-0">{t('settings_user_preferences')}</h4>
            </CCardHeader>
            <CCardBody>
              <p className="text-muted mb-0">{t('settings_user_preferences_desc')}</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol md={12}>
          <CCard style={styles.card}>
            <CCardHeader style={styles.cardHeader}>
              <h4 className="mb-0">{t('settings_theme_preview')}</h4>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md={4}>
                  <div className="p-3 rounded" style={{ backgroundColor: getThemeValue(theme, 'primary'), color: getThemeValue(theme, 'white') }}>
                    {t('settings_primary_color')}
                  </div>
                </CCol>
                <CCol md={4}>
                  <div className="p-3 rounded" style={{ backgroundColor: getThemeValue(theme, 'secondary'), color: getThemeValue(theme, 'white') }}>
                    {t('settings_secondary_color')}
                  </div>
                </CCol>
                <CCol md={4}>
                  <div className="p-3 rounded" style={{ backgroundColor: getThemeValue(theme, 'bgCard'), color: getThemeValue(theme, 'textPrimary'), border: `1px solid ${getThemeValue(theme, 'border')}` }}>
                    {t('settings_background_color')}
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Settings;