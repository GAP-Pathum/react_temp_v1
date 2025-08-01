import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ThemeContext } from '../context/ThemeContext';
import { getThemeValue } from '../const/colorConst';

const DefaultLayout = ({ children }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const { theme } = useContext(ThemeContext);
    const location = useLocation();
    
    // Check if current route is an auth route
    const isAuthRoute = location.pathname.startsWith('/auth');
    
    const sidebarWidth = sidebarCollapsed ? '60px' : '250px';

    // Apply theme to layout
    const styles = {
        layout: {
            backgroundColor: getThemeValue(theme, 'bgBody'),
        },
        main: {
            backgroundColor: getThemeValue(theme, 'bgBody'),
            color: getThemeValue(theme, 'textPrimary'),
        }
    };

    // For auth routes, render without sidebar and header
    if (isAuthRoute) {
        return (
            <div className="vh-100 overflow-hidden" style={styles.layout}>
                <main className="w-100 h-100" style={styles.main}>
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div className="d-flex vh-100 overflow-hidden position-relative gap-1" style={styles.layout}>
            <div className="h-100 position-relative"
                style={{
                    width: sidebarWidth,
                    zIndex: 1001,
                    transition: 'all 0.3s ease',
                }}>
                <Sidebar onCollapse={setSidebarCollapsed} isCollapsed={sidebarCollapsed} />
            </div>

            <div className="flex-grow-1 overflow-auto d-flex flex-column h-100 gap-1"
                style={{ transition: 'all 0.3s ease' }}>
                <Header
                    sidebarCollapsed={sidebarCollapsed}
                    onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
                <main className="flex-grow-1 w-100" style={styles.main}>
                    <div className="container-fluid px-0">{children}</div>
                    {/* outlet */}
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;