```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Note over Browser: User types a new note and clicks submit

    Browser->>Server: POST /new_note (AJAX via fetch)
    Server-->>Browser: 200 OK

    Note over Browser: JavaScript updates the UI without reloading the page
