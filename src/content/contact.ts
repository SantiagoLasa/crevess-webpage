// Contenido de Contact. BORRADORES marcados; rangos de presupuesto y textos
// finales pendientes del cliente (CONTENT-TODO.md).

export const contact = {
  seo: {
    title: 'Contact',
    description:
      'Apply to work with Crevess — boutique social media and content creation in Miami.',
  },

  hero: {
    eyebrow: 'Contact',
    headline: 'Let’s build the brand you’re meant to lead.',
    italic: 'lead',
    // TODO: CONTENIDO CLIENTE — BORRADOR
    intro:
      'Tell us about your brand. If we’re a fit, we’ll come back within two business days with next steps.',
  },

  form: {
    title: 'Client Application Form',
    fields: {
      name: { label: 'Full name', placeholder: 'Your name' },
      email: { label: 'Email', placeholder: 'you@brand.com' },
      brand: { label: 'Brand / company', placeholder: 'Brand name' },
      instagram: { label: 'Instagram (optional)', placeholder: '@yourbrand' },
      service: { label: 'Service of interest', placeholder: 'Select a service' },
      budget: { label: 'Monthly budget', placeholder: 'Select a range' },
      message: {
        label: 'Tell us about the project',
        placeholder: 'What are you building, and where do you want it to go?',
      },
    },
    // TODO: CONTENIDO CLIENTE — confirmar rangos de presupuesto reales
    budgetOptions: [
      { value: 'under-2k', label: 'Under $2,000 / month' },
      { value: '2k-5k', label: '$2,000 – $5,000 / month' },
      { value: '5k-10k', label: '$5,000 – $10,000 / month' },
      { value: '10k-plus', label: '$10,000+ / month' },
    ],
    errors: {
      name: 'Enter your name (at least 2 characters).',
      email: 'Enter a valid email address.',
      brand: 'Enter your brand or company name.',
      service: 'Choose the service you’re interested in.',
      budget: 'Choose a budget range.',
      message: 'Tell us a bit more — at least 10 characters.',
    },
    submit: 'Send application',
    submitting: 'Sending…',
    success: {
      title: 'Application received',
      body: 'Thank you — we’ll review it and reply within two business days. Check your inbox for a confirmation.',
    },
    serverErrors: {
      invalid: 'Some fields need attention — review the highlights above and resend.',
      rate_limited:
        'Too many messages from your connection in the last hour. Wait a bit and try again.',
      turnstile:
        'We couldn’t verify the anti-spam check. Reload the page and try again.',
      server:
        'Something failed on our side and the message didn’t go out. Try again in a few minutes or write to us directly.',
      network:
        'The message couldn’t be sent — check your connection and try again.',
    },
  },

  process: {
    eyebrow: 'How it works',
    headline: 'Three steps to takeoff',
    italic: 'takeoff',
    // TODO: CONTENIDO CLIENTE — BORRADOR
    steps: [
      {
        number: '01',
        title: 'Strategy call',
        body: 'A 30-minute conversation about your brand, your audience and what “working” looks like for you.',
      },
      {
        number: '02',
        title: 'Proposal',
        body: 'A scoped plan with deliverables, timeline and pricing — no templates, built for your brand.',
      },
      {
        number: '03',
        title: 'Production',
        body: 'We start creating. First content cycle lands within weeks, with strategy reviews as we go.',
      },
    ],
  },

  details: {
    eyebrow: 'Reach us',
    whatsappCta: 'Chat on WhatsApp',
  },

  map: {
    title: 'Crevess — Miami, FL',
    // TODO: CONTENIDO CLIENTE — dirección exacta si quieren pin específico
    embedSrc: 'https://www.google.com/maps?q=Miami,FL&output=embed',
  },
};
