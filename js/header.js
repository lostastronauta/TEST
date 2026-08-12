/**
 * Componente unificado de Header y Navegación
 * Inyecta dinámicamente el Header institucional en las 5 páginas y gestiona el ítem activo.
 * Incluye menú hamburguesa en móvil (estándar de industria) con accesibilidad.
 */
document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.getElementById("app-header");
  if (!headerContainer) return;

  const currentPage = document.body.getAttribute("data-page") || "index";
  const user = window.ClaveUnica ? window.ClaveUnica.getUser() : null;

  // Renderizado de Barra de Accesibilidad
  const accessBarHTML = `
    <div class="access-bar">
      <div class="container access-bar__inner">
        <div class="access-bar__label">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>
          <span>Herramientas de Accesibilidad</span>
        </div>
        <div class="access-bar__tools">
          <button class="access-btn" onclick="Accessibility.increaseFont()" aria-label="Aumentar tamaño de letra">A+</button>
          <button class="access-btn" onclick="Accessibility.decreaseFont()" aria-label="Disminuir tamaño de letra">A-</button>
          <button class="access-btn" onclick="Accessibility.resetFont()" aria-label="Restablecer tamaño de letra">A</button>
          <button class="access-btn" onclick="Accessibility.toggleContrast()" aria-label="Alternar alto contraste">Alto Contraste</button>
        </div>
      </div>
    </div>
  `;

  // Renderizado del Header con acceso por perfiles o estado de sesión
  let loginControlHTML = '';
  if (user) {
    const rolRaw = String(user.rol || user.role || user.tipo || 'ciudadano').toLowerCase();
    const esEstablecimiento = (rolRaw === 'establecimiento' || rolRaw === 'sostenedor');
    const rolClass = esEstablecimiento ? 'establecimiento' : 'ciudadano';
    const rolLabel = esEstablecimiento ? 'Establecimiento' : 'Apoderado / Tutor';
    loginControlHTML = `
      <div class="header__user-info">
        <div class="header__user-avatar">${user.name.charAt(0)}</div>
        <div class="header__user-details">
          <span class="header__user-name">${user.name}</span>
          <span class="header__user-rut">RUT: ${user.rut}</span>
          <span class="header__user-rol header__user-rol--${rolClass}">${rolLabel}</span>
        </div>
        <button class="header__logout-btn" onclick="ClaveUnica.logout()" title="Cerrar sesión">Salir</button>
      </div>
    `;
  } else {
    loginControlHTML = `
      <div class="header__acceso">
        <button class="header__login" id="btn-acceso" aria-expanded="false" aria-haspopup="true" aria-controls="acceso-menu">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3.3 0-8 1.7-8 5v2h16v-2c0-3.3-4.7-5-8-5z"/></svg>
          <span>Ingresar</span>
          <svg class="header__login-chevron" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="header__acceso-menu" id="acceso-menu" role="menu" aria-label="Perfiles de ingreso">
          <button class="acceso-opcion acceso-opcion--ciudadano" data-rol="ciudadano" role="menuitem">
            <span class="acceso-opcion__icono" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-3.3 0-8 1.7-8 5v2h16v-2c0-3.3-4.7-5-8-5z"/></svg>
            </span>
            <span class="acceso-opcion__texto">
              <strong>Apoderados y Tutores</strong>
              <small>ClaveÚnica o credenciales de ciudadano</small>
            </span>
          </button>
          <button class="acceso-opcion acceso-opcion--establecimiento" data-rol="establecimiento" role="menuitem">
            <span class="acceso-opcion__icono" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 2 8l10 5 8-4v6h2V8z"/><path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5l-6 3z"/></svg>
            </span>
            <span class="acceso-opcion__texto">
              <strong>Establecimientos y Sostenedores</strong>
              <small>Gestión institucional de requerimientos</small>
            </span>
          </button>
        </div>
      </div>
    `;
  }

  const headerHTML = `
    ${accessBarHTML}
    <header class="header">
      <div class="header__cinta"><img src="img/cinta-chile.svg" alt="" width="150" height="14"></div>
      <div class="header__inner container">
        <img class="header__logo" src="img/logo-supereduc-blanco.svg" alt="Superintendencia de Educación, Ministerio de Educación, Gobierno de Chile" width="150" height="90">
        <h1 class="header__title">Portal de<br>Atención Ciudadana</h1>
        ${loginControlHTML}
      </div>
    </header>

    <nav class="nav" aria-label="Navegación principal">
      <!-- Botón hamburguesa (solo móvil) -->
      <div class="nav__toggle-wrap">
        <button class="nav__toggle" aria-expanded="false" aria-controls="nav-menu">
          <span class="nav__toggle-icon" aria-hidden="true">
            <span class="nav__toggle-bar"></span>
            <span class="nav__toggle-bar"></span>
            <span class="nav__toggle-bar"></span>
          </span>
          Menú
        </button>
      </div>

      <div class="nav__scroll container" id="nav-menu">
        <a class="nav__item nav__home ${currentPage === "index" ? "nav__item--activo" : ""}" href="index.html" aria-label="Inicio" ${currentPage === "index" ? 'aria-current="page"' : ""}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 8h-2.6v9h-4.9v-6h-3v6H5.6v-9H3z" fill="#fff"/></svg>
        </a>
        <a class="nav__item ${currentPage === "index" ? "nav__item--activo" : ""}" href="index.html#competencias">Nuestras competencias</a>
        <a class="nav__item ${currentPage === "denuncias" ? "nav__item--activo" : ""}" href="denuncias.html">Proceso de denuncias</a>
        <a class="nav__item ${currentPage === "mediacion" ? "nav__item--activo" : ""}" href="mediacion.html">Proceso de mediación</a>
        <a class="nav__item ${currentPage === "consultas" ? "nav__item--activo" : ""}" href="consultas.html">Proceso de consultas</a>
        <a class="nav__item nav__item--rojo ${currentPage === "horarios" ? "nav__item--activo" : ""}" href="horarios.html">Horarios de atención</a>
      </div>
    </nav>
  `;

  headerContainer.innerHTML = headerHTML;

  /* ---------- Lógica del menú hamburguesa ---------- */
  const toggleBtn = headerContainer.querySelector(".nav__toggle");
  const navMenu = headerContainer.querySelector("#nav-menu");

  function cerrarMenu() {
    navMenu.classList.remove("nav__scroll--abierto");
    toggleBtn.classList.remove("nav__toggle--abierto");
    toggleBtn.setAttribute("aria-expanded", "false");
  }

  if (toggleBtn && navMenu) {
    // Abrir / cerrar
    toggleBtn.addEventListener("click", function () {
      const abierto = navMenu.classList.toggle("nav__scroll--abierto");
      toggleBtn.classList.toggle("nav__toggle--abierto", abierto);
      toggleBtn.setAttribute("aria-expanded", String(abierto));
    });

    // Cerrar al elegir un ítem (móvil)
    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) cerrarMenu();
    });

    // Cerrar con tecla Escape (accesibilidad)
    document.addEventListener("keydown", function (e) {
      if (
        e.key === "Escape" &&
        navMenu.classList.contains("nav__scroll--abierto")
      ) {
        cerrarMenu();
        toggleBtn.focus();
      }
    });
  }

  /* ---------- Lógica del desplegable de acceso por perfil ---------- */
  const btnAcceso = headerContainer.querySelector('#btn-acceso');
  const accesoMenu = headerContainer.querySelector('#acceso-menu');

  function cerrarAcceso() {
    if (!btnAcceso || !accesoMenu) return;
    accesoMenu.classList.remove('header__acceso-menu--abierto');
    btnAcceso.classList.remove('header__login--abierto');
    btnAcceso.setAttribute('aria-expanded', 'false');
  }

  function abrirLoginConRol(rol) {
    cerrarAcceso();
    if (window.ClaveUnica && typeof window.ClaveUnica.openLoginModal === 'function') {
      window.ClaveUnica.openLoginModal(rol);
    }
  }

  if (btnAcceso && accesoMenu) {
    btnAcceso.addEventListener('click', function (e) {
      e.stopPropagation();
      const abierto = accesoMenu.classList.toggle('header__acceso-menu--abierto');
      btnAcceso.classList.toggle('header__login--abierto', abierto);
      btnAcceso.setAttribute('aria-expanded', String(abierto));
    });

    accesoMenu.querySelectorAll('.acceso-opcion').forEach(function (op) {
      op.addEventListener('click', function () {
        abrirLoginConRol(op.getAttribute('data-rol'));
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.header__acceso')) cerrarAcceso();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') cerrarAcceso();
    });
  }
});