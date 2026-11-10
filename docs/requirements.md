# Requirements and acceptance criteria

## Stakeholders
- Customer: discovers services, submits enquiries and checks request progress.
- Team member: reviews submitted enquiries and updates request statuses.

## Customer workflow
1. Customer enters name, email, phone, service and message.
2. Client-side validation checks required fields, email format and minimum phone digits.
3. A reference identifier is generated and the request is saved locally with status `Received`.
4. Customer enters the reference to view the request's latest status and timestamps.

## Team workflow
1. Team member enters the documented demonstration credentials.
2. Dashboard displays request counts and saved requests.
3. Team member searches or filters the request list.
4. Team member selects a new status; the record and update timestamp are saved.
5. Customer tracking reads the same local record and displays the updated status.

## Acceptance criteria
- Invalid enquiries are not persisted.
- Valid enquiries receive a reference and initial `Received` status.
- A valid reference retrieves only the matching request.
- Invalid team credentials do not open the dashboard.
- Valid demonstration credentials open the dashboard.
- Search and both filters narrow the visible request list.
- Status changes persist in local storage and update the timestamp.
- Customer tracking reflects team status changes in the same browser profile.
- Signing out returns the team member to the sign-in screen.

## Constraints and risks
This project is a front-end simulation. Client-side credentials and browser storage do not provide production security, centralised data management or multi-user access. No real customer information should be entered.
