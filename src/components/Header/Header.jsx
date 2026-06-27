import "./Header.css";

function Header() {
  return (
    <header className="header-vsiaf">
      <div className="header-left">
        <div className="bandera-bolivia">
          <span className="rojo"></span>
          <span className="amarillo"></span>
          <span className="verde"></span>
        </div>

        <div>
          <h1>V.S.I.A.F</h1>
          <p>Sistema de Activos Fijos</p>
        </div>
      </div>
    </header>
  );
}

export default Header;