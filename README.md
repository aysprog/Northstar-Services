<div align="center">

# NORTHSTAR SERVICES

### Local Business Service Portal

A considered digital experience for discovering local services, submitting enquiries, and following request progress.

[Live Website](https://aysprog.github.io/Northstar-Services/) · [Team Portal](https://aysprog.github.io/Northstar-Services/admin.html)

---

**Responsive interface** &nbsp;·&nbsp; **Request tracking** &nbsp;·&nbsp; **Team dashboard**

</div>

## Overview

Northstar Services is a front-end demonstration of a local service company's customer and team workflow. It brings service discovery, enquiry submission, request acknowledgement, and operational request management into one responsive interface.

The project focuses on a straightforward experience for both sides of the service process: customers can submit and follow an enquiry, while team members can review requests and record progress updates.

> Northstar Services is a simulated business created for demonstration purposes. It is not a live service provider.

## Features

### Customer portal
- Responsive landing page with service information and clear navigation.
- Service-led enquiry entry points.
- Enquiry form with client-side validation for contact details and request information.
- Confirmation view with a generated request reference.
- Copyable reference ID.
- Request tracking using the reference ID and the email address submitted with the enquiry.
- Customer-facing status messages, including the initial **New** state.

### Team portal
- Separate team access page.
- Demo sign-in flow.
- Request overview with summary counts.
- Search requests by reference, customer, contact details, or service.
- Filter requests by status.
- Review individual request details.
- Update request status and add a customer-facing note.
- Export stored requests as a CSV file.

## Technology

| Area | Implementation |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 |
| Functionality | Vanilla JavaScript |
| Request storage | Browser `localStorage` |
| Demo session | Browser `sessionStorage` |
| Typography | Google Fonts |
| Service imagery | Unsplash image URLs |
| Deployment | GitHub Pages |

No front-end framework or build step is required.

## Request lifecycle

1. A customer selects a service and completes the enquiry form.
2. The browser validates the submitted information.
3. A request reference is generated and the request is saved in the browser.
4. The customer receives a confirmation containing the reference ID.
5. The customer can look up the request using the reference ID and submitted email address.
6. A team member can review the request, update its status, and add a note.
7. The latest saved status and team note are shown when the customer tracks the request.

## Demo access

The team portal uses demonstration credentials embedded in the front-end code.

| Field | Demo value |
|---|---|
| Email | `team@northstar.demo` |
| Password | `NorthstarDemo1` |

These credentials are for evaluation only. They do not provide secure authentication and must not be used for a production system.

## Run locally

1. Download or clone this repository.
2. Open the project folder in your code editor.
3. Run `index.html` using a local development server, such as the VS Code Live Server extension.
4. Open `admin.html` from the same local server origin to access the team portal.

**Important:** Open the customer portal and team portal in the same browser and on the same origin. The application stores requests in browser storage, so data is not shared between different browsers, devices, or origins.

## Project structure

```text
Northstar-Services/
├── index.html
├── admin.html
├── styles.css
├── app.js
└── docs/
    ├── requirements.md
    ├── decision-log.md
    └── test-plan.md
```

| File | Responsibility |
|---|---|
| `index.html` | Customer-facing portal and request forms |
| `admin.html` | Team sign-in and request dashboard |
| `styles.css` | Shared responsive styling |
| `app.js` | Form validation, request workflow, tracking, and dashboard behaviour |
| `docs/requirements.md` | Stakeholders, scope, requirements, and constraints |
| `docs/decision-log.md` | Key implementation decisions |
| `docs/test-plan.md` | Manual test scenarios and evidence checklist |

## Design approach

The interface uses a restrained palette built around deep navy, midnight blue, slate blue, sage green, warm beige, and ivory. Editorial-style headings, generous spacing, service imagery, and responsive layouts support a clear visual hierarchy across screen sizes.

## Scope and limitations

This project is a browser-based prototype. Its current implementation has the following boundaries:

- Requests are stored in `localStorage` on the current browser and origin.
- Data does not synchronise across devices or users.
- The team sign-in is a client-side demonstration flow, not production authentication.
- There is no backend, database, server-side validation, or role-based access control.
- Email and SMS notifications are not integrated.
- Service information and imagery are illustrative.
- Do not enter real customer or sensitive personal information.

A production implementation would require a secure backend and database, server-side validation, proper authentication and authorisation, privacy controls, and a notification service.

## Testing

The repository includes a manual test plan covering form validation, request creation, reference confirmation, customer tracking, team access, status updates, search, filtering, CSV export, and responsive layouts.

Use fictional test information when exercising the demo. Record actual test outcomes and screenshots during evaluation; the presence of a test plan does not imply that every scenario has already been executed.

## Documentation

- [Requirements](docs/requirements.md)
- [Decision log](docs/decision-log.md)
- [Test plan](docs/test-plan.md)

---

<div align="center">

**Northstar Services**  
*A front-end project focused on clear service communication and practical request management.*

</div>
