Magical Pets – Three.js Demo (Majestic Unicorn Edition)
======================================================

Quick Run
---------
1. Start a local static server in `magical_pets_game_magic`, e.g.:

   ```bash
   cd magical_pets_game_magic
   python -m http.server 8000
   ```

2. Visit http://localhost:8000
3. Choose *Unicorn* or *Dragon*. Press **Feed/Evolve** to progress through stages:
   Egg → Hatchling → Teen → Adult.

What's New
----------
* Unicorn stages now use *multi‑part JSON* for a far more detailed, magical look.
* `main.js` automatically detects a `parts` array and builds a `THREE.Group`
  combining body, head, horn, ears, legs, and tail.
* Backwards‑compatible: Dragon JSON remains the simple single‑geometry schema.

Extend It!
----------
* Add wings: create `geometry:"cone"` parts and position/rotate on the body.
* Colorful mane: add small `sphere` parts along the neck in rainbow colors!
* New pets: copy these JSON templates and adjust as needed (phoenix, griffin, etc.).
