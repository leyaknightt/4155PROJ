

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <nav>
        <a href='/'>Home</a>
        <a href='/login'>Login</a>
        <a href='/signup'>Sign Up</a>
        <a href='/profile'>Profile</a>
    </nav>
        {children}
      </body>
    </html>
  );
}