# Editing the EdelSenz website — no code required

Your website now has a **no-code editor**. You change the words in simple fill-in-the-box
forms, click Save, and the live site updates on its own. You never touch HTML.

This is a one-time setup (about 15 minutes). After that, editing takes seconds.

---

## Part 1 — Put the site online (one time)

The editor works by saving changes to your website's files on GitHub, so the site has to
live there first.

1. Go to **github.com** and sign in (or create a free account).
2. Create a new repository — name it **edelsenz-website**. Leave it Public. Click *Create*.
3. On the repo page, click **"uploading an existing file"**.
4. Open the **`edelsenz-jekyll`** folder on your computer, select **everything inside it**,
   and drag it into the browser. Wait for the upload to finish, then click **Commit changes**.
   *(Upload the contents of the folder, not the folder itself.)*
5. In the repo, go to **Settings → Pages**. Under "Build and deployment", set Source to
   **Deploy from a branch**, branch **main**, folder **/ (root)**. Click **Save**.
6. Wait ~2 minutes. Your site is live at **https://<your-username>.github.io/edelsenz-website/**

> The site is built with Jekyll, which GitHub runs automatically for free. You don't install
> anything.

---

## Part 2 — Connect the editor (one time)

1. Go to **pagescms.org** and click **Sign in with GitHub**.
2. Approve access to your **edelsenz-website** repository.
3. That's it — Pages CMS reads the `.pages.yml` file already in your site and builds your
   editing forms automatically.

---

## Part 3 — Editing text (the everyday bit)

1. Open **app.pagescms.org**, choose the **edelsenz-website** repo.
2. Click **Homepage text**. You'll see the page broken into friendly sections —
   *Hero, Our story, Core values, Divisions, Contact,* and so on.
3. Open a section, change the words in any box, and click **Save**.
4. The live site updates in about a minute. Refresh your page to see it.

Some long headings are split into "part 1 / part 2 / part 3" — part 2 is the word shown in
the green accent colour. Just edit the words; leave things like `&amp;` (an “&”) and
`&rsquo;` (a curly apostrophe) as they are.

---

## Part 4 — Publishing a weekly newsletter issue

1. In the editor, click **News / newsletter issues → Add an entry**.
2. Fill in the **Issue title**, **Date**, a short **Summary** (shown on the News page), and
   the **Full issue text**. Click **Save**.
3. The new issue appears on your website's **News** page automatically, newest first.

*(This is separate from sending the email in MailerLite — do that as usual. This step just
publishes the issue on your website.)*

---

## What's editable right now

- ✅ **Entire homepage** — every heading, paragraph, division card, value, contact detail, footer.
- ✅ **News / newsletter issues** — add, edit, remove.
- ⏳ **Division detail pages & the News page intro** — not yet turned into form fields
  (coming next). Until then, those few pages are edited on GitHub directly, or just ask me.

---

## Good to know

- Every save is version-tracked on GitHub, so nothing is ever lost — mistakes can be undone.
- The `tools/` folder and `package*.json` are only used for building/testing and are ignored
  by the live site — you can leave them or delete them.
- If a change doesn't show up, wait a minute and hard-refresh (Ctrl+F5).
