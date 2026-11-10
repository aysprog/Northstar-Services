// Northstar Services — customer enquiry and tracking workflow.
'use strict';

const STORAGE_KEY = 'northstar.requests.v1';
const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();

const readRequests = () => {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.error('Unable to read saved enquiries:', error);
    return [];
  }
};

const saveRequests = (requests) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    return true;
  } catch (error) {
    console.error('Unable to save enquiry:', error);
    return false;
  }
};

const createReference = () => {
  const date = new Date();
  const year = date.getFullYear();
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `NS-${year}-${randomPart}`;
};

// Service links preselect the relevant enquiry category.
const serviceSelect = document.querySelector('#service-select');
document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    if (serviceSelect) serviceSelect.value = link.dataset.service;
  });
});

const enquiryForm = document.querySelector('#enquiry-form');
const formFeedback = document.querySelector('#form-feedback');
if (enquiryForm && formFeedback) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formFeedback.textContent = '';
    if (!enquiryForm.reportValidity()) return;

    const formData = new FormData(enquiryForm);
    const request = {
      id: createReference(),
      fullName: String(formData.get('fullName') || '').trim(),
      email: String(formData.get('email') || '').trim().toLowerCase(),
      phone: String(formData.get('phone') || '').trim(),
      service: String(formData.get('service') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      status: 'Received',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!request.fullName || !request.email || !request.phone || !request.service || !request.message) {
      formFeedback.textContent = 'Please complete every required field.';
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(request.email)) {
      formFeedback.textContent = 'Enter a valid email address.';
      return;
    }
    if (request.phone.replace(/\D/g, '').length < 7) {
      formFeedback.textContent = 'Enter a phone number with at least 7 digits.';
      return;
    }

    const requests = readRequests();
    requests.unshift(request);
    if (!saveRequests(requests)) {
      formFeedback.textContent = 'This browser could not save your enquiry. Check available storage and try again.';
      return;
    }

    formFeedback.textContent = `Your enquiry has been saved. Reference: ${request.id}. Keep this number to track its status.`;
    enquiryForm.reset();
    const referenceInput = document.querySelector('#tracking-reference');
    if (referenceInput) referenceInput.value = request.id;
  });
}

const trackingForm = document.querySelector('#tracking-form');
const trackingFeedback = document.querySelector('#tracking-feedback');
const trackingResult = document.querySelector('#tracking-result');
if (trackingForm && trackingFeedback && trackingResult) {
  trackingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    trackingFeedback.textContent = '';
    trackingResult.hidden = true;
    const reference = String(new FormData(trackingForm).get('reference') || '').trim().toUpperCase();
    if (!reference) {
      trackingFeedback.textContent = 'Enter your enquiry reference number.';
      return;
    }
    const request = readRequests().find((item) => item.id.toUpperCase() === reference);
    if (!request) {
      trackingFeedback.textContent = 'No matching enquiry was found in this browser. Check the reference and try again.';
      return;
    }
    const created = new Date(request.createdAt).toLocaleString();
    const updated = new Date(request.updatedAt).toLocaleString();
    trackingResult.replaceChildren();
    const title = document.createElement('h3');
    title.textContent = request.service;
    const status = document.createElement('p');
    status.className = 'status-line';
    status.textContent = `Current status: ${request.status}`;
    const referenceText = document.createElement('p');
    referenceText.textContent = `Reference: ${request.id}`;
    const createdText = document.createElement('p');
    createdText.textContent = `Submitted: ${created}`;
    const updatedText = document.createElement('p');
    updatedText.textContent = `Last updated: ${updated}`;
    trackingResult.append(title, status, referenceText, createdText, updatedText);
    trackingResult.hidden = false;
  });
}
