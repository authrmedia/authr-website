// ─────────────────────────────────────────────
//  authr. — client data
//  Edit this file to update case study content.
//  Add/remove photo and reel filenames as you
//  drop files into public/assets/clients/<slug>/
// ─────────────────────────────────────────────

export const clients = [
  {
    id: 0,
    slug: 'candace-basil',
    num: '01',
    name: 'Candace & Basil',
    nameDisplay: ['Candace', '& Basil'],
    year: '2022 — ongoing',
    service: 'Brand Content · Social Strategy · Video Production',
    tags: ['Brand Content', 'Social Growth'],
    previewText: 'Candace & Basil — Furniture & Lifestyle',
    // Hero image: public/assets/clients/candace-basil/hero.jpg
    hero: '/assets/clients/candace-basil/hero.jpg',
    brief: "Candace & Basil had already built a reputation. Three years of trust, a loyal customer base, and a second retail location on the horizon. The challenge wasn't visibility — it was depth. How do you evolve a brand without abandoning the foundations that made people love it?",
    approach: "We didn't reinvent. We amplified. Working within the established design philosophy, we developed a content language that elevated each product to the status of an art object. Furniture isn't furniture — it's the decision to make a house feel like home.",
    pillars: [
      { num: '001', title: 'Craftsmanship-First Framing', desc: 'Smooth camera movement, organised background sets, and intentional negative space made every product the sole subject of attention.' },
      { num: '002', title: 'Language as Atmosphere', desc: 'Scripted copy chosen to invoke calm, warmth, and domesticity. Words like weight, grain, and lived-in were not accidental.' },
      { num: '003', title: 'Content Pillars', desc: 'Themed content frameworks unified across platforms — from in-store editorial to short-form social, all under the same emotional throughline.' },
    ],
    // Add filenames as you drop files into public/assets/clients/candace-basil/
    photos: [
      // 'photo-01.jpg', 'photo-02.jpg', ... up to photo-20.jpg
    ],
    reels: [
      // 'reel-01.mp4', 'reel-02.mp4', 'reel-03.mp4', 'reel-04.mp4'
    ],
    photoCount: 20,
    reelCount: 4,
  },
  {
    id: 1,
    slug: 'lux-car-hire',
    num: '02',
    name: 'Lux Car Hire',
    nameDisplay: ['Lux', 'Car Hire'],
    year: '2023 — ongoing',
    service: 'Content Strategy · Community Marketing · Booking Funnel',
    tags: ['Content Strategy', 'Community Growth'],
    previewText: 'Lux Car Hire — Exotic Fleet, Ontario',
    hero: '/assets/clients/lux-car-hire/hero.jpg',
    brief: "A brand new entry into Ontario's exotic car rental market. No existing audience. No established reputation. But an exceptional fleet — Rolls-Royce Cullinan Black Badge, Urus Performante, Lamborghini Revuelto, Range Rover LWB — and the ambition to own the category.",
    approach: "We thought beyond the customer and targeted the community. Toronto's car culture is one of the most active in North America — passionate, visual, and hyper-connected. We made content built for that ecosystem: cinematic, city-rooted, shareable by design.",
    pillars: [
      { num: '001', title: 'Community Targeting', desc: "Shot at Toronto's highest-traffic car hotspots, making content that felt native to the culture rather than intrusive advertising." },
      { num: '002', title: 'Group-Chat Worthy', desc: 'Every piece was conceived with virality in mind — would someone screenshot and send this? If not, we went again.' },
      { num: '003', title: 'Booking Funnel Strategy', desc: 'Impression-led content mapped to a conversion architecture. Curiosity → desire → booking. Each stage had a clear job.' },
    ],
    photos: [
      // 'photo-01.jpg', ... 'photo-20.jpg'
    ],
    reels: [
      // 'reel-01.mp4', ... 'reel-04.mp4'
    ],
    photoCount: 20,
    reelCount: 4,
  },
  {
    id: 2,
    slug: 'freshman-barbershop',
    num: '03',
    name: 'Freshman Barbershop',
    nameDisplay: ['Freshman', 'Barbershop'],
    year: '2023 — ongoing',
    service: 'Social Strategy · Content Systems · Multi-Platform Distribution',
    tags: ['Social Strategy', 'Content Systems'],
    previewText: 'Freshman Barbershop — Streetsville, Mississauga',
    hero: '/assets/clients/freshman-barbershop/hero.jpg',
    brief: "Freshman Barbershop is a Streetsville institution. Locals know it. The culture is there. But their digital presence had fallen behind — inconsistent, reactive, and failing to reflect the community they'd built inside the shop.",
    approach: "We built an engine. Content principles, distribution frameworks, a posting cadence — and a signature format: podcast-style long-form interviews filmed in-shop, repurposed into short-form clips across every major platform. The barbershop as media company.",
    pillars: [
      { num: '001', title: 'Content Systems', desc: 'Documented frameworks that removed guesswork. Every post had a pillar, a purpose, and a platform — nothing was random.' },
      { num: '002', title: 'The Podcast Format', desc: 'Long-form interviews shot in the shop became a content mine — dozens of short clips from a single session across Instagram, TikTok, and YouTube Shorts.' },
      { num: '003', title: 'Multi-Platform Strategy', desc: 'Platform-native content for each channel. Not copy-paste — intentional adaptation. What works on TikTok, stays on TikTok.' },
    ],
    photos: [
      // 'photo-01.jpg', ... 'photo-20.jpg'
    ],
    reels: [
      // 'reel-01.mp4', ... 'reel-04.mp4'
    ],
    photoCount: 20,
    reelCount: 4,
  },
];

// Belt images — drop files into public/assets/belt/
// Already have img-01.jpg → img-11.jpg from Lux Car Hire shoot
export const beltImages = [
  '/assets/belt/img-01.jpg',
  '/assets/belt/img-02.jpg',
  '/assets/belt/img-03.jpg',
  '/assets/belt/img-04.jpg',
  '/assets/belt/img-05.jpg',
  '/assets/belt/img-06.jpg',
  '/assets/belt/img-07.jpg',
  '/assets/belt/img-08.jpg',
  '/assets/belt/img-09.jpg',
  '/assets/belt/img-10.jpg',
  '/assets/belt/img-11.jpg',
  // Add more: '/assets/belt/img-12.jpg', etc.
];
