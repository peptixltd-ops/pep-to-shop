import { render } from 'react-email';
import React from 'react';
import { NewsletterWelcomeEmail } from '../src/lib/email-templates/newsletter-welcome.tsx';
const html = await render(React.createElement(NewsletterWelcomeEmail, { code: 'WELCOME20-A7F3K9', expiresOn: '9 August 2026' }));
process.stdout.write(html);
