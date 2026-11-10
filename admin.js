// Northstar Services — simulated team access and request administration.
'use strict';

const STORAGE_KEY = 'northstar.requests.v1';
const SESSION_KEY = 'northstar.team-session';
const DEMO_EMAIL = 'team@northstar.test';
const DEMO_PASSWORD = 'NorthstarDemo!26';
const STATUSES = ['Received', 'In Review', 'In Progress', 'Completed', 'Closed'];

const byId = (id) => document.getElementById(id);
const loginView = byId('login-view');
const dashboardView = byId('dashboard-view');
const loginForm = byId('login-form');
const loginMessage = byId('login-message');
const requestList = byId('request-list');
const year = byId('current-year');
if (year) year.textContent = new Date().getFullYear();

const readRequests = () => {
  try {
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(records) ? records : [];
  } catch (error) {
    console.error('Unable to read request records:', error);
    return [];
  }
};

const writeRequests = (records) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch (error) {
    console.error('Unable to update request records:', error);
    return false;
  }
};

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Date unavailable' : date.toLocaleString();
};

const setAuthenticated = (authenticated) => {
  loginView.hidden = authenticated;
  dashboardView.hidden = !authenticated;
  if (authenticated) renderDashboard();
};

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loginMessage.textContent = '';
  if (!loginForm.reportValidity()) return;
  const data = new FormData(loginForm);
  const email = String(data.get('email') || '').trim().toLowerCase();
  const password = String(data.get('password') || '');
  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    loginMessage.textContent = 'The email or password is incorrect. Use the demonstration credentials shown below.';
    return;
  }
  sessionStorage.setItem(SESSION_KEY, 'active');
  loginForm.reset();
  setAuthenticated(true);
});

byId('logout-button').addEventListener('click', () => {
  sessionStorage.removeItem(SESSION_KEY);
  setAuthenticated(false);
});

const updateStats = (records) => {
  byId('stat-total').textContent = records.length;
  byId('stat-received').textContent = records.filter((item) => item.status === 'Received').length;
  byId('stat-progress').textContent = records.filter((item) => item.status === 'In Progress').length;
  byId('stat-completed').textContent = records.filter((item) => item.status === 'Completed').length;
};

const createRequestCard = (request) => {
  const article = document.createElement('article');
  article.className = 'request-card';

  const top = document.createElement('div');
  top.className = 'request-card-top';
  const identity = document.createElement('div');
  const heading = document.createElement('h3');
  heading.textContent = request.fullName || 'Unnamed customer';
  const meta = document.createElement('p');
  meta.className = 'request-meta';
  meta.textContent = `${request.id} · ${request.service} · ${formatDate(request.createdAt)}`;
  identity.append(heading, meta);
  const badge = document.createElement('span');
  badge.className = 'status-pill';
  badge.dataset.status = request.status;
  badge.textContent = request.status;
  top.append(identity, badge);

  const contact = document.createElement('p');
  contact.className = 'request-meta';
  contact.textContent = `${request.email} · ${request.phone}`;
  const message = document.createElement('p');
  message.className = 'request-message';
  message.textContent = request.message;

  const actions = document.createElement('div');
  actions.className = 'request-actions';
  const label = document.createElement('label');
  const selectId = `status-${request.id}`;
  label.htmlFor = selectId;
  label.textContent = 'Update status';
  const select = document.createElement('select');
  select.id = selectId;
  select.dataset.requestId = request.id;
  STATUSES.forEach((status) => {
    const option = document.createElement('option');
    option.value = status;
    option.textContent = status;
    option.selected = status === request.status;
    select.append(option);
  });
  select.addEventListener('change', () => updateRequestStatus(request.id, select.value));
  const updated = document.createElement('span');
  updated.className = 'request-meta';
  updated.textContent = `Last updated: ${formatDate(request.updatedAt)}`;
  actions.append(label, select, updated);
  article.append(top, contact, message, actions);
  return article;
};

const renderDashboard = () => {
  const records = readRequests();
  updateStats(records);
  const searchTerm = byId('request-search').value.trim().toLowerCase();
  const status = byId('status-filter').value;
  const service = byId('service-filter').value;
  const filtered = records.filter((item) => {
    const searchable = [item.id, item.fullName, item.email, item.phone, item.service, item.message].join(' ').toLowerCase();
    return searchable.includes(searchTerm)
      && (status === 'all' || item.status === status)
      && (service === 'all' || item.service === service);
  });
  requestList.replaceChildren();
  if (!filtered.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = records.length ? 'No requests match the selected filters.' : 'No enquiries have been submitted in this browser yet.';
    requestList.append(empty);
    return;
  }
  filtered.forEach((item) => requestList.append(createRequestCard(item)));
};

const updateRequestStatus = (requestId, nextStatus) => {
  if (!STATUSES.includes(nextStatus)) return;
  const records = readRequests();
  const target = records.find((item) => item.id === requestId);
  if (!target) return;
  target.status = nextStatus;
  target.updatedAt = new Date().toISOString();
  if (!writeRequests(records)) {
    window.alert('The status could not be saved in this browser.');
    return;
  }
  renderDashboard();
};

['request-search', 'status-filter', 'service-filter'].forEach((id) => {
  byId(id).addEventListener(id === 'request-search' ? 'input' : 'change', renderDashboard);
});

setAuthenticated(sessionStorage.getItem(SESSION_KEY) === 'active');
