# Northstar Services — Local Business Service Portal

Northstar Services is a responsive front-end demonstration of a local service business workflow. Customers can explore service categories, submit enquiries and track request statuses. A simulated internal team portal allows staff to review saved enquiries and update their status.

## Features

### Customer portal
- Responsive service discovery and enquiry interface.
- Required-field, email and phone-number validation.
- Generated enquiry reference on successful submission.
- Browser-based request persistence.
- Reference-based request tracking with current status and timestamps.

### Team portal
- Demo sign-in screen with session-based access state.
- Request overview with total, received, in-progress and completed counts.
- Search by customer, reference, email, phone, service or message.
- Filter requests by status and service category.
- Update request status: Received, In Review, In Progress, Completed or Closed.
- Updated timestamps are saved and reflected in customer tracking.

## Run locally

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Launch `index.html` using a local development server such as VS Code Live Server, or open it directly in a modern browser.
4. Submit an enquiry through the customer portal.
5. Open **Team Portal** and sign in with the demonstration credentials below.
6. Update a request status, then return to customer tracking to verify the change.

No package installation or build step is required.

## Demonstration team access

| Field | Value |
|---|---|
| Email | `team@northstar.test` |
| Password | `NorthstarDemo!26` |

These credentials are embedded in client-side JavaScript for demonstration purposes only. They are not secure authentication and must not be used to protect real customer data.

## Project structure

```text
northstar-services/
├── index.html          # Customer portal and request tracking
├── admin.html          # Team sign-in and request dashboard
├── styles.css          # Shared responsive styles
├── app.js              # Customer enquiry and tracking logic
├── admin.js            # Team access and request administration
└── docs/
    ├── requirements.md
    └── decision-log.md
```

## Data handling and limitations

- Enquiries are stored in the browser's `localStorage` under `northstar.requests.v1`.
- The team sign-in state is held in `sessionStorage` and ends when the browser tab/session is closed or the user signs out.
- Data is local to the browser profile. It is not synchronised across devices or users.
- There is no backend API, database, server-side authentication, role-based authorisation, email notification or audit log.
- Browser storage can be edited or cleared by the user. The demonstration must not be used with real or sensitive customer information.
- Service categories and business content are illustrative.

A production implementation would require server-side identity management, access controls, validated API endpoints, persistent database storage, secure transport, privacy controls and operational monitoring.

## Manual validation checklist

- [ ] Submit an incomplete enquiry and confirm it is rejected.
- [ ] Submit an invalid email and confirm it is rejected.
- [ ] Submit a phone number containing fewer than seven digits and confirm it is rejected.
- [ ] Submit valid details and record the generated reference.
- [ ] Track the reference and confirm the request details are shown.
- [ ] Sign in with incorrect credentials and confirm access is denied.
- [ ] Sign in with the demonstration credentials and confirm the dashboard loads.
- [ ] Search by customer name and by reference number.
- [ ] Filter requests by status and service.
- [ ] Change a request status and confirm the updated timestamp changes.
- [ ] Track the same request from the customer portal and confirm the new status appears.
- [ ] Sign out and confirm the login screen is shown.
- [ ] Check customer and team pages at mobile, tablet and desktop widths.

## Technology

HTML5 · CSS3 · Vanilla JavaScript · Web Storage API
