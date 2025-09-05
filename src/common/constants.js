// src/common/constants.js

// Moneda / Localización
export const CURRENCY = { locale: "es-PE", code: "PEN", symbol: "S/" };

// Tramos de precios (un solo lugar para mantenerlos)
export const PRICING_TIERS = [
{ hasta: 1,  unit: 7.00 },
{ hasta: 5,  unit: 6.50 },
{ hasta: 10, unit: 4.90 },
{ hasta: 20, unit: 4.20 },
{ hasta: 3, unit: 4.10 },
{ hasta: 50, unit: 4.00 },
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
