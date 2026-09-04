/**
 * Single source of truth for InstaBizWeb's service catalogue.
 *
 * Two vocabularies exist and they are NOT interchangeable:
 *
 *  - `name`         marketing label shown on the website (assignment "Services to Feature")
 *  - `enquiryValue` value posted to the API. MUST match the backend whitelist in
 *                   backend/src/validators/enquiryValidator.js — the server rejects
 *                   anything else with a 400.
 *
 * Grouping the nine services into four outcomes (Build / Manage / Automate / Grow)
 * gives the services section a hierarchy instead of nine equal-weight cards.
 */

export const SERVICE_GROUPS = [
  {
    id: 'build',
    index: '01',
    label: 'Build',
    icon: 'Blocks',
    summary:
      'Establish the digital foundation — the products and platforms your customers and teams actually use.',
    services: [
      {
        name: 'Website Development',
        enquiryValue: 'Website Development',
        icon: 'Globe',
        description:
          'Fast, responsive marketing sites built to convert visitors into qualified enquiries.',
      },
      {
        name: 'Web & Mobile App Development',
        enquiryValue: 'Web/Mobile App Development',
        icon: 'Smartphone',
        description:
          'Customer portals and mobile applications that extend your business beyond the browser.',
      },
      {
        name: 'Custom Software Development',
        enquiryValue: 'Custom Software',
        icon: 'Code2',
        description:
          'Purpose-built systems for the workflows no off-the-shelf product models correctly.',
      },
    ],
  },
  {
    id: 'manage',
    index: '02',
    label: 'Manage',
    icon: 'Database',
    summary:
      'Centralise operations and customer data so decisions come from one reliable record.',
    services: [
      {
        name: 'CRM Solutions',
        enquiryValue: 'CRM',
        icon: 'Users',
        description:
          'Track leads, pipeline and customer history in one place instead of across inboxes.',
      },
      {
        name: 'ERP & Odoo Solutions',
        enquiryValue: 'ERP/Odoo',
        icon: 'LayoutGrid',
        description:
          'Connect inventory, finance and operations — including Odoo implementation and customisation.',
      },
    ],
  },
  {
    id: 'automate',
    index: '03',
    label: 'Automate',
    icon: 'Workflow',
    summary:
      'Remove the repetitive work and the manual hand-offs between systems that quietly cost hours.',
    services: [
      {
        name: 'Business Process Automation',
        enquiryValue: 'Business Automation',
        icon: 'Zap',
        description:
          'Turn manual, multi-step routines into workflows that run without being chased.',
      },
      {
        name: 'AI Automation',
        enquiryValue: 'AI Automation',
        icon: 'Sparkles',
        description:
          'Apply AI where it earns its place — classification, extraction, drafting and triage.',
      },
      {
        name: 'API & System Integration',
        enquiryValue: 'API Integration',
        icon: 'Share2',
        description:
          'Bridge third-party platforms, databases and legacy software so data moves on its own.',
      },
    ],
  },
  {
    id: 'grow',
    index: '04',
    label: 'Grow',
    icon: 'TrendingUp',
    summary:
      'Put the finished system in front of the right audience and measure what it returns.',
    services: [
      {
        name: 'Digital Marketing',
        enquiryValue: 'Digital Marketing',
        icon: 'LineChart',
        description:
          'Search, content and campaign work measured against enquiries rather than impressions.',
      },
    ],
  },
];

/** Flat list of all nine services, in assignment order. */
export const ALL_SERVICES = SERVICE_GROUPS.flatMap((group) =>
  group.services.map((service) => ({ ...service, group: group.label, groupId: group.id }))
);

/**
 * Options for the enquiry form dropdown.
 * Order and values mirror the assignment brief exactly, plus "Other".
 */
export const SERVICE_OPTIONS = [
  ...ALL_SERVICES.map((service) => ({
    value: service.enquiryValue,
    label: service.enquiryValue,
  })),
  { value: 'Other', label: 'Other' },
];
