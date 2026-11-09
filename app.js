// Northstar Services — application entry point.
// Customer enquiry and tracking interactions will be implemented in Day 3.

const currentYear = document.querySelector('#current-year');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
