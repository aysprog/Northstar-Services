# Implementation decision log

## Shared browser storage
**Decision:** Store customer requests in `localStorage` using one shared key for the customer and team pages.
**Reason:** Both pages can demonstrate a complete request lifecycle without a backend dependency.
**Trade-off:** Data is limited to one browser profile and is not protected from local inspection or modification.

## Demonstration sign-in
**Decision:** Use clearly labelled sample credentials and a `sessionStorage` flag for the local team-portal demonstration.
**Reason:** It demonstrates the sign-in and sign-out interface without representing a production identity system.
**Trade-off:** Credentials are visible in client-side source and provide no real security. Production access must be implemented and enforced on a server.

## Request status model
**Decision:** Use five explicit states: Received, In Review, In Progress, Completed and Closed.
**Reason:** The states provide a simple, understandable lifecycle for the simulated service enquiry.

## Safe request rendering
**Decision:** Build request cards with DOM nodes and `textContent` rather than inserting customer-provided values as HTML.
**Reason:** User-submitted strings should be treated as text, not executable markup.
