## 🥷Animaxx 

Animaxx is a vibrant anime discovery hub where fans can explore, save, and share their favorite characters, UI designs, and creative inspirations. Built for developers and dreamers, it blends Pinterest-style visuals with full-stack functionality—perfect for showcasing anime art, building themed dashboards, and connecting through shared aesthetics.

## 📦Technology
- vite
- React
- Redux
- Java
- Spring Boot
- Gsap
- SQL

## ✨Features
Here what you can do with Animaxx

👤 Account & Community
- Free Account Creation → Anyone can join instantly without barriers.
- Profile Building → Showcase your anime interests, posts, and artwork.
- Friendship & Networking → Connect with fellow anime enthusiasts worldwide.
🎨 Content Creation & Sharing
- Upload Posts → Share anime art, thoughts, or creative projects.
- Showcase Your Artwork → Build a portfolio and gain recognition.
- Explore New Anime Content → Discover fresh ideas, styles, and inspir
📥 Media Access
- Download High‑Quality Images → Access crisp, detailed visuals.
- Dual Image Storage → Compressed previews for speed, originals for detail.
💬 Engagement & Interaction
- Like Posts → Support your favorite creators.
- Comment on Posts → Share feedback, thoughts, and discussions.
- Follow Creators → Stay updated with their latest work.

## ⌛Process

1. Ideation & Visio
- Defined Animaxx as a community hub for anime lovers — a place to share, explore, and connect.
Took inspiration from Pinterest‑style discovery platforms, but tailored it to anime culture.
Outlined core features: accounts, posts, downloads, likes, comments, follows, and high‑quality image handling.

2. Architecture & Planning
Designed a full‑stack architecture:
Frontend → React.js with Hooks & Redux for state management.
Backend → Java + Spring Boot for APIs and business logic.
Database → SQL for structured storage of users, posts, and images.
Planned dual image storage: compressed previews for speed, originals for detail.
Defined caching strategies to balance performance vs. storage limits.

3. Backend Development
Built RESTful APIs in Spring Boot for user accounts, posts, comments, and image handling.
Configured resource handlers to serve both compressed and original image URLs.
Implemented cache headers for profile pictures and originals.
Automated asset migration and database updates for seamless cloud integration.

4. Frontend Development
Developed UI with React.js, focusing on clean layouts and responsive design.
Integrated Redux for predictable state management.
Implemented service workers (Workbox) for runtime caching and offline support.
Created user‑centric dashboards for posting, exploring, and following creators.

5. Caching & Optimization
Applied hybrid caching plan:
CacheFirst → Profile pics.
StaleWhileRevalidate → Feed images (limited to 100/day).
Validated caching behavior using DevTools & Lighthouse, ensuring strict cache limits.
Monitored cache size on mobile devices to prevent storage overload.

6. Testing & Iteration
Ran multiple validation cycles:
Checked rendering speed and cache headers.
Debugged service worker registration and runtime caching visibility.
Rapidly iterated to fix edge cases and improve performance.

## 📚What I Learned

- Dual Image Storage → Learned how to design backend entities, controllers, and services to handle both compressed previews and original high‑quality images.
- Service Worker Caching → Spent time understanding Workbox strategies (CacheFirst, StaleWhileRevalidate, NetworkFirst) and how to enforce strict cache limits.
- Cache Validation → Learned to use DevTools and Lighthouse to monitor cache size, headers, and runtime behavior. Debugging service worker registration and cache visibility took multiple iterations.
- Frontend Rendering → Learned how to balance performance and user experience by serving compressed previews quickly while keeping originals accessible.

## 💭How It Can Be Improve
- Add Blog Upload Feature
- Add Switch Account Feature
- Add Community Page For Groups
- Add Ads for Company and User Revenue
- Add Shopping Page For anime merchandise
- Add Monetization System So user can earn from Animaxx






























