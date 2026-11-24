import { formatPricePkr } from '../config/productConfig';

export type Lang = 'en' | 'ur';

export interface HotspotCoord {
  num: string;
  view: 'front' | 'rear';
  x: number;
  y: number;
  lx: number;
  ly: number;
}

export interface HotspotText {
  shortTag: string;
  title: string;
  detail: string;
}

export const HOTSPOT_COORDS: HotspotCoord[] = [
  { num: '01', view: 'front', x: 89.5, y: 35, lx: 68, ly: 12 },
  { num: '02', view: 'front', x: 61, y: 35, lx: 48, ly: 11 },
  { num: '03', view: 'front', x: 25.3, y: 53.8, lx: 14, ly: 16 },
  { num: '04', view: 'front', x: 63, y: 72, lx: 43, ly: 88 },
  { num: '05', view: 'front', x: 77, y: 72, lx: 78, ly: 88 },
  { num: '06', view: 'front', x: 50, y: 7, lx: 28, ly: 6 },
  { num: '07', view: 'rear', x: 26, y: 59, lx: 14, ly: 22 },
  { num: '08', view: 'rear', x: 50, y: 74, lx: 36, ly: 88 },
  { num: '09', view: 'rear', x: 68, y: 74, lx: 68, ly: 88 },
  { num: '10', view: 'rear', x: 83, y: 74, lx: 84, ly: 58 },
  { num: '11', view: 'rear', x: 78, y: 38, lx: 60, ly: 15 },
];

export const COPY = {
  en: {
    meta: {
      title: 'ECOPOWER KNB-EP060050C — 600 Wh Backup Power Made in Karachi',
      description:
        '600 Wh / 500 W silent lithium battery backup generator for load-shedding in Karachi. No fuel, no fumes, auto STANDBY mode, solar ready. Made by Kazi & Brothers.',
    },
    nav: {
      brand: 'ECOPOWER',
      ariaLabel: 'Primary navigation',
      mobileMenuAria: 'Mobile navigation',
      menuOpenLabel: 'Open navigation menu',
      menuCloseLabel: 'Close navigation menu',
      features: 'Inspection',
      calculator: 'Runtime',
      howItWorks: 'Switch Logic',
      specs: 'Specs',
      faq: 'FAQ',
      contact: 'Contact',
      orderCta: 'Order on WhatsApp',
      orderCtaShort: 'WhatsApp',
      callCta: 'Call Now',
    },
    hero: {
      ariaLangToggle: 'Language selector',
      clockLabel: 'OUTAGE TIMER',
      stampCut: 'LOAD-SHEDDING',
      stampPower: 'BACKUP RUNNING',
      stampStandby: 'WAITING FOR THE NEXT CUT',
      headlineLine1: 'Bijli jaye,',
      headlineLine2: 'roshni na jaye.',
      echoLine: 'بجلی جائے، روشنی نہ جائے۔',
      subhead:
        '600 Wh / 500 W silent lithium backup power. No fuel, no fumes. Built for fans, lights, Wi-Fi, and phones.',
      switchLabel: '3-Position Main Switch',
      switchModes: {
        ON: 'ON',
        OFF: 'OFF',
        STANDBY: 'STANDBY',
      },
      ctaPrimary: 'Order on WhatsApp',
      ctaSecondary: 'See how long it runs',
      trustLine: 'Designed in California · Made in Karachi',
      altUnit: 'ECOPOWER KNB-EP060050C 600 Wh Lithium Battery Backup Generator',
    },
    problem: {
      kicker: '02 / KARACHI REALITY',
      frames: [
        { num: '01', place: 'Gulshan · 2:15 AM', line: 'Fan stops at midnight.' },
        { num: '02', place: 'DHA · Client Call', line: 'Wi-Fi dies mid-sentence.' },
        { num: '03', place: 'Nazimabad · Exams', line: 'Kids study by hot torches.' },
        { num: '04', place: 'Clifton · 40°C Cut', line: 'Fridge stays shut in fear.' },
        { num: '05', place: 'Saddar · Balcony', line: 'Generators roar and fume.' },
      ],
    },
    tour: {
      kicker: '03 / INTERACTIVE INSPECTION',
      title: 'Inspect every switch, port, and dial.',
      subtitle:
        'Click any marker, use arrow keys to step through, or flip between the Front and Rear panels.',
      ariaPanelView: 'Unit panel view',
      frontBtn: 'Front Panel',
      rearBtn: 'Rear Panel',
      resetBtn: 'Reset View',
      prevBtn: 'Previous control',
      nextBtn: 'Next control',
      kbHint: 'Keys: ← → step · Esc reset',
      closeNote: 'Close inspection note',
      altFront: 'ECOPOWER KNB-EP060050C Front Panel',
      altRear: 'ECOPOWER KNB-EP060050C Rear Panel',
      hotspots: {
        '01': {
          shortTag: '5 STATUS LEDS',
          title: '5 Battery & Status Lights',
          detail:
            'Vertical indicator lights for Full, Medium, Low, Standby, and Charging status.',
        },
        '02': {
          shortTag: 'LED LAMP + DIMMER',
          title: 'Built-in LED Lamp with Dimmer',
          detail:
            'Integrated front room lamp with its own rotary dimmer knob right below it.',
        },
        '03': {
          shortTag: 'BLOWER FAN + DIMMER',
          title: 'Variable-Speed Blower Fan with Dimmer',
          detail:
            'Built-in variable-speed blower fan controlled by its own front rotary dimmer.',
        },
        '04': {
          shortTag: '2 USB + SWITCH',
          title: '2 USB Ports with Dedicated Switch',
          detail:
            'Two USB output ports paired with a dedicated on/off switch on the front panel.',
        },
        '05': {
          shortTag: 'ON / OFF / STANDBY',
          title: '3-Position Main Switch',
          detail:
            'ON enables battery outputs. OFF disables outputs while charging works. STANDBY charges on mains and switches pre-selected outputs ON automatically when mains fails.',
        },
        '06': {
          shortTag: '8–10 KG HANDLE',
          title: 'Top Carry Handle (Approx. 8–10 kg)',
          detail:
            'Approx. 8–10 kg portable unit with a top carry handle for moving between rooms.',
        },
        '07': {
          shortTag: '220 V AC · 500 W MAX',
          title: '220 V AC Outlet + Switch / Breaker',
          detail:
            'Runs from the battery inverter up to 500 W with its own switch/breaker. Never connect to house wiring or wall sockets.',
        },
        '08': {
          shortTag: '12 V DC TERMINALS',
          title: '12 V DC Terminals + Switch & Breaker',
          detail:
            'Dedicated 12 V DC terminals with switch and breaker. 12 V DC loads run longer than AC loads.',
        },
        '09': {
          shortTag: 'SOLAR 15–24 V · 250 W',
          title: 'Solar Input (15–24 V DC · Max 10 A · Max 250 W)',
          detail:
            'Direct DC solar charging terminals rated 15–24 V DC, max 10 A, max 250 W.',
        },
        '10': {
          shortTag: '220 V AC CHARGE + FUSE',
          title: '220 V AC Charging Input + Fuse',
          detail:
            '220 V AC mains charging port with protective fuse. Never bypass the fuse or breaker.',
        },
        '11': {
          shortTag: 'PTC RESET & AIR VENT',
          title: 'PTC Reset & Rear Air Vent',
          detail:
            'Resettable PTC protection plus cooling air vent. Use in a dry, ventilated place and never block the vent.',
        },
      } as Record<string, HotspotText>,
    },
    calc: {
      kicker: '04 / RUNTIME CALCULATOR',
      title: 'How long will 600 Wh run your room?',
      subtitle:
        'Edit watts or step appliance counts. Uses an 85% efficiency factor (510 Wh usable from 600 Wh).',
      totalLoad: 'Total Load',
      estimatedTime: 'Estimated Runtime',
      idleText: 'Select an appliance to calculate',
      roughly: 'Roughly',
      hrs: 'hrs',
      min: 'min',
      maxLabel: 'MAX',
      dcBadge: '12V DC',
      overloadTitle: 'Over 500 W Limit',
      overloadBody:
        'Connected load exceeds the 500 W maximum output. Remove or reduce appliances.',
      dcNote:
        '12 V DC loads run longer: plugging 12 V DC fans or routers into the rear 12 V DC terminals avoids AC inverter losses.',
      disclaimer:
        'Estimate only (official [RUNTIME DATA] TBC). Actual runtime depends on device draw and room conditions.',
      standbyNoteTitle: 'Using STANDBY with this load',
      standbyNoteBody:
        'Set Main Switch to STANDBY with selected outputs switched on. While mains is present, outputs stay OFF and the battery charges. When mains fails, selected outputs turn ON automatically.',
      addCustom: 'Add Device',
      customName: 'Device name',
      customWattsAria: 'Custom device watts',
      decreaseLabel: 'Decrease',
      increaseLabel: 'Increase',
      removeLabel: 'Remove',
      watts: 'W',
      presets: {
        'led-bulb': 'LED Bulb',
        'dc-fan': '12 V DC Fan',
        'ac-fan': 'AC Ceiling / Bracket Fan',
        router: 'Wi-Fi Router',
        phone: 'Phone Charging (USB)',
        laptop: 'Laptop Charger',
        tv: 'LED TV',
      } as Record<string, string>,
    },
    flow: {
      kicker: '05 / HOW IT WORKS',
      title: 'Wall, solar, and the 3-position switch.',
      subtitle:
        'Toggle mains power and the 3-position switch to trace where power flows. Note: NOT a UPS and NO mains pass-through.',
      ariaMains: 'Mains power status',
      ariaSwitch: 'Main power switch mode',
      mainsOn: 'Mains Present',
      mainsOff: 'Mains Failed',
      solarOn: 'Solar: ON',
      solarOff: 'Solar: OFF',
      activeInput: 'ACTIVE INPUT',
      noMains: 'NO MAINS',
      solarCharging: 'SOLAR CHARGING',
      optionalSolar: 'OPTIONAL SOLAR',
      switchPrefix: 'SWITCH',
      switchModes: {
        ON: 'ON',
        OFF: 'OFF',
        STANDBY: 'STANDBY',
      },
      switchModesTable: {
        ON: 'ON',
        OFF: 'OFF',
        STANDBY: 'STANDBY',
      },
      chargingStatus: 'CHARGING',
      batteryOnlyStatus: 'BATTERY ONLY',
      outputsOnStatus: 'BATTERY OUTPUTS ON',
      outputsOffStatus: 'OUTPUTS OFF',
      mainsOnTag: 'MAINS ON',
      mainsCutTag: 'MAINS CUT',
      wallInput: '220 V AC Wall Input',
      solarInput: 'Solar 15–24 V DC (Max 10 A / 250 W)',
      unitBox: 'ECOPOWER KNB-EP060050C (600 Wh)',
      loadBox: '220 V AC (500 W) · 12 V DC · USB',
      notUpsNote:
        'Honest note: This unit is NOT a UPS and has NO mains pass-through. Never expect instant or zero-delay switchover.',
      tableHeaders: ['Switch Position', 'With Mains Present', 'When Mains Fails'],
      rows: [
        {
          mode: 'ON' as const,
          withMains: 'Battery outputs are available; runs from battery while mains keeps it topped up.',
          withoutMains: 'Battery outputs continue running from battery.',
        },
        {
          mode: 'OFF' as const,
          withMains: 'Outputs disabled; charging still works (best setting for charging).',
          withoutMains: 'All outputs disabled.',
        },
        {
          mode: 'STANDBY' as const,
          withMains: 'Outputs stay OFF and the battery charges.',
          withoutMains: 'Pre-selected outputs switch ON automatically; switch OFF again when mains returns.',
        },
      ],
    },
    specs: {
      kicker: '06 / PRINTED DATASHEET',
      title: 'Confirmed specifications only.',
      subtitle:
        'Unpublished data is marked TBC rather than guessed. Every published number below is verified hardware fact.',
      tableHeaderLeft: 'Parameter',
      tableHeaderRight: 'KNB-EP060050C Spec',
      rows: [
        ['Model', 'ECOPOWER KNB-EP060050C', true],
        ['Battery Capacity', '600 Wh Lithium', true],
        ['Max Continuous Output', '500 W (220 V AC Outlet w/ Switch & Breaker)', true],
        ['Weight & Carry', 'Approx. 8–10 kg · Top Carry Handle', true],
        ['Front Panel Controls', '5 Status Lights (Full, Med, Low, Standby, Charging) · LED Lamp + Dimmer · Variable Blower Fan + Dimmer · 2 USB w/ Switch · 3-Pos Main Switch', true],
        ['Rear Outputs', '220 V AC Outlet + Breaker · 12 V DC Terminals + Switch/Breaker', true],
        ['Solar Charging Input', '15–24 V DC · Max 10 A · Max 250 W', true],
        ['AC Charging & Protection', '220 V AC Input w/ Fuse · PTC Reset · Air Vent (Never block)', true],
        ['Origin & Patent', 'Designed in California, USA · Made in Karachi, Pakistan · Patented Design', true],
        ['Price', formatPricePkr('en'), true],
      ] as Array<[string, string, boolean]>,
    },
    comparison: {
      kicker: '07 / HONEST COMPARISON',
      title: 'ECOPOWER vs. Petrol Generator vs. Standard UPS.',
      columns: ['Criteria', 'ECOPOWER KNB-EP060050C', 'Petrol Generator', 'Standard UPS'],
      rows: [
        ['Noise & Fumes', 'Silent · No fuel · No fumes', 'Loud engine · Exhaust fumes', 'Quiet · Lead-acid fumes'],
        ['Apartment Use', 'Indoors safe (dry, ventilated place)', 'Outdoor/balcony only; noisy', 'Requires wall wiring'],
        ['Solar Input', 'Built-in (15–24 V DC, max 250 W)', 'No', 'Only hybrid models'],
        ['Mains Pass-Through (UPS)', 'NO — NOT a UPS; runs from battery', 'No', 'Yes — near-instant pass-through'],
      ],
    },
    karachi: {
      kicker: '08 / MADE IN KARACHI',
      title: 'Kazi & Brothers Group of Companies.',
      originLine: 'Patented Design · Designed in California, USA · Made in Karachi, Pakistan',
      patentStamp: 'PATENTED DESIGN',
      sceneCaption: 'Built for Clifton, DHA, Gulshan, Nazimabad, Saddar, and Korangi flats.',
      altRearScene: 'ECOPOWER KNB-EP060050C rear ports in home placement',
      storyPlaceholder:
        '[Kazi & Brothers story placeholder — insert heritage & Karachi manufacturing story]',
    },
    faq: {
      kicker: '09 / FAQ & SAFETY',
      title: 'Plain answers before you buy.',
      safetyTitle: 'Critical Safety & Flicker Warning',
      safetyBody:
        'If the unit or connected devices flicker on/off every 0.5–1 second, turn the system OFF, disconnect loads, and recharge; if it continues, stop use and contact service. Use in a dry, ventilated place; keep the air vent clear; keep total load within 500 W; never connect the AC output to house wiring or a wall socket; never bypass the fuse or breaker.',
      items: [
        {
          q: 'Can it run a refrigerator?',
          a: 'Continuous output is 500 W and the surge rating is TBC. Because fridge compressors draw high startup surges, do not assume it will start a full-size fridge until surge ratings are published.',
        },
        {
          q: 'Can it run an air conditioner?',
          a: 'No. Air conditioners require well over 500 W. Use ECOPOWER for fans, lights, routers, phones, and laptops.',
        },
        {
          q: 'How long does it take to charge?',
          a: 'Charge time is TBC. For best charging on 220 V mains, turn the Main Switch to OFF so outputs stay disabled while charging.',
        },
        {
          q: 'Is it safe to use indoors?',
          a: 'Yes—no fuel, no fumes, and silent. Place it in a dry, ventilated spot and never block the rear air vent.',
        },
        {
          q: 'How does solar input work?',
          a: 'Connect panels rated 15–24 V DC, max 10 A, max 250 W to the rear Solar Input terminals. Connector pinout details are TBC.',
        },
        {
          q: 'What is the PTC Reset button?',
          a: 'PTC Reset is a resettable overload/thermal protector on the rear panel. If triggered, switch OFF, reduce load, let cool, and press PTC Reset.',
        },
        {
          q: 'Is it a UPS with instant switchover?',
          a: 'No. It is NOT a UPS and has NO mains pass-through. Switchover delay in STANDBY is TBC—never rely on it for instant zero-delay switchover.',
        },
        {
          q: 'What does STANDBY do, and what if devices flicker every 0.5–1 second?',
          a: 'In STANDBY, while mains is present, outputs stay OFF and the battery charges; when mains fails, pre-selected outputs switch ON automatically and switch OFF again when mains returns. Warning: if the unit or connected devices flicker on/off every 0.5–1 second, turn the system OFF, disconnect loads, recharge, and contact service if it continues.',
        },
      ],
    },
    contact: {
      kicker: '10 / DIRECT ORDER',
      heading: 'Ready to order? Talk to us directly.',
      subline: 'Message or call us now. We reply fast and deliver in Karachi.',
      whatsappBtn: 'Order on WhatsApp',
      callBtn: 'Call Now',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      prefillMessage: 'Hi, I want to order the ECOPOWER KNB-EP060050C.',
    },
    footer: {
      line: 'ECOPOWER KNB-EP060050C · Kazi & Brothers Group of Companies · Designed in California · Made in Karachi',
      safety: 'Dry ventilated use · Max 500 W · Never connect AC output to house wiring or wall sockets.',
      whatsappLabel: 'WhatsApp',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
    },
  },

  ur: {
    meta: {
      title: 'ECOPOWER KNB-EP060050C — کراچی میں تیار 600 Wh بیک اپ پاور',
      description:
        'کراچی کی لوڈشیڈنگ کے لیے 600 Wh / 500 W خاموش لتھیم بیٹری بیک اپ جنریٹر۔ نہ پیٹرول، نہ دھواں، خودکار STANDBY اور Solar سپورٹ۔ قاضی اینڈ برادرز کی پیشکش۔',
    },
    nav: {
      brand: 'ECOPOWER',
      ariaLabel: 'بنیادی نیویگیشن',
      mobileMenuAria: 'موبائل نیویگیشن',
      menuOpenLabel: 'مینو کھولیں',
      menuCloseLabel: 'مینو بند کریں',
      features: 'معائنہ',
      calculator: 'رن ٹائم',
      howItWorks: 'سوئچ لاجک',
      specs: 'تفصیلات',
      faq: 'سوالات',
      contact: 'رابطہ',
      orderCta: 'WhatsApp پر آرڈر',
      orderCtaShort: 'WhatsApp',
      callCta: 'ابھی کال کریں',
    },
    hero: {
      ariaLangToggle: 'زبان منتخب کریں',
      clockLabel: 'لوڈشیڈنگ ٹائمر',
      stampCut: 'لوڈشیڈنگ',
      stampPower: 'بیک اپ فعال',
      stampStandby: 'اگلی لوڈشیڈنگ کا انتظار',
      headlineLine1: 'بجلی جائے،',
      headlineLine2: 'روشنی نہ جائے۔',
      echoLine: 'Bijli jaye, roshni na jaye.',
      subhead:
        '600 Wh / 500 W خاموش لتھیم بیک اپ۔ نہ پیٹرول، نہ دھواں۔ پنکھوں، لائٹس، Wi-Fi اور فونز کے لیے۔',
      switchLabel: '3 پوزیشن مین سوئچ',
      switchModes: {
        ON: 'آن',
        OFF: 'آف',
        STANDBY: 'اسٹینڈ بائی',
      },
      ctaPrimary: 'WhatsApp پر آرڈر کریں',
      ctaSecondary: 'چلنے کا وقت دیکھیں',
      trustLine: 'کیلیفورنیا میں ڈیزائن · کراچی میں تیار',
      altUnit: 'ECOPOWER KNB-EP060050C 600 Wh لتھیم بیٹری بیک اپ جنریٹر',
    },
    problem: {
      kicker: '02 / کراچی کی حقیقت',
      frames: [
        { num: '01', place: 'گلشن · رات 2:15', line: 'آدھی رات کو پنکھا رک جاتا ہے۔' },
        { num: '02', place: 'DHA · کلائنٹ کال', line: 'بات کے بیچ Wi-Fi بند ہو جاتا ہے۔' },
        { num: '03', place: 'ناظم آباد · امتحان', line: 'گرم ٹارچ کی روشنی میں بچوں کی پڑھائی۔' },
        { num: '04', place: 'کلفٹن · 40°C گرمی', line: 'فریج کا دروازہ کھولنے کا ڈر۔' },
        { num: '05', place: 'صدر · بالکونی', line: 'جنریٹر کا شور اور دھواں۔' },
      ],
    },
    tour: {
      kicker: '03 / تفصیلی معائنہ',
      title: 'ہر سوئچ، پورٹ اور ڈمر خود دیکھیں۔',
      subtitle:
        'کسی بھی نمبر پر کلک کریں، کی بورڈ کے تیر استعمال کریں، یا فرنٹ اور بیک پینل بدلیں۔',
      ariaPanelView: 'یونٹ پینل منتخب کریں',
      frontBtn: 'فرنٹ پینل',
      rearBtn: 'بیک پینل',
      resetBtn: 'پورا یونٹ',
      prevBtn: 'پچھلا کنٹرول',
      nextBtn: 'اگلا کنٹرول',
      kbHint: 'کیز: ← → اگلا · Esc ری سیٹ',
      closeNote: 'تفصیل بند کریں',
      altFront: 'ECOPOWER KNB-EP060050C فرنٹ پینل',
      altRear: 'ECOPOWER KNB-EP060050C بیک پینل',
      hotspots: {
        '01': {
          shortTag: '5 اسٹیٹس لائٹس',
          title: '5 بیٹری اور اسٹیٹس لائٹس',
          detail:
            'فل، درمیانی، کم، اسٹینڈ بائی اور چارجنگ کی حالت دکھانے والی 5 واضح لائٹس۔',
        },
        '02': {
          shortTag: 'LED لیمپ + ڈمر',
          title: 'بلٹ ان LED لیمپ ڈمر کے ساتھ',
          detail:
            'سامنے نصب LED لیمپ اور روشنی کم یا تیز کرنے کے لیے اس کا اپنا ڈمر نوب۔',
        },
        '03': {
          shortTag: 'بلور فین + ڈمر',
          title: 'اسپیڈ ڈمر والا بلٹ ان بلور فین',
          detail:
            'جالی کے پیچھے بلٹ ان بلور فین جس کی رفتار اپنے الگ ڈمر سے کنٹرول ہوتی ہے۔',
        },
        '04': {
          shortTag: '2 USB + سوئچ',
          title: '2 USB پورٹس الگ سوئچ کے ساتھ',
          detail:
            'فون اور چھوٹے آلات کے لیے دو USB پورٹس، اپنے الگ آن/آف سوئچ کے ساتھ۔',
        },
        '05': {
          shortTag: 'آن / آف / اسٹینڈ بائی',
          title: '3 پوزیشن مین سوئچ',
          detail:
            'ON پر بیٹری آؤٹ پٹس چلتے ہیں، OFF پر آؤٹ پٹس بند اور چارجنگ جاری رہتی ہے، STANDBY پر بجلی جاتے ہی منتخب آؤٹ پٹس خودکار آن ہو جاتے ہیں۔',
        },
        '06': {
          shortTag: 'کیری ہینڈل (8–10 kg)',
          title: 'اوپری ہینڈل (تقریباً 8–10 kg)',
          detail:
            'تقریباً 8 سے 10 kg وزن اور مضبوط ہینڈل تاکہ ایک کمرے سے دوسرے کمرے میں آسانی سے لے جائیں۔',
        },
        '07': {
          shortTag: '220 V AC · 500 W تک',
          title: '220 V AC ساکٹ، سوئچ اور بریکر',
          detail:
            'بیٹری انورٹر سے 500 W تک چلتا ہے اور اس کا اپنا سوئچ اور بریکر ہے۔ اسے کبھی گھر کی وائرنگ یا وال ساکٹ سے مت جوڑیں۔',
        },
        '08': {
          shortTag: '12 V DC ٹرمینلز',
          title: '12 V DC ٹرمینلز، سوئچ اور بریکر',
          detail:
            'سوئچ اور بریکر کے ساتھ 12 V DC ٹرمینلز۔ 12 V DC آلات AC کے مقابلے میں زیادہ دیر چلتے ہیں۔',
        },
        '09': {
          shortTag: 'Solar 15–24 V · 250 W',
          title: 'Solar ان پٹ (15–24 V DC · زیادہ سے زیادہ 10 A / 250 W)',
          detail:
            'Solar پینل سے چارجنگ کے لیے ٹرمینلز: 15 سے 24 V DC، زیادہ سے زیادہ 10 A، 250 W۔',
        },
        '10': {
          shortTag: '220 V چارجنگ + فیوز',
          title: '220 V AC چارجنگ ان پٹ اور فیوز',
          detail:
            '220 V AC بجلی سے چارجنگ کا پورٹ حفاظتی فیوز کے ساتھ۔ فیوز یا بریکر کو کبھی بائی پاس نہ کریں۔',
        },
        '11': {
          shortTag: 'PTC ری سیٹ اور ایئر وینٹ',
          title: 'PTC ری سیٹ اور پچھلا ایئر وینٹ',
          detail:
            'اوور لوڈ حفاظت کے لیے PTC ری سیٹ بٹن اور ہوا کا وینٹ۔ خشک اور ہوا دار جگہ استعمال کریں اور وینٹ کبھی بند نہ کریں۔',
        },
      } as Record<string, HotspotText>,
    },
    calc: {
      kicker: '04 / رن ٹائم کیلکولیٹر',
      title: '600 Wh آپ کے کمرے میں کتنی دیر چلے گا؟',
      subtitle:
        'واٹ یا تعداد تبدیل کریں۔ حساب 85 فیصد کارکردگی (600 Wh میں سے 510 Wh قابلِ استعمال) پر مبنی ہے۔',
      totalLoad: 'کل لوڈ',
      estimatedTime: 'متوقع وقت',
      idleText: 'وقت جاننے کے لیے کوئی آلہ منتخب کریں',
      roughly: 'تقریباً',
      hrs: 'گھنٹے',
      min: 'منٹ',
      maxLabel: 'زیادہ سے زیادہ',
      dcBadge: '12V DC',
      overloadTitle: '500 W کی حد سے زیادہ لوڈ',
      overloadBody: 'کل لوڈ 500 W کی زیادہ سے زیادہ حد سے زیادہ ہے۔ براہِ کرم کچھ آلات کم کریں۔',
      dcNote:
        '12 V DC آلات زیادہ دیر چلتے ہیں: 12 V DC پنکھے یا راؤٹر پچھلے 12 V DC ٹرمینلز پر لگانے سے AC انورٹر کا نقصان نہیں ہوتا۔',
      disclaimer:
        'یہ صرف اندازہ ہے (مستند [RUNTIME DATA] کی تصدیق جاری ہے)۔ اصل وقت آلات کی کھپت اور ماحول پر منحصر ہے۔',
      standbyNoteTitle: 'اس لوڈ کے ساتھ STANDBY موڈ',
      standbyNoteBody:
        'مین سوئچ STANDBY پر رکھیں اور منتخب آؤٹ پٹس آن چھوڑ دیں۔ جب تک بجلی موجود ہے آؤٹ پٹ بند رہتے ہیں اور بیٹری چارج ہوتی ہے؛ بجلی جاتے ہی منتخب آلات خودکار آن ہو جاتے ہیں۔',
      addCustom: 'آلہ شامل کریں',
      customName: 'آلے کا نام',
      customWattsAria: 'آلے کے واٹ',
      decreaseLabel: 'کم کریں',
      increaseLabel: 'بڑھائیں',
      removeLabel: 'ہٹائیں',
      watts: 'W',
      presets: {
        'led-bulb': 'ایل ای ڈی بلب',
        'dc-fan': '12 V DC پنکھا',
        'ac-fan': 'AC چھت / بریکٹ پنکھا',
        router: 'Wi-Fi راؤٹر',
        phone: 'فون چارجنگ (USB)',
        laptop: 'لیپ ٹاپ چارجر',
        tv: 'LED TV',
      } as Record<string, string>,
    },
    flow: {
      kicker: '05 / طریقہ کار',
      title: 'بجلی، Solar اور 3 پوزیشن سوئچ۔',
      subtitle:
        'مینز کی حالت اور 3 پوزیشن سوئچ بدل کر پاور فلو دیکھیں۔ یاد رہے: یہ UPS نہیں اور نہ ہی اس میں مینز پاس تھرو ہے۔',
      ariaMains: 'مینز بجلی کی حالت',
      ariaSwitch: 'مین پاور سوئچ موڈ',
      mainsOn: 'بجلی موجود ہے',
      mainsOff: 'بجلی بند ہے',
      solarOn: 'Solar: آن',
      solarOff: 'Solar: آف',
      activeInput: 'ان پٹ فعال',
      noMains: 'بجلی بند',
      solarCharging: 'Solar چارجنگ جاری',
      optionalSolar: 'اختیاری Solar',
      switchPrefix: 'سوئچ',
      switchModes: {
        ON: 'آن',
        OFF: 'آف',
        STANDBY: 'اسٹینڈ بائی',
      },
      switchModesTable: {
        ON: 'ON (آن)',
        OFF: 'OFF (آف)',
        STANDBY: 'STANDBY (اسٹینڈ بائی)',
      },
      chargingStatus: 'چارجنگ جاری',
      batteryOnlyStatus: 'صرف بیٹری',
      outputsOnStatus: 'بیٹری آؤٹ پٹس آن',
      outputsOffStatus: 'آؤٹ پٹس بند',
      mainsOnTag: 'بجلی آن',
      mainsCutTag: 'لوڈشیڈنگ',
      wallInput: '220 V AC دیوار کا ساکٹ',
      solarInput: 'Solar 15–24 V DC (زیادہ سے زیادہ 10 A / 250 W)',
      unitBox: 'ECOPOWER KNB-EP060050C (600 Wh)',
      loadBox: '220 V AC (500 W) · 12 V DC · USB',
      notUpsNote:
        'واضح نوٹ: یہ یونٹ UPS نہیں ہے اور اس میں مینز پاس تھرو نہیں۔ فوری یا زیرو ڈیلے سوئچ اوور کی توقع نہ رکھیں۔',
      tableHeaders: ['سوئچ پوزیشن', 'بجلی موجود ہونے پر', 'بجلی جانے پر'],
      rows: [
        {
          mode: 'ON' as const,
          withMains: 'بیٹری آؤٹ پٹس دستیاب رہتے ہیں؛ بیٹری سے چلتے ہیں جبکہ مینز اسے چارج رکھتی ہے۔',
          withoutMains: 'بیٹری آؤٹ پٹس بیٹری سے چلتے رہتے ہیں۔',
        },
        {
          mode: 'OFF' as const,
          withMains: 'آؤٹ پٹس بند رہتے ہیں؛ چارجنگ جاری رہتی ہے (چارجنگ کے لیے بہترین سیٹنگ)۔',
          withoutMains: 'تمام آؤٹ پٹس بند رہتے ہیں۔',
        },
        {
          mode: 'STANDBY' as const,
          withMains: 'آؤٹ پٹس بند رہتے ہیں اور بیٹری چارج ہوتی ہے۔',
          withoutMains: 'پہلے سے منتخب آؤٹ پٹس خودکار آن ہو جاتے ہیں اور بجلی آنے پر دوبارہ بند ہو جاتے ہیں۔',
        },
      ],
    },
    specs: {
      kicker: '06 / پرنٹڈ ڈیٹا شیٹ',
      title: 'صرف تصدیق شدہ تفصیلات۔',
      subtitle: 'جو تفصیلات شائع نہیں ہوئیں وہ اندازے کے بجائے TBC لکھی گئی ہیں۔',
      tableHeaderLeft: 'تفصیل',
      tableHeaderRight: 'KNB-EP060050C اسپیسیفیکیشن',
      rows: [
        ['ماڈل', 'ECOPOWER KNB-EP060050C', true],
        ['بیٹری گنجائش', '600 Wh لتھیم', true],
        ['زیادہ سے زیادہ مسلسل آؤٹ پٹ', '500 W (220 V AC آؤٹ لیٹ، سوئچ اور بریکر کے ساتھ)', true],
        ['وزن اور سہولت', 'تقریباً 8–10 kg · اوپری کیری ہینڈل', true],
        ['فرنٹ پینل کنٹرولز', '5 اسٹیٹس لائٹس (فل، درمیانی، کم، اسٹینڈ بائی، چارجنگ) · LED لیمپ + ڈمر · بلور فین + ڈمر · 2 USB پورٹس (الگ سوئچ کے ساتھ) · 3 پوزیشن مین سوئچ', true],
        ['پچھلے آؤٹ پٹس', '220 V AC آؤٹ لیٹ + بریکر · 12 V DC ٹرمینلز + سوئچ اور بریکر', true],
        ['Solar چارجنگ ان پٹ', '15–24 V DC · زیادہ سے زیادہ 10 A · 250 W', true],
        ['AC چارجنگ اور حفاظت', '220 V AC ان پٹ حفاظتی فیوز کے ساتھ · PTC ری سیٹ · ایئر وینٹ (کبھی بند نہ کریں)', true],
        ['تیاری اور پیٹنٹ', 'کیلیفورنیا، امریکہ میں ڈیزائن · کراچی، پاکستان میں تیار · پیٹنٹ شدہ ڈیزائن', true],
        ['قیمت', formatPricePkr('ur'), true],
      ] as Array<[string, string, boolean]>,
    },
    comparison: {
      kicker: '07 / دیانتدارانہ موازنہ',
      title: 'ECOPOWER بمقابلہ پیٹرول جنریٹر اور عام UPS۔',
      columns: ['پیمانہ', 'ECOPOWER KNB-EP060050C', 'پیٹرول جنریٹر', 'عام UPS'],
      rows: [
        ['شور اور دھواں', 'بالکل خاموش · نہ پیٹرول نہ دھواں', 'تیز شور · دھواں', 'خاموش · تیزاب کی بو'],
        ['فلیٹ میں استعمال', 'گھر کے اندر محفوظ (خشک، ہوا دار جگہ)', 'صرف باہر یا بالکونی میں', 'مکمل وائرنگ درکار'],
        ['Solar ان پٹ', 'بلٹ ان (15–24 V DC، 250 W تک)', 'نہیں', 'صرف ہائبرڈ ماڈلز'],
        ['مینز پاس تھرو (UPS)', 'نہیں — یہ UPS نہیں؛ بیٹری سے چلتا ہے', 'نہیں', 'ہاں — فوری پاس تھرو'],
      ],
    },
    karachi: {
      kicker: '08 / میڈ اِن کراچی',
      title: 'قاضی اینڈ برادرز گروپ آف کمپنیز۔',
      originLine: 'پیٹنٹ شدہ ڈیزائن · کیلیفورنیا، امریکہ میں ڈیزائن · کراچی، پاکستان میں تیار',
      patentStamp: 'پیٹنٹ شدہ ڈیزائن',
      sceneCaption: 'کلفٹن، DHA، گلشن، ناظم آباد، صدر اور کورنگی کے فلیٹس اور گھروں کے لیے۔',
      altRearScene: 'گھر میں استعمال کے دوران ECOPOWER KNB-EP060050C کا پچھلا پینل',
      storyPlaceholder:
        '[قاضی اینڈ برادرز کی کہانی کی جگہ — کمپنی کی تاریخ اور کراچی میں تیاری کی تفصیل یہاں شامل کریں]',
    },
    faq: {
      kicker: '09 / سوالات اور حفاظت',
      title: 'خریدنے سے پہلے واضح جوابات۔',
      safetyTitle: 'اہم حفاظتی اور فلکر انتباہ',
      safetyBody:
        'اگر یونٹ یا اس سے جڑے آلات ہر 0.5 سے 1 سیکنڈ میں بند اور آن (فلکر) ہوں تو فوراً سسٹم OFF کریں، تمام لوڈ الگ کریں اور ری چارج کریں؛ اگر مسئلہ برقرار رہے تو استعمال بند کر کے سروس سینٹر سے رابطہ کریں۔ ہمیشہ خشک اور ہوا دار جگہ استعمال کریں؛ ایئر وینٹ کھلا رکھیں؛ کل لوڈ 500 W کے اندر رکھیں؛ AC آؤٹ پٹ کو کبھی گھر کی وائرنگ یا وال ساکٹ سے مت جوڑیں؛ فیوز یا بریکر کو بائی پاس نہ کریں۔',
      items: [
        {
          q: 'کیا یہ فریج چلا سکتا ہے؟',
          a: 'مسلسل آؤٹ پٹ 500 W ہے اور سرج ریٹنگ TBC ہے۔ فریج کا کمپریسر اسٹارٹ ہوتے وقت زیادہ سرج لیتا ہے، اس لیے سرج ریٹنگ شائع ہونے سے پہلے بڑا فریج چلانے کی امید نہ رکھیں۔',
        },
        {
          q: 'کیا یہ اے سی چلا سکتا ہے؟',
          a: 'نہیں۔ ایئر کنڈیشنر 500 W سے کہیں زیادہ بجلی لیتے ہیں۔ ECOPOWER پنکھوں، لائٹس، راؤٹر، فونز اور لیپ ٹاپ کے لیے بنایا گیا ہے۔',
        },
        {
          q: 'چارج ہونے میں کتنا وقت لگتا ہے؟',
          a: 'چارجنگ کا وقت TBC ہے۔ 220 V مینز پر بہترین چارجنگ کے لیے مین سوئچ OFF پر رکھیں تاکہ چارجنگ کے دوران آؤٹ پٹس بند رہیں۔',
        },
        {
          q: 'کیا کمرے کے اندر استعمال کرنا محفوظ ہے؟',
          a: 'جی ہاں—اس میں پیٹرول یا دھواں نہیں اور یہ بالکل خاموش ہے۔ بس اسے خشک اور ہوا دار جگہ رکھیں اور پچھلا ایئر وینٹ کھلا رکھیں۔',
        },
        {
          q: 'Solar چارجنگ کیسے کام کرتی ہے؟',
          a: 'پچھلے Solar ٹرمینلز پر 15 تا 24 V DC (زیادہ سے زیادہ 10 A، 250 W) کا Solar پینل لگایا جا سکتا ہے۔ کنیکٹر پن آؤٹ کی تفصیل TBC ہے۔',
        },
        {
          q: 'پچھلے پینل پر PTC Reset بٹن کس لیے ہے؟',
          a: 'PTC Reset پچھلے پینل پر دوبارہ سیٹ ہونے والا پروٹیکشن بٹن ہے۔ ٹرپ ہونے کی صورت میں سوئچ بند کر کے لوڈ کم کریں، ٹھنڈا ہونے دیں، اور پھر PTC Reset دبائیں۔',
        },
        {
          q: 'کیا یہ فوری سوئچ اوور والا UPS ہے؟',
          a: 'نہیں۔ یہ UPS نہیں ہے اور نہ ہی اس میں مینز پاس تھرو ہے۔ STANDBY میں سوئچ اوور تاخیر TBC ہے، اس لیے زیرو ڈیلے کی توقع نہ رکھیں۔',
        },
        {
          q: 'STANDBY کیا کرتا ہے، اور اگر آلات 0.5–1 سیکنڈ میں فلکر کریں تو کیا کریں؟',
          a: 'STANDBY میں بجلی موجود رہنے تک آؤٹ پٹ بند رہتے ہیں اور بیٹری چارج ہوتی ہے؛ بجلی جاتے ہی منتخب آؤٹ پٹس خودکار آن ہو جاتے ہیں اور بجلی واپس آنے پر بند ہو جاتے ہیں۔ انتباہ: اگر یونٹ یا آلات ہر 0.5–1 سیکنڈ میں بند/آن ہوں تو فوراً OFF کریں، لوڈ الگ کریں، ری چارج کریں اور مسئلہ جاری رہنے پر سروس سے رابطہ کریں۔',
        },
      ],
    },
    contact: {
      kicker: '10 / براہِ راست رابطہ',
      heading: 'آرڈر کرنا ہے؟ سیدھا ہم سے بات کریں۔',
      subline: 'ابھی میسج یا کال کریں۔ ہم جلد جواب دیتے ہیں اور کراچی میں ڈیلیور کرتے ہیں۔',
      whatsappBtn: 'WhatsApp پر آرڈر کریں',
      callBtn: 'ابھی کال کریں',
      phoneLabel: 'فون',
      emailLabel: 'ای میل',
      prefillMessage: 'السلام علیکم، مجھے ECOPOWER KNB-EP060050C آرڈر کرنا ہے۔',
    },
    footer: {
      line: 'ECOPOWER KNB-EP060050C · قاضی اینڈ برادرز گروپ آف کمپنیز · کیلیفورنیا میں ڈیزائن · کراچی میں تیار',
      safety: 'خشک اور ہوا دار جگہ استعمال کریں · زیادہ سے زیادہ 500 W · گھر کی وائرنگ میں ہرگز نہ جوڑیں۔',
      whatsappLabel: 'WhatsApp',
      phoneLabel: 'فون',
      emailLabel: 'ای میل',
    },
  },
} as const;
