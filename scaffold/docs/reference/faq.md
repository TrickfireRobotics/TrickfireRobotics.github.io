---
title: FAQ
description: Common questions.
---

### Where does visiting the site's base URL take me?

There's no landing/splash page - the base URL redirects straight to the first page in your `sidebar` config.

### Can I nest sidebar groups?

Yes - each nested group needs its own subfolder one level deeper than its parent (see [Organizing the Sidebar](/guides/organizing-sidebar)).

### Does editing `docs.config.ts` hot-reload?

No - restart `trickfire-docs dev` after changing it. Edits under `docs/` hot-reload as normal.
