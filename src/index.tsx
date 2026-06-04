import React from 'react';

const Layout = ({ children, title, description }) => {
    return (
        <>
            <header>
                <nav>
                    <a href="/">Home</a> | 
                    <a href="/sobre">Sobre</a> | 
                    <a href="/servicos">Serviços</a> | 
                    <a href="/contato">Contato</a>
                </nav>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; 2026 Your Organization. All Rights Reserved.</p>
            </footer>
        </>
    );
};

export default Layout;
