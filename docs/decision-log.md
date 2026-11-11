# Decision Log — Northstar Services

| Decision | Reason | Trade-off / follow-up |
|---|---|---|
| Use vanilla HTML, CSS and JavaScript | Accessible, lightweight stack for the internship foundation task. | A backend/API is needed for production persistence. |
| Use a navy, midnight, slate, sage, beige and ivory palette | Creates a consistent, calm and professional visual identity. | Validate contrast during final accessibility review. |
| Show a dedicated confirmation view after submission | Makes successful submission and the reference ID difficult to miss. | Consider email confirmation after backend integration. |
| Treat `New` as a real request status | Customers should see receipt and next-step expectations immediately. | Add timestamps and notification rules in a production workflow. |
| Require reference ID plus original email for lookup | Adds a basic second check in this demo. | This is not production-grade identity verification. |
| Store demo records in localStorage | Keeps the prototype runnable without server setup. | Records do not sync across browsers, devices or origins. |
| Document manual test evidence | Makes the work reviewable and repeatable for a mentor. | Add automated tests when a build/test environment is introduced. |

## 2026-11-08 — Service discovery and navigation refinement
- Replaced symbol-led service tiles with editorial, image-led service cards. Each card uses a relevant photograph, a small category label, clearer title/description and a plain text action.
- Added a visible Team portal link in the primary navigation and repeated staff access in the contact area and footer so the internal workflow is discoverable without searching the page corners.
- Increased supporting text, labels, form controls and admin-table typography for comfortable reading while retaining the established navy, slate, sage, beige and ivory palette.
- Trade-off: service photos are externally hosted Unsplash images; production deployment should use optimized, licensed local assets with descriptive alt text.
