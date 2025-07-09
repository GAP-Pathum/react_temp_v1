import React, { useState, useContext, useEffect } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CCol,
  CAlert
} from '@coreui/react';
import { ThemeContext } from '../../context/ThemeContext';
import { getThemeValue } from '../../const/colorConst';
import useTranslation from '../../hooks/useTranslation';

const EditEmployeeModal = ({ visible, onClose, onSave, employee }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: '',
    status: 'Active',
    hireDate: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  // Apply theme to component styles
  const styles = {
    modal: {
      backgroundColor: getThemeValue(theme, 'bgCard'),
      color: getThemeValue(theme, 'textPrimary'),
    },
    modalHeader: {
      borderBottom: `1px solid ${getThemeValue(theme, 'border')}`,
    },
    modalFooter: {
      borderTop: `1px solid ${getThemeValue(theme, 'border')}`,
    }
  };

  const departments = [
    'Engineering',
    'Design',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Management',
    'Analytics',
    'Support'
  ];

  const statusOptions = [
    'Active',
    'On Leave',
    'Inactive'
  ];

  // Populate form data when employee prop changes
  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id,
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        phone: employee.phone || '',
        position: employee.position || '',
        department: employee.department || '',
        salary: employee.salary?.toString() || '',
        status: employee.status || 'Active',
        hireDate: employee.hireDate || ''
      });
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('employee_validation_first_name');
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('employee_validation_last_name');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('employee_validation_email');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('employee_validation_email_invalid');
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('employee_validation_phone');
    }
    
    if (!formData.position.trim()) {
      newErrors.position = t('employee_validation_position');
    }
    
    if (!formData.department) {
      newErrors.department = t('employee_validation_department');
    }
    
    if (!formData.salary || isNaN(formData.salary) || formData.salary <= 0) {
      newErrors.salary = t('employee_validation_salary');
    }
    
    if (!formData.hireDate) {
      newErrors.hireDate = t('employee_validation_hire_date');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        salary: parseInt(formData.salary)
      });
      handleClose();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleClose = () => {
    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      salary: '',
      status: 'Active',
      hireDate: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <>
      {showAlert && (
        <CAlert color="success" className="position-fixed" style={{ top: '20px', right: '20px', zIndex: 9999 }}>
          {t('employee_updated_success')}
        </CAlert>
      )}
      
      <CModal visible={visible} onClose={handleClose} size="lg">
        <CModalHeader style={styles.modalHeader}>
          <CModalTitle>
            <i className="bi bi-person-gear me-2"></i>
            {t('employee_edit_employee')}
          </CModalTitle>
        </CModalHeader>
        
        <CModalBody style={styles.modal}>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="firstName">{t('employee_first_name')} *</CFormLabel>
                <CFormInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  invalid={!!errors.firstName}
                  placeholder={t('employee_first_name')}
                />
                {errors.firstName && <div className="invalid-feedback d-block">{errors.firstName}</div>}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="lastName">{t('employee_last_name')} *</CFormLabel>
                <CFormInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  invalid={!!errors.lastName}
                  placeholder={t('employee_last_name')}
                />
                {errors.lastName && <div className="invalid-feedback d-block">{errors.lastName}</div>}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="email">{t('employee_email')} *</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  invalid={!!errors.email}
                  placeholder={t('employee_email')}
                />
                {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="phone">{t('employee_phone')} *</CFormLabel>
                <CFormInput
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  invalid={!!errors.phone}
                  placeholder={t('employee_phone')}
                />
                {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="position">{t('employee_position')} *</CFormLabel>
                <CFormInput
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  invalid={!!errors.position}
                  placeholder={t('employee_position')}
                />
                {errors.position && <div className="invalid-feedback d-block">{errors.position}</div>}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="department">{t('employee_department')} *</CFormLabel>
                <CFormSelect
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  invalid={!!errors.department}
                >
                  <option value="">{t('employee_select_department')}</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </CFormSelect>
                {errors.department && <div className="invalid-feedback d-block">{errors.department}</div>}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={4}>
                <CFormLabel htmlFor="salary">{t('employee_salary')} *</CFormLabel>
                <CFormInput
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  invalid={!!errors.salary}
                  placeholder={t('employee_salary')}
                  min="0"
                  step="1000"
                />
                {errors.salary && <div className="invalid-feedback d-block">{errors.salary}</div>}
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="status">{t('employee_status')}</CFormLabel>
                <CFormSelect
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">{t('employee_active')}</option>
                  <option value="On Leave">{t('employee_on_leave')}</option>
                  <option value="Inactive">{t('employee_inactive')}</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="hireDate">{t('employee_hire_date')} *</CFormLabel>
                <CFormInput
                  type="date"
                  id="hireDate"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleInputChange}
                  invalid={!!errors.hireDate}
                />
                {errors.hireDate && <div className="invalid-feedback d-block">{errors.hireDate}</div>}
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        
        <CModalFooter style={styles.modalFooter}>
          <CButton color="secondary" onClick={handleClose}>
            {t('employee_cancel')}
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            <i className="bi bi-check-circle me-2"></i>
            {t('employee_update')}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default EditEmployeeModal;
