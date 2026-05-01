import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Layout = ({ children }) => {
    return (
        <>
            <Helmet>
                <script type='application/ld+json'>
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        'name': 'Your Organization Name',
                        'url': 'https://www.yourwebsite.com',
                        'logo': 'https://www.yourwebsite.com/logo.png',
                    })}
                </script>
                <script type='application/ld+json'>
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'LocalBusiness',
                        'name': 'Your Local Business Name',
                        'image': 'https://www.yourwebsite.com/image.png',
                        'telephone': '123-456-7890',
                        'address': {
                            '@type': 'PostalAddress',
                            'streetAddress': '123 Main St',
                            'addressLocality': 'YourCity',
                            'addressRegion': 'YourState',
                            'postalCode': '12345',
                            'addressCountry': 'YourCountry'
                        },
                    })}
                </script>
                <script type='application/ld+json'>
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        'itemListElement': [
                            {
                                '@type': 'ListItem',
                                'position': 1,
                                'item': {
                                    '@id': 'https://www.yourwebsite.com/',
                                    'name': 'Home'
                                }
                            },
                            {
                                '@type': 'ListItem',
                                'position': 2,
                                'item': {
                                    '@id': 'https://www.yourwebsite.com/your-page',
                                    'name': 'Your Page'
                                }
                            }
                        ]
                    })}
                </script>
            </Helmet>
            <main>{children}</main>
            <footer>
                <p>&copy; 2026 Your Organization. All Rights Reserved.</p>
            </footer>
        </>
    );
};

export default Layout;
