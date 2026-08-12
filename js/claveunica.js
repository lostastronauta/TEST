/**
 * Módulo de Integración ClaveÚnica (Gobierno de Chile)
 * Diseñado para facilitar la integración por parte del equipo de TI.
 * Incluye un simulador de estado para presentaciones sin backend activo.
 */

(function () {
  'use strict';

  // Configuración Oficial ClaveÚnica (Rellenar por el equipo de TI)
  const CLAVE_UNICA_CONFIG = {
    clientId: "YOUR_CLIENT_ID_HERE",
    redirectUri: window.location.origin + "/auth/callback.html",
    authorizeEndpoint: "https://accounts.claveunica.gob.cl/openid/authorize",
    scope: "openid run name email"
  };

  const SESSION_KEY = 'supereduc_cu_user_session';

  window.ClaveUnica = {
    // Función de redirección oficial a ClaveÚnica para Producción
    redirectToClaveUnica: function () {
      const state = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('cu_state', state);

      const url = `${CLAVE_UNICA_CONFIG.authorizeEndpoint}?` +
        `response_type=code&` +
        `client_id=${encodeURIComponent(CLAVE_UNICA_CONFIG.clientId)}&` +
        `redirect_uri=${encodeURIComponent(CLAVE_UNICA_CONFIG.redirectUri)}&` +
        `scope=${encodeURIComponent(CLAVE_UNICA_CONFIG.scope)}&` +
        `state=${state}`;

      console.log("[ClaveÚnica TI Integration] Redirigiendo a:", url);
      // Para efectos de producción: window.location.href = url;
    },

    // Retorna la sesión actual
    getUser: function () {
      try {
        const stored = sessionStorage.getItem(SESSION_KEY);
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        return null;
      }
    },

    // Activa la sesión de prueba (Nivel B para la demo)
    loginMock: function (nombre = "Juan Pérez González", rut = "12.345.678-9") {
      const mockUser = {
        name: nombre,
        rut: rut,
        email: "juan.perez@ejemplo.cl",
        loggedAt: new Date().toISOString()
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(mockUser));
      window.location.reload();
    },

    // Cierra sesión
    logout: function () {
      sessionStorage.removeItem(SESSION_KEY);
      window.location.reload();
    },

    // Mostrar modal informativo o modal de login para la demo
    openLoginModal: function () {
      let modal = document.getElementById('cu-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cu-modal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
          <div class="modal-card" role="dialog" aria-labelledby="cu-modal-title" aria-modal="true">
            <button class="modal-close" id="cu-modal-close" aria-label="Cerrar modal">&times;</button>
            <div style="display:flex; justify-content:center; align-items:center; gap:0.5rem; margin-bottom:1rem;">
              <span class="cu-badge" style="width:30px; height:30px; font-size:0.9rem;">CU</span>
              <h2 id="cu-modal-title" style="font-size:1.4rem; color:var(--cu-azul); font-family:var(--f-titulos);">Acceso con ClaveÚnica</h2>
            </div>
            <p style="font-size:0.95rem; margin-bottom:1.5rem; color:var(--gray-a);">
              El Portal de Atención Ciudadana SIE requiere autenticación oficial del Gobierno de Chile para el seguimiento y gestión personalizada de sus denuncias y solicitudes.
            </p>
            
            <div style="background:var(--neutral); padding:1rem; border-radius:0.5rem; margin-bottom:1.5rem; text-align:left; font-size:0.85rem;">
              <strong>Simulador de Presentación (Modo Demo):</strong>
              <div style="margin-top:0.5rem; display:grid; gap:0.5rem;">
                <button id="btn-demo-login" class="btn-pill btn-pill--cu" style="width:100%; justify-content:center;">
                  Simular Login Ciudadano (Nivel B)
                </button>
              </div>
            </div>

            <div style="font-size:0.75rem; color:var(--gray-b);">
              * Integración OpenID Connect con <code>accounts.claveunica.gob.cl</code> lista para el equipo de TI.
            </div>
          </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('cu-modal-close').addEventListener('click', () => {
          modal.classList.remove('active');
        });

        document.getElementById('btn-demo-login').addEventListener('click', () => {
          window.ClaveUnica.loginMock();
        });
      }
      modal.classList.add('active');
    }
  };
})();
