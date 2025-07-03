import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { routes } from "../router";
import { ThemeContext } from '../context/ThemeContext';
import { getThemeValue } from '../const/colorConst';
import useTranslation from '../hooks/useTranslation';

function Sidebar({ onCollapse, isCollapsed: externalCollapsed }) {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(externalCollapsed || false);
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  // Apply theme to component styles
  const styles = {
    sidebar: {
      backgroundColor: getThemeValue(theme, 'bgSidebar'),
      color: getThemeValue(theme, 'textPrimary'),
    },
    logo: {
      backgroundColor: theme === 'dark' ? getThemeValue(theme, 'primary') : '#000000',
      color: getThemeValue(theme, 'white'),
    },
    toggleButton: {
      backgroundColor: theme === 'dark' ? getThemeValue(theme, 'bgCard') : '',
      color: getThemeValue(theme, 'textPrimary'),
      borderColor: getThemeValue(theme, 'border'),
    },
    input: {
      backgroundColor: theme === 'dark' ? getThemeValue(theme, 'bgCard') : '',
      color: getThemeValue(theme, 'textPrimary'),
      borderColor: getThemeValue(theme, 'border'),
    },
    hr: {
      borderColor: getThemeValue(theme, 'border'),
    },
    navLink: {
      color: getThemeValue(theme, 'textPrimary'),
    },
    navLinkActive: {
      backgroundColor: getThemeValue(theme, 'primary'),
      color: getThemeValue(theme, 'white'),
    },
  };

  useEffect(() => {
    if (externalCollapsed !== undefined && externalCollapsed !== isCollapsed) {
      setIsCollapsed(externalCollapsed);
      onCollapse?.(externalCollapsed);
    }
  }, [externalCollapsed, isCollapsed, onCollapse]);

  // Automatically expand the group containing the active route
  useEffect(() => {
    routes.forEach(route => {
      if (route.children) {
        const hasActiveChild = route.children.some(child =>
          child.path === location.pathname);

        if (hasActiveChild) {
          setExpandedGroups(prev => ({ ...prev, [route.name]: true }));
        }
      }
    });
  }, [location.pathname]);

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onCollapse?.(newState);
    if (newState) setExpandedGroups({});
  };

  // Check if a route is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Check if a route group has an active child
  const hasActiveChild = (children) => {
    return children.some(child => isActive(child.path));
  };

  return (
    <div className="d-flex flex-column p-3 rounded"
      style={{
        ...styles.sidebar,
        width: "100%",
        height: "100vh",
        overflow: "auto"
      }}
    >
      <div className="d-flex align-items-center mb-3">
        {!isCollapsed && <div className="rounded text-light flex-grow-1 text-center py-1" style={styles.logo}>{t('app_name')}</div>}
        <button className="btn btn-sm btn-outline-secondary ms-2" onClick={toggleSidebar} style={styles.toggleButton}>
          <i className={`bi bi-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
        </button>
      </div>

      {!isCollapsed && <input className="form-control mb-3" placeholder="Search..." style={styles.input} />}
      <hr style={styles.hr} />

      <ul className="nav nav-pills flex-column mb-auto">
        {routes.map((route, i) => (
          <li className="mb-1" key={i}>
            {route.children ? (
              <>
                <div
                  className={`nav-link d-flex ${isCollapsed ? 'justify-content-center' : 'justify-content-between'} align-items-center`}
                  style={route.children && hasActiveChild(route.children) ? styles.navLinkActive : styles.navLink}
                  onClick={() => !isCollapsed && setExpandedGroups(p => ({ ...p, [route.name]: !p[route.name] }))}
                  role="button"
                  title={route.nameKey ? t(route.nameKey) : route.name}
                >
                  <i className={`${route.icon} ${isCollapsed ? '' : 'me-2'}`}></i>
                  {!isCollapsed && (route.nameKey ? t(route.nameKey) : route.name)}
                  {!isCollapsed && <i className={`bi bi-chevron-${expandedGroups[route.name] ? 'up' : 'down'}`}></i>}
                </div>

                {!isCollapsed && expandedGroups[route.name] && (
                  <ul className="nav flex-column ms-3">
                    {route.children.map((child, j) => (
                      <li key={j}>
                        <Link
                          to={child.path}
                          className="nav-link py-1"
                          style={isActive(child.path) ? styles.navLinkActive : styles.navLink}
                          title={child.name}
                        >
                          • {child.name}
                          {child.badge && <span className={`badge bg-${child.badge.variant} ms-2`}>{child.badge.text}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                to={route.path}
                className={`nav-link ${isCollapsed ? 'text-center' : ''}`}
                style={isActive(route.path) ? styles.navLinkActive : styles.navLink}
                title={route.name}
              >
                <i className={`${route.icon} ${isCollapsed ? '' : 'me-2'}`}></i>
                {!isCollapsed && (route.nameKey ? t(route.nameKey) : route.name)}
                {route.badge && <span className={`badge bg-${route.badge.variant} ${isCollapsed ? 'position-absolute start-100 translate-middle-y' : 'ms-2'}`}>
                  {route.badge.text}
                </span>}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;