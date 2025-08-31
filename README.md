
# Paws & Smile Foundation — Website

This is a ready-to-use, responsive website for your NGO. Open the folder in VS Code and use the **Live Server** extension to preview.

## Pages
- `index.html` — Home (hero, about, programs, CTAs)
- `about.html` — Story, mission, values
- `gallery.html` — Image grid using your photos
- `donate.html` — Email-based donation CTA
- `contact.html` — Contact details and form

## Updating Images
Replace files in `assets/images/` with your preferred photos. Keep the same filenames to avoid editing HTML.

## Making the Contact Form Send to Gmail Automatically
HTML alone cannot send emails from a website. Two options:

1. **Formspree (recommended, free):**
   - Go to formspree.io and create a new form.
   - Copy the endpoint URL (looks like `https://formspree.io/f/xxxxxxx`).
   - In `contact.html`, replace the form `action` attribute with that URL and keep `method="POST"`.
   - Submit a test message and verify your Gmail address `pawsandsmilefoundation@gmail.com`.

2. **EmailJS (client-side):**
   - Create an account at emailjs.com, add a Gmail service, and use their SDK.
   - Add the script to `assets/js/main.js` and initialize with your keys.

**Current fallback:** The form uses a `mailto:` action which opens the visitor's email app addressed to `pawsandsmilefoundation@gmail.com`. This works without extra setup but isn't as reliable as Formspree/EmailJS.

## Donate Button
Currently opens a compose email to `pawsandsmilefoundation@gmail.com`. You can later add UPI/Payment links here.

## Customize
- Colors and layout are in `assets/css/style.css`.
- Basic JS (smooth scrolling and mailto fallback) in `assets/js/main.js`.
