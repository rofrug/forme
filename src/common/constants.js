// src/common/constants.js

// Moneda / Localización
export const CURRENCY = { locale: "es-PE", code: "PEN", symbol: "S/" };

// Tramos de precios (un solo lugar para mantenerlos)
export const PRICING_TIERS = [
  { hasta: 1, unit: 7.0 },
  { hasta: 3, unit: 6.5 },
  { hasta: 9, unit: 6.0 },
  { hasta: 18, unit: 5.5 },
  { hasta: 36, unit: 5.0 },
  { hasta: 42, unit: 4.5 },
  { hasta: 50, unit: 4.0 },
  
];

// Rutas/URLs útiles
export const URLS = {
  whatsappSupport: "https://wa.me/51912345678",
  mailSupport: "mailto:soporte@forme.com",
};

// Feature flags (para activar cosas nuevas gradualmente)
export const FLAGS = {
  pricingV2: false,
};
