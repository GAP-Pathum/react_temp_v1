import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getThemeValue } from '../const/colorConst';
import useTranslation from '../hooks/useTranslation';

function Header({ sidebarCollapsed, onToggleSidebar, isMobile }) {
    const { theme } = useContext(ThemeContext);
    const { user, logout } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    // Fallback user data if auth context is not available
    const displayUser = user || { name: 'Guest', avatar: 'G' };

    // Apply theme to component styles
    const styles = {
        header: {
            backgroundColor: getThemeValue(theme, 'bgHeader'),
            color: getThemeValue(theme, 'textPrimary'),
            borderBottom: `1px solid ${getThemeValue(theme, 'border')}`,
        },
        button: {
            backgroundColor: theme === 'dark' ? getThemeValue(theme, 'bgCard') : '',
            color: getThemeValue(theme, 'textPrimary'),
            borderColor: getThemeValue(theme, 'border'),
        },
        avatar: {
            backgroundColor: theme === 'dark' ? getThemeValue(theme, 'bgCard') : '',
            color: getThemeValue(theme, 'textPrimary'),
            border: `1px solid ${getThemeValue(theme, 'border')}`,
        }
    };

    return (
        <header className="header d-flex justify-content-between align-items-center p-3 rounded" style={styles.header}>
            <div className="d-flex align-items-center">
                {isMobile && (
                    <button 
                        className="btn btn-sm btn-outline-secondary me-2" 
                        onClick={onToggleSidebar}
                        style={styles.button}
                    >
                        <i className={`bi ${sidebarCollapsed ? 'bi-list' : 'bi-x'}`}></i>
                    </button>
                )}
                <span>Home / Dashboard</span>
            </div>
            
            <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                    <span>🔔</span>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
                </div>
                
                <span className="d-none d-md-inline">{displayUser.name}</span>
                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                    style={{ ...styles.avatar, width: '30px', height: '30px' }}>
                    {displayUser.avatar}
                </div>
                
                <button 
                    className="btn btn-primary btn-sm d-none d-md-block"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <button 
                    className="btn btn-primary btn-sm d-md-none"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-right"></i>
                </button>
            </div>
        </header>
    );
}

export default Header;