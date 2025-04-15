const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <header>
        <h1>GSSD</h1>
      </header>
      <main>{children}</main>
      <footer>©️</footer>
    </>
  );
};

export default Layout;
