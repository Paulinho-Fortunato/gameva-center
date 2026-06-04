import React from 'react';

const Layout = ({ children, title, description }) => {
    return (
        <>
            <main>{children}</main>
            <footer>
                <p>&copy; 2026 Your Organization. All Rights Reserved.</p>
            </footer>
        </>
    );
};

export default Layout;
