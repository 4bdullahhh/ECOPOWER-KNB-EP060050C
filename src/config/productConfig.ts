/**
 * ECOPOWER KNB-EP060050C — Central Configuration
 * Edit placeholders, WhatsApp/phone numbers, and calculator defaults here.
 */

export interface AppliancePreset {
  id: string;
  defaultWatts: number;
  defaultQty: number;
  isDcFriendly?: boolean;
}

export const PRODUCT_CONFIG = {
  model: 'KNB-EP060050C',
  brand: 'ECOPOWER',
  parentCompany: 'Kazi & Brothers Group of Companies',
  origin: {
    designedIn: 'California, USA',
    madeIn: 'Karachi, Pakistan',
  },

  // --- CONFIRMED PRICE & CONTACT ---
  price: 59999,
  whatsappNumber: '923222193228', // International format, no +, spaces, or dashes
  phone: '+923222193228',
  phoneDisplay: '0322 2193228',

  // --- CONTACT & LINKS ---
  websiteUrl: 'https://ecopower.pk',
  websiteDisplay: 'ecopower.pk',
  supportEmail: 'support.ecopower@gmail.com',

  // --- CONFIRMED HARDWARE RATINGS ---
  capacityWh: 600,
  maxContinuousWatts: 500,
  weightKg: '8–10 kg',
  solarInput: '15–24 V DC · Max 10 A · Max 250 W',

  // --- CALCULATOR DEFAULTS (EDITABLE) ---
  efficiencyFactor: 0.85, // 85% usable delivery -> 510 Wh usable

  // --- PRODUCT ASSETS ---
  assets: {
    frontCutout: '/assets/ecopower-front-cutout.png',
    rearCutout: '/assets/ecopower-rear-cutout.png',
    frontPhoto: '/assets/aistudio/EcoPower_Battery_Backup_Generator_Product_Shot_a3caf7dc.png',
    rearPhoto: '/assets/aistudio/image_c9739f0e.png',
  },

  // --- APPLIANCE PRESETS FOR RUNTIME CALCULATOR ---
  appliancePresets: [
    {
      id: 'led-bulb',
      defaultWatts: 9,
      defaultQty: 2,
    },
    {
      id: 'dc-fan',
      defaultWatts: 35,
      defaultQty: 1,
      isDcFriendly: true,
    },
    {
      id: 'ac-fan',
      defaultWatts: 75,
      defaultQty: 0,
    },
    {
      id: 'router',
      defaultWatts: 15,
      defaultQty: 1,
      isDcFriendly: true,
    },
    {
      id: 'phone',
      defaultWatts: 15,
      defaultQty: 1,
      isDcFriendly: true,
    },
    {
      id: 'laptop',
      defaultWatts: 60,
      defaultQty: 1,
    },
    {
      id: 'tv',
      defaultWatts: 65,
      defaultQty: 0,
    },
  ] as AppliancePreset[],
};

export function formatPricePkr(lang: 'en' | 'ur'): string {
  const formatted = PRODUCT_CONFIG.price.toLocaleString('en-US');
  return lang === 'ur' ? `${formatted} روپے` : `PKR ${formatted}`;
}

export function buildWhatsAppUrl(message: string): string {
  const num = PRODUCT_CONFIG.whatsappNumber;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${num}?text=${encoded}`;
}
