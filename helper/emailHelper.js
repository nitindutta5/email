const path = require('path');
const { renderFile } = require('pug');

// Helper function to render email templates
async function renderEmailTemplate(template, name) {
  // Logic to render the email template based on the template name
  return await renderFile(path.join(__dirname, `../views/emails/${template}.pug`), { name: name });
}

module.exports = { renderEmailTemplate };