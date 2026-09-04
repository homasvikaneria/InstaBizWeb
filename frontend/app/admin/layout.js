export const metadata = {
  title: {
    absolute: 'Admin Portal | InstaBizWeb',
  },
  description: 'InstaBizWeb administrator portal for managing enquiries.',
  // The admin surface must never be indexed or followed by crawlers.
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }) {
  return children;
}
