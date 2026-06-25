import "./Layout.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

function Layout({ children }) {
  return (
    <div className="layout-page">
      <Header />

      <div className="main-container">
        <Sidebar />

        <main className="content">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;