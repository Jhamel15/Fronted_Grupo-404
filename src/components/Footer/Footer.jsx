import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-superior">
        <span>V.S.I.A.F - Sistema de Activos Fijos</span>
      </div>

      <div className="footer-centro">

        <div className="footer-grupo">
          <strong>GRUPO 404</strong>
        </div>

        <div className="footer-linea"></div>

        <div className="footer-integrantes">
          <span>Jhamel</span>
          <span>Magaly</span>
          <span>Elva</span>
          <span>Paola</span>
          <span>Saúl</span>
          <span>Mario</span>
        </div>

      </div>

      <div className="footer-inferior">
        © 2026 - Universidad Autónoma Tomás Frías | Ingeniería de Sistemas
      </div>

    </footer>
  );
}

export default Footer;