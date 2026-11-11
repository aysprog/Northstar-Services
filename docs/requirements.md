# Requirements — Northstar Local Business Service Portal

## Stakeholders
- **Primary user:** a customer who wants to discover a service, submit an enquiry and check its progress.
- **Operational user:** a service-team member who reviews enquiries and updates their status.
- **Decision enabled:** the team can see which requests are new, being handled or resolved and decide what needs attention next.

## Problem statement
Customers need a clear way to submit service enquiries and retain a reference for follow-up. The service team needs a simple view of incoming requests and a way to communicate progress. A request must be acknowledged immediately; it must not appear missing merely because the team has not changed its status yet.

## Scope
### Included
- Responsive customer portal and service discovery cards.
- Enquiry form with client-side validation.
- Clear post-submission confirmation with a prominent reference ID and copy action.
- Request lookup using reference ID and submitting email address.
- Initial `New` / awaiting-review state and customer-facing status explanations.
- Demo team login, request search/filter, status and note updates, CSV export.
- Requirements, test plan, decision log and setup guide.

### Excluded from this prototype
- Real email/SMS notifications.
- Persistent multi-user cloud database.
- Production identity management, role permissions and server-side authorization.
- Real payment, scheduling or dispatch integrations.

## Functional requirements
1. A customer can browse available service categories.
2. A customer can submit a valid enquiry with contact information, selected service and details.
3. The system generates a unique-looking reference ID and stores the request locally.
4. The confirmation view clearly labels the reference ID and allows it to be copied.
5. A customer can find a request using its reference ID and original email address.
6. A request with status `New` is shown as received and awaiting team review.
7. A team member can view, search and filter submitted requests.
8. A team member can update a request status and add a customer-facing note.
9. The team member can export stored requests to CSV.

## Quality and acceptance measures
- Required form fields reject missing or malformed values with clear inline feedback.
- A valid submission creates one request and displays its reference ID in a dedicated confirmation view.
- A newly submitted request can be found before any admin update and displays an awaiting-review message.
- Correct reference/email pairs retrieve the request; incorrect pairs do not reveal request details.
- Layout remains usable at mobile, tablet and desktop widths.
- Keyboard focus is visible and controls have labels or accessible names.
- A mentor can reproduce the demo using the README without undocumented setup.

## Data and privacy constraints
This prototype uses browser local storage and contains demo data only. Do not enter real customer personal information. The reference ID is not a substitute for secure authentication. A production implementation should use a backend, secure access controls, server-side validation, appropriate retention rules and privacy notices.
