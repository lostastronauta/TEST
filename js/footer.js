/**
 * Componente unificado de Footer (v2 — igual a la maqueta)
 * Inyecta dinámicamente el Footer institucional idéntico en las 5 páginas del portal.
 */
document.addEventListener('DOMContentLoaded', function () {
  const footerContainer = document.getElementById('app-footer');
  if (!footerContainer) return;

  /* Ícono de mano roja (apunta a la derecha) */
  const mano = '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="#FE6565" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.2 10.6h2.2"/><path d="M6.4 8.2c0-1 .8-1.8 1.8-1.8h6.6"/><path d="M14.8 6.4h3.1a1.8 1.8 0 0 1 0 3.6h-3.4"/><path d="M6.4 8.2v7.1c0 1.3 1 2.3 2.3 2.3h4.9c2.4 0 4.3-1.9 4.3-4.3v-3.3"/><path d="M9.8 11.2h2.4M9.8 13.6h2.4"/></g></svg>';

  const footerHTML = `
    <footer class="footer">
      <div class="container footer__superior">

        <!-- Columna izquierda: logo + políticas -->
        <div class="footer__col footer__col--izq">
          <img class="footer__logo" src="img/logo-supereduc-rojo.svg" alt="Superintendencia de Educación, Gobierno de Chile" width="130" height="150" loading="lazy">

          <ul class="footer__links">
            <li><a href="https://www.supereduc.cl/consultas/">${mano}Preguntas frecuentes</a></li>
            <li><a href="https://www.supereduc.cl/politicas-de-seguridad-de-la-informacion/">${mano}Políticas de Seguridad de la Información</a></li>
            <li><a href="https://www.supereduc.cl/politicas-privacidad/">${mano}Políticas de Privacidad</a></li>
          </ul>
        </div>

        <!-- Columna derecha: transparencia + admin + sitios -->
        <div class="footer__col footer__col--der">
          <div class="footer__transp">
            <a class="transp" href="https://www.supereduc.cl/registro-de-tramites-digitales/" target="_blank" rel="noopener">Solicitud de información<strong>Ley de Transparencia</strong></a>
            <a class="transp" href="https://transparencia.supereduc.cl/IRIS_FILES/_T.ACTIVA/3025/28-12-2018-12-24-11.078754999999999.html" target="_blank" rel="noopener">Compromisos de<strong>Gestión Institucional</strong></a>
            <a class="transp" href="https://transparencia.supereduc.cl/iris_gplus/Transparencia/index_minisitio.jsp?id=11" target="_blank" rel="noopener">Gobierno<strong>Transparente</strong></a>
          </div>

          <p class="footer__admin">Si necesitas contactarte con la administración de este sitio, <a href="mailto:jaime.galleguillos@supereduc.cl">haz clic aquí</a>.</p>

          <nav class="footer__sitios" aria-label="Sitios relacionados">
            <h4>Sitios relacionados:</h4>
            <ul>
              <li><a href="https://www.ayudamineduc.cl" target="_blank" rel="noopener">Ayuda Mineduc</a></li>
              <li><a href="https://www.junji.gob.cl" target="_blank" rel="noopener">JUNJI</a></li>
              <li><a href="https://www.integra.cl" target="_blank" rel="noopener">Integra</a></li>
              <li><a href="https://www.anid.cl" target="_blank" rel="noopener">ANID</a></li>
              <li><a href="https://www.chileatiende.gob.cl" target="_blank" rel="noopener">Chile Atiende</a></li>
            </ul>
          </nav>
        </div>
      </div>

      <div class="container footer__inferior">
        <a class="footer__tel" href="tel:6003600390"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.2c.5-.5 1.3-.4 1.7.2l1.3 1.9c.3.5.3 1.1-.1 1.5l-.9 1c-.2.2-.2.5-.1.8.6 1.2 1.7 2.3 2.9 2.9.3.1.6.1.8-.1l1-.9c.4-.4 1-.4 1.5-.1l1.9 1.3c.6.4.7 1.2.2 1.7l-1 1c-.5.5-1.2.7-1.9.6-2.2-.4-4.6-1.7-6.5-3.6S4.2 7.3 3.8 5.1c-.1-.7.1-1.4.6-1.9z" fill="#fff"/></svg>600 3600 390</a>
        <a class="footer__web" href="https://www.supereduc.cl" target="_blank" rel="noopener">www.supereduc.cl</a>
        <div class="footer__social">
          <a href="https://www.facebook.com/supereducCL/timeline" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.3-1.4 1.5-1.4h1.4V5.5c-.7-.1-1.5-.2-2.3-.2-2.3 0-3.8 1.4-3.8 3.9v2H8v2.8h2.3v7z" fill="#fff"/></svg></a>
          <a href="https://www.instagram.com/supereduc_cl/" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="#fff" stroke-width="2"/><circle cx="16.8" cy="7.2" r="1.3" fill="#fff"/></svg></a>
          <a href="https://x.com/supereduc_cl" aria-label="X"><svg viewBox="0 0 24 24"><path d="M17.8 4h2.9l-6.4 7.3L21.9 20H16l-4.6-6-5.3 6H3.2l6.9-7.8L2.5 4h6l4.2 5.5z" fill="#fff"/></svg></a>
          <a href="https://www.threads.com/@supereduc_cl?hl=es" aria-label="Threads"><svg viewBox="0 0 24 24"><text x="12" y="16.5" text-anchor="middle" font-size="14" font-family="sans-serif" font-weight="700" fill="#fff">@</text></svg></a>
          <a href="https://www.youtube.com/channel/UCWzV9xpJrHWpB-VT2mx9HKg" aria-label="YouTube"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3" fill="#fff"/><path d="M10 9.5v5l4.5-2.5z" fill="#0A132D"/></svg></a>
        </div>
      </div>

            <!-- Franja inferior tricolor (imagen insertada en img/) -->
      <div class="footer__cinta" aria-hidden="true">
        <!-- TODO: ajusta nombre/extensión si tu archivo se llama distinto -->
        <img src="https://www.supereduc.cl/wp-content/uploads/2026/08/tricolor-estrella-scaled.png" alt="" loading="lazy">
      </div>
    </footer>
  `;

  footerContainer.innerHTML = footerHTML;
});