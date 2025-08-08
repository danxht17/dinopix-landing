// Simple password protection for staging sites
export default async (request, context) => {
  try {
    // Only apply password protection to staging sites
    const hostname = request.headers.get('host') || '';
    if (!hostname.includes('staging')) {
      return; // Pass through to the next function
    }

    // Get the password from environment variables
    const PASSWORD_PROTECTION = context.env.PASSWORD_PROTECTION || 'staging-password';
    
    // Check if the user has the correct auth cookie
    const cookie = request.headers.get('cookie') || '';
    if (cookie.includes(`staging_auth=${PASSWORD_PROTECTION}`)) {
      return; // User is authenticated, pass through
    }

    // Check if this is the form submission
    if (request.method === 'POST') {
      try {
        const formData = await request.formData();
        const password = formData.get('password');
        
        if (password === PASSWORD_PROTECTION) {
          // Redirect with auth cookie
          return new Response(null, {
            status: 302,
            headers: {
              'Location': '/',
              'Set-Cookie': `staging_auth=${PASSWORD_PROTECTION}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=86400`
            }
          });
        }
      } catch (formError) {
        console.error('Error processing form:', formError);
      }
    }

    // Show login form
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Staging Site - Password Protected</title>
          <meta name="robots" content="noindex, nofollow">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #f7f7f7;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
            .container {
              background-color: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              max-width: 400px;
              width: 100%;
            }
            h1 {
              margin-top: 0;
              color: #333;
            }
            form {
              display: flex;
              flex-direction: column;
            }
            input {
              padding: 0.75rem;
              margin-bottom: 1rem;
              border: 1px solid #ddd;
              border-radius: 4px;
            }
            button {
              padding: 0.75rem;
              background-color: #0070f3;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
            button:hover {
              background-color: #0060df;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Staging Site</h1>
            <p>This is a password-protected staging environment.</p>
            <form method="post">
              <input type="password" name="password" placeholder="Enter password" required>
              <button type="submit">Access Site</button>
            </form>
          </div>
        </body>
      </html>
    `, {
      status: 401,
      headers: {
        'Content-Type': 'text/html',
        'X-Robots-Tag': 'noindex, nofollow'
      }
    });
  } catch (error) {
    // Fallback in case of any error - don't block access
    console.error('Edge function error:', error);
    return; // Pass through to the next function
  }
};