# ECOPOWER KNB-EP060050C — Landing Page Guide

Single-product landing page for **ECOPOWER KNB-EP060050C** (600 Wh / 500 W Lithium Battery Backup Generator), designed in California, USA and made in Karachi, Pakistan by **Kazi & Brothers Group of Companies**.

---

## Where to Edit Content & Defaults

- **`src/config/productConfig.ts`**:
  - `pricePkr`: Retail price (`[PRICE PKR]`)
  - `warranty`: Warranty text (`[WARRANTY]`)
  - `whatsappNumber` / `whatsappDisplay`: Sales WhatsApp number (`[WHATSAPP]`)
  - `deliveryCities`: Supported delivery cities (`[DELIVERY CITIES]`)
  - `paymentOptions`: Payment methods (`[PAYMENT OPTIONS]`)
  - `inTheBox`: Included accessories (`[IN THE BOX]`)
  - `kaziStoryPlaceholder`: Company & manufacturing story
  - `ownersGroupUrl`: Owners Group invite link
  - `efficiencyFactor`: Default `0.85` (85% usable capacity = 510 Wh)
  - `appliancePresets`: Calculator preset devices & default wattages

- **`src/i18n/translations.ts`**:
  - Full English and Urdu (`اردو` RTL) copy across all 11 sections
  - All 11 front & rear inspection hotspot coordinates, blueprint leader coordinates, and descriptions

- **Product Assets**:
  - `public/assets/ecopower-front-cutout.png`
  - `public/assets/ecopower-rear-cutout.png`

---

## Missing Content & Placeholders Still Needed From You

1. **`[PRICE PKR]`** — Final retail price in Pakistani Rupees
2. **`[WARRANTY]`** — Official warranty period and terms
3. **`[WHATSAPP]`** — Order WhatsApp number (`whatsappNumber` digits-only + `whatsappDisplay`)
4. **`[DELIVERY CITIES]`** — Karachi same-day coverage and nationwide courier cities
5. **`[PAYMENT OPTIONS]`** — COD, bank transfer, mobile wallet options
6. **`[IN THE BOX]`** — Included cables/documents in the box
7. **Kazi & Brothers Story** — Replace `kaziStoryPlaceholder` in `src/config/productConfig.ts`
8. **Owners Group URL** — Replace `ownersGroupUrl` in `src/config/productConfig.ts`
9. **Unpublished Technical Items Currently Marked `TBC`**:
   - AC waveform & frequency
   - Peak / surge rating
   - USB & 12 V DC output currents
   - Battery chemistry subtype
   - Full AC charge time
   - Solar connector pinout
   - STANDBY switchover delay
   - Certifications
   - Official `[RUNTIME DATA]` curve
