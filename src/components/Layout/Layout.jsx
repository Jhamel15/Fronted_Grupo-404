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

        <main className="content-area">
          <div className="datos-sistema">
            <div className="dato-linea">
              <strong>ENTIDAD:</strong>
              <span>0025</span>
              <span>Ministerio de la Presidencia</span>
            </div>

            <div className="dato-linea">
              <strong>UNIDAD:</strong>
              <span>0</span>
            </div>
          </div>

          <div className="content">
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;