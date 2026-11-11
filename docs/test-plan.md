# Test Plan — Northstar Services

Run customer and admin pages from the same Live Server origin and browser profile.

| ID | Test | Expected result |
|---|---|---|
| T01 | Submit with all fields empty | Submission is blocked and required-field feedback appears. |
| T02 | Enter malformed email or phone | Relevant field shows a clear validation message. |
| T03 | Submit a valid enquiry | Request is saved and a dedicated confirmation view appears. |
| T04 | Inspect confirmation | Reference ID is prominent, explicitly labelled and copyable. |
| T05 | Track immediately before any admin update | Request is found and shown as New / awaiting review. |
| T06 | Track with incorrect email | No request details are disclosed; a helpful error appears. |
| T07 | Track with incorrect reference | A helpful no-match message appears. |
| T08 | Sign in to team portal with demo credentials | Dashboard displays locally stored requests. |
| T09 | Change status and add a note | Dashboard saves the update and customer tracking shows the latest status/note. |
| T10 | Search/filter requests | Only matching records are displayed. |
| T11 | Export CSV | A CSV file downloads with the locally stored request records. |
| T12 | Resize to mobile width | Navigation, forms, cards and dashboard remain usable without layout breakage. |

## Evidence to retain
Capture dated screenshots of the home page, mobile layout, valid form, reference confirmation, immediate New-status tracking, admin request list, status update and final tracking result. Use fictional test data only.

## Known limitations
Data is local to one browser and origin. Cross-device testing, real notifications, backend security and production load/performance testing are outside this front-end demo and should be part of a future implementation.
