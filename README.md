# Lumen de Lumine. Design proposal

A proposed website for the Fondazione Lumen de Lumine ETS (Rome), by Lickity Split Web Design.

**This is a proposal. It is not the Foundation's website.**
A preview for the Foundation is at https://liquid1188.github.io/lumen-de-lumine-proposal/ (hidden from search engines).
Every page carries a label saying so. All text is draft for the Foundation to review.

## Look at it

Open `preview/index.html` in a browser. No setup needed.

## Work on it

    npm install
    npm start          # live preview at http://localhost:8080
    npm run preview    # rebuilds the double-click copy in preview/

## Where things are

- `src/_data/i18n.js` has all the text, English and Italian.
- `src/_data/langs.js` has the page addresses for each language.
- `src/_data/site.json` has settings. `proposal: true` shows the proposal label. `web3formsKey` is a placeholder, so the forms only show a notice.
- `src/assets/img/art/` has the paintings (public domain, credited in the footer).

## Before this could go live

Needs from the Foundation: approval, corrected text, logo, contact details, codice fiscale,
giving details, their own Web3Forms key, a privacy notice, and a domain.
Then set `proposal` to false and remove the noindex tag in `src/_includes/base.njk`.

No bank or donation details are in this proposal on purpose.
