// Northstar Services — Day 2 customer portal interactions.
// Request submission and tracking are intentionally reserved for Day 3.

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();

// Service links preselect the matching service in the enquiry form.
const serviceLinks = document.querySelectorAll('[data-service]');
const serviceSelect = document.querySelector('#service-select');

serviceLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  });
});

// The form is present and browser-required fields are active.
// The actual request workflow will be implemented in Day 3.
const enquiryForm = document.querySelector('#enquiry-form');
const formFeedback = document.querySelector('#form-feedback');

if (enquiryForm && formFeedback) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formFeedback.textContent =
      'The enquiry form layout is ready. Request submission will be enabled in Day 3.';
  });
}
