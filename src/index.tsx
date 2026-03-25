import React from 'react';

const SEO = () => (
  <head>
    <title>Your Page Title</title>
    <meta name="description" content="Your description here" />
    <link rel="canonical" href="https://yourwebsite.com/current-page" />
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Your Website Name",
        "url": "https://yourwebsite.com"
      })}
    </script>
  </head>
);

const App = () => (
  <div>
    <SEO />
    <header>
      <h1>Welcome to Our Website</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    <main>
      {/* Main content goes here */}
    </main>
  </div>
);

export default App;