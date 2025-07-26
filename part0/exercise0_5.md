sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /spa
    Server-->>Browser: HTML (spa.html)

    Browser->>Server: GET /main.css
    Server-->>Browser: CSS

    Browser->>Server: GET /main.js
    Server-->>Browser: JavaScript

    Browser->>Server: GET /data.json
    Server-->>Browser: Notes JSON
