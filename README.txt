
Files to upload to your GitHub Pages repository (root of the site):
- verify.html
- certificate.html
- members.json
- styles.css
- certificate-bg.jpg  (background image for certificate)

How to use:
1) Upload all files to your GitHub repo (Paws-Smile-Foundation). Commit.
2) Test verify page in browser:
   https://pawsandsmilefoundation-jpg.github.io/Paws-Smile-Foundation/verify.html?id=PAWS001
   This should show Tanush Kumar (from members.json).
3) Click 'View Certificate' to open certificate.html?id=PAWS001 which displays the certificate with name and QR.
4) Click 'Download as PDF' to download the filled certificate as a PDF file.
5) To add members: edit members.json and add entries with keys = IDs (PAWS003 etc.) and fields name, workshop, date.

Autocrat / Google Sheets:
- You can continue to auto-generate certificates in PDF via Autocrat from Google Slides.
- If you generate PDFs and want them linked from members.json, update the "certificate_pdf" field with the URL to the PDF in your repo (e.g., /certificates/Certificate - PAWS001.pdf).

If you want, paste here your full member CSV and I will update members.json for you.
