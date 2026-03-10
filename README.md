# authr. website

## Setup (one time, ~3 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev
```

Then open http://localhost:3000 — site is live.

---

## Adding your media

### Belt strip (hero scrolling images)
Drop files into: `public/assets/belt/`
Name them: `img-01.jpg`, `img-02.jpg` … (11 already in data/clients.js)

Then open `src/data/clients.js` and add to the `beltImages` array.

### Case study photos
Drop files into: `public/assets/clients/<slug>/photos/`
Name them: `photo-01.jpg` → `photo-20.jpg`

Then in `src/data/clients.js`, add filenames to the `photos` array for that client:
```js
photos: [
  'photo-01.jpg',
  'photo-02.jpg',
  // ...
],
```

### Case study reels (videos)
Drop files into: `public/assets/clients/<slug>/reels/`
Name them: `reel-01.mp4` → `reel-04.mp4`

Then add to the `reels` array:
```js
reels: [
  'reel-01.mp4',
  'reel-02.mp4',
  'reel-03.mp4',
  'reel-04.mp4',
],
```

### Case study hero image
Drop `hero.jpg` into: `public/assets/clients/<slug>/`
It will appear automatically (path is already set in clients.js).

---

## Folder slugs
| Client | Slug |
|---|---|
| Candace & Basil | `candace-basil` |
| Lux Car Hire | `lux-car-hire` |
| Freshman Barbershop | `freshman-barbershop` |

---

## Deploy to Vercel (free, ~2 minutes)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel
```

Follow the prompts — it asks you to log in (or create a free account), then deploys automatically. You get a live URL like `authr-website.vercel.app`.

For a custom domain (authr.ca etc.), go to your Vercel dashboard → Project → Settings → Domains.

---

## Updating content
All copy and case study data lives in one file: `src/data/clients.js`
Edit brief, approach, pillars, tags, year there — no other files need touching.
# authr-website
