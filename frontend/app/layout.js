import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: {
    default: 'InstaBizWeb - Digital Solutions for Business Growth',
    template: '%s | InstaBizWeb',
  },
  description: 'InstaBizWeb delivers modern, high-performance web systems and digital solutions designed for commercial business growth.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white overflow-x-hidden"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
