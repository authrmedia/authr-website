import '../styles/globals.css';

export const metadata = {
  title: 'authr. — founder-led marketing',
  description: 'Content that compounds. Built for builders.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
