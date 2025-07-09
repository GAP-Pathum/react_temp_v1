import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import actual page components
import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Employee from '../pages/Employee/Employee';
import Settings from '../pages/Settings/Settings';

// Import auth components
import { 
    Login, 
    Register, 
    ForgotPassword, 
    ResetPassword, 
    ProtectedRoute, 
    PublicRoute 
} from '../pages/Auth';

// Import auth context
import { useAuth } from '../context/AuthContext';

// Placeholder components for routes that don't have actual pages yet
const UserList = () => React.createElement('h1', null, 'User List');
const AddUser = () => React.createElement('h1', null, 'Add User');
const UserRoles = () => React.createElement('h1', null, 'User Roles');
const ProductCatalog = () => React.createElement('h1', null, 'Product Catalog');
const AddProduct = () => React.createElement('h1', null, 'Add Product');
const Categories = () => React.createElement('h1', null, 'Categories');
const SalesReports = () => React.createElement('h1', null, 'Sales Reports');
const Performance = () => React.createElement('h1', null, 'Performance');
const UserActivity = () => React.createElement('h1', null, 'User Activity');
const About = () => React.createElement('h1', null, 'About');
const Contact = () => React.createElement('h1', null, 'Contact');

// Route configuration object
export const routes = [
    { path: '/home', name: 'Home', nameKey: 'nav_home', component: Home, icon: 'bi-house-door' },
    { path: '/dashboard', name: 'Dashboard', nameKey: 'nav_dashboard', component: Dashboard, icon: 'bi-speedometer2', badge: { text: 'NEW', variant: 'info' } },
    {
        name: 'User Management', 
        nameKey: 'nav_user_management',
        icon: 'bi-people',
        children: [
            { path: '/users/list', name: 'User List', component: UserList },
            { path: '/users/add', name: 'Add User', component: AddUser },
            { path: '/users/roles', name: 'User Roles', component: UserRoles, badge: { text: '3', variant: 'danger' } }
        ]
    },
    {
        name: 'Products',
        nameKey: 'nav_products',
        icon: 'bi-box-seam',
        children: [
            { path: '/products/catalog', name: 'Product Catalog', component: ProductCatalog },
            { path: '/products/add', name: 'Add Product', component: AddProduct },
            { path: '/products/categories', name: 'Categories', component: Categories }
        ]
    },
    {
        name: 'Analytics',
        nameKey: 'nav_analytics',
        icon: 'bi-graph-up',
        children: [
            { path: '/analytics/sales', name: 'Sales Reports', component: SalesReports },
            { path: '/analytics/performance', name: 'Performance', component: Performance },
            { path: '/analytics/activity', name: 'User Activity', component: UserActivity, badge: { text: 'HOT', variant: 'warning' } }
        ]
    },
    { path: '/employees', name: 'Employees', nameKey: 'nav_employees', component: Employee, icon: 'bi-people-fill' },
    { path: '/settings', name: 'Settings', nameKey: 'nav_settings', component: Settings, icon: 'bi-gear' },
    { path: '/about', name: 'About', nameKey: 'nav_about', component: About, icon: 'bi-info-circle' },
    { path: '/contact', name: 'Contact', nameKey: 'nav_contact', component: Contact, icon: 'bi-envelope' }
];

// Default redirect component
const DefaultRedirect = () => {
    const { isAuthenticated } = useAuth();
    return React.createElement(Navigate, {
        to: isAuthenticated ? '/home' : '/auth/login',
        replace: true
    });
};

// Routes component
const AppRoutes = () => {
    return React.createElement(
        Routes,
        null,
        // Default route
        React.createElement(Route, {
            key: 'default',
            path: '/',
            element: React.createElement(DefaultRedirect)
        }),
        
        // Authentication routes (public)
        React.createElement(Route, {
            key: 'auth-login',
            path: '/auth/login',
            element: React.createElement(PublicRoute, null, React.createElement(Login))
        }),
        React.createElement(Route, {
            key: 'auth-register',
            path: '/auth/register',
            element: React.createElement(PublicRoute, null, React.createElement(Register))
        }),
        React.createElement(Route, {
            key: 'auth-forgot-password',
            path: '/auth/forgot-password',
            element: React.createElement(PublicRoute, null, React.createElement(ForgotPassword))
        }),
        React.createElement(Route, {
            key: 'auth-reset-password',
            path: '/auth/reset-password',
            element: React.createElement(PublicRoute, null, React.createElement(ResetPassword))
        }),
        
        // Protected routes
        ...routes.flatMap(route =>
            route.children
                ? route.children.map(child =>
                    React.createElement(Route, {
                        key: child.path,
                        path: child.path,
                        element: React.createElement(ProtectedRoute, null, React.createElement(child.component))
                    })
                )
                : route.path
                    ? [React.createElement(Route, {
                        key: route.path,
                        path: route.path,
                        element: React.createElement(ProtectedRoute, null, React.createElement(route.component))
                    })]
                    : []
        )
    );
};

export default AppRoutes;