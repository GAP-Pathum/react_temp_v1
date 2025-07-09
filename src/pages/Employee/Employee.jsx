import React, { useState, useContext } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CButtonGroup,
  CRow,
  CCol,
  CFormInput,
  CBadge,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CPagination,
  CPaginationItem
} from '@coreui/react';
import { ThemeContext } from '../../context/ThemeContext';
import { getThemeValue } from '../../const/colorConst';
import useTranslation from '../../hooks/useTranslation';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';

const Employee = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
  };

  // Sample employee data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Developer',
      department: 'Engineering',
      salary: 85000,
      status: 'Active',
      hireDate: '2022-01-15',
      avatar: 'https://via.placeholder.com/40x40?text=JD'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 234-5678',
      position: 'UI/UX Designer',
      department: 'Design',
      salary: 75000,
      status: 'Active',
      hireDate: '2021-06-20',
      avatar: 'https://via.placeholder.com/40x40?text=JS'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@company.com',
      phone: '+1 (555) 345-6789',
      position: 'Project Manager',
      department: 'Management',
      salary: 90000,
      status: 'Active',
      hireDate: '2020-03-10',
      avatar: 'https://via.placeholder.com/40x40?text=MJ'
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah.williams@company.com',
      phone: '+1 (555) 456-7890',
      position: 'Marketing Specialist',
      department: 'Marketing',
      salary: 65000,
      status: 'On Leave',
      hireDate: '2023-02-28',
      avatar: 'https://via.placeholder.com/40x40?text=SW'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@company.com',
      phone: '+1 (555) 567-8901',
      position: 'Data Analyst',
      department: 'Analytics',
      salary: 70000,
      status: 'Inactive',
      hireDate: '2021-11-05',
      avatar: 'https://via.placeholder.com/40x40?text=DB'
    }
  ]);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  // Handle employee actions
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleDelete = (employeeId) => {
    if (window.confirm(t('employee_delete_confirm'))) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
    }
  };

  const handleAddEmployee = (newEmployee) => {
    const employee = {
      ...newEmployee,
      id: Math.max(...employees.map(e => e.id)) + 1,
      avatar: `https://via.placeholder.com/40x40?text=${newEmployee.firstName[0]}${newEmployee.lastName[0]}`
    };
    setEmployees([...employees, employee]);
    setShowAddModal(false);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    setShowEditModal(false);
    setSelectedEmployee(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <CBadge color="success">{status}</CBadge>;
      case 'On Leave':
        return <CBadge color="warning">{status}</CBadge>;
      case 'Inactive':
        return <CBadge color="secondary">{status}</CBadge>;
      default:
        return <CBadge color="primary">{status}</CBadge>;
    }
  };

  return (
    <div style={styles.container} className="p-3">
      <CRow className="mb-4">
        <CCol>
          <h1 className="mb-0">{t('employee_management')}</h1>
          <p className="text-muted">{t('employee_manage_desc')}</p>
        </CCol>
      </CRow>

      <CCard style={styles.card}>
        <CCardHeader style={styles.cardHeader}>
          <CRow className="align-items-center">
            <CCol md={6}>
              <h4 className="mb-0">
                <i className="bi bi-people-fill me-2"></i>
                {t('employee_directory')}
              </h4>
            </CCol>
            <CCol md={6} className="text-end">
              <CButton 
                color="primary" 
                onClick={() => setShowAddModal(true)}
              >
                <i className="bi bi-plus-circle me-2"></i>
                {t('employee_add')}
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          {/* Search and Filter Controls */}
          <CRow className="mb-4">
            <CCol md={6}>
              <CFormInput
                type="text"
                placeholder={t('employee_search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CCol>
            <CCol md={6} className="text-end">
              <span className="text-muted">
                {t('employee_showing')} {paginatedEmployees.length} {t('employee_of')} {filteredEmployees.length} {t('employee_employees')}
              </span>
            </CCol>
          </CRow>

          {/* Employee Table */}
          <CTable hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>{t('employee_name')}</CTableHeaderCell>
                <CTableHeaderCell>{t('employee_contact')}</CTableHeaderCell>
                <CTableHeaderCell>{t('employee_position')}</CTableHeaderCell>
                <CTableHeaderCell>{t('employee_department')}</CTableHeaderCell>
                <CTableHeaderCell>{t('employee_salary')}</CTableHeaderCell>
                <CTableHeaderCell>{t('employee_status')}</CTableHeaderCell>
                <CTableHeaderCell>{t('employee_hire_date')}</CTableHeaderCell>
                <CTableHeaderCell>{t('employee_actions')}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {paginatedEmployees.map((employee) => (
                <CTableRow key={employee.id}>
                  <CTableDataCell>
                    <div className="d-flex align-items-center">
                      <img
                        src={employee.avatar}
                        alt={`${employee.firstName} ${employee.lastName}`}
                        className="rounded-circle me-3"
                        style={{ width: '40px', height: '40px' }}
                      />
                      <div>
                        <div className="fw-semibold">
                          {employee.firstName} {employee.lastName}
                        </div>
                        <div className="text-muted small">{t('employee_id')}: {employee.id}</div>
                      </div>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>
                      <div className="small">
                        <i className="bi bi-envelope me-1"></i>
                        {employee.email}
                      </div>
                      <div className="small text-muted">
                        <i className="bi bi-telephone me-1"></i>
                        {employee.phone}
                      </div>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>{employee.position}</CTableDataCell>
                  <CTableDataCell>{employee.department}</CTableDataCell>
                  <CTableDataCell>${employee.salary.toLocaleString()}</CTableDataCell>
                  <CTableDataCell>{getStatusBadge(employee.status)}</CTableDataCell>
                  <CTableDataCell>{new Date(employee.hireDate).toLocaleDateString()}</CTableDataCell>
                  <CTableDataCell>
                    <CButtonGroup size="sm">
                      <CButton
                        color="info"
                        variant="outline"
                        onClick={() => handleEdit(employee)}
                      >
                        <i className="bi bi-pencil"></i>
                      </CButton>
                      <CButton
                        color="danger"
                        variant="outline"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </CButton>
                    </CButtonGroup>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <CPagination>
                <CPaginationItem
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  {t('employee_previous')}
                </CPaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <CPaginationItem
                    key={index + 1}
                    active={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </CPaginationItem>
                ))}
                <CPaginationItem
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  {t('employee_next')}
                </CPaginationItem>
              </CPagination>
            </div>
          )}
        </CCardBody>
      </CCard>

      {/* Modals */}
      <AddEmployeeModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddEmployee}
      />
      
      <EditEmployeeModal
        visible={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedEmployee(null);
        }}
        onSave={handleUpdateEmployee}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default Employee;