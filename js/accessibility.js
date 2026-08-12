/**
 * Módulo de Accesibilidad - Portal de Atención Ciudadana Supereduc
 * Cumplimiento WCAG 2.1 AA
 */

(function () {
  'use strict';

  let currentScale = parseFloat(localStorage.getItem('supereduc_font_scale')) || 1.0;
  let isHighContrast = localStorage.getItem('supereduc_high_contrast') === 'true';

  function applyAccessibilitySettings() {
    document.documentElement.style.setProperty('--font-scale', currentScale);
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }

  window.Accessibility = {
    increaseFont: function () {
      if (currentScale < 1.4) {
        currentScale += 0.1;
        localStorage.setItem('supereduc_font_scale', currentScale);
        applyAccessibilitySettings();
        announceToScreenReader('Tamaño de texto aumentado');
      }
    },
    decreaseFont: function () {
      if (currentScale > 0.85) {
        currentScale -= 0.1;
        localStorage.setItem('supereduc_font_scale', currentScale);
        applyAccessibilitySettings();
        announceToScreenReader('Tamaño de texto reducido');
      }
    },
    resetFont: function () {
      currentScale = 1.0;
      localStorage.setItem('supereduc_font_scale', currentScale);
      applyAccessibilitySettings();
      announceToScreenReader('Tamaño de texto restablecido');
    },
    toggleContrast: function () {
      isHighContrast = !isHighContrast;
      localStorage.setItem('supereduc_high_contrast', isHighContrast);
      applyAccessibilitySettings();
      announceToScreenReader(isHighContrast ? 'Alto contraste activado' : 'Alto contraste desactivado');
    }
  };

  function announceToScreenReader(message) {
    let announcer = document.getElementById('sr-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'sr-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.position = 'absolute';
      announcer.style.width = '1px';
      announcer.style.height = '1px';
      announcer.style.overflow = 'hidden';
      document.body.appendChild(announcer);
    }
    announcer.textContent = message;
  }

  document.addEventListener('DOMContentLoaded', applyAccessibilitySettings);
})();
