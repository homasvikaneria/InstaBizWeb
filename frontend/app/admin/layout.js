export const metadata = {
  title: 'Admin Portal | InstaBizWeb',
  description: 'InstaBizWeb Administrator Management Portal',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {children}
    </div>
  );
}
