 Full Stack Open – Part 0 Exercises (0.1–0.6)

 0.1: What happens when you open a web page?

1. The browser looks up the domain name using DNS to find the server's IP.
2. It sends an HTTP GET request to the server.
3. The server responds with an HTML file.
4. The browser reads the HTML and requests additional files (CSS, JS, images).
5. It then renders the page for the user.

 0.2: Web Developer's Work

Web developers:
- Write HTML, CSS, JavaScript (and often backend code too)
- Use tools like VS Code, Git, and GitHub
- Use the browser’s DevTools to debug
- Often work with frameworks like React or backend tools like Node.js
- Build and maintain interactive web applications

0.3: GitHub Repo Link

🔗 [GitHub repository for my course exercises](https://github.com/vinixcity/fullstackopen-exercises)

0.4: Traditional Web App (Sequence Diagram)

```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET /notes
    Server-->>Browser: HTML

    Browser->>Server: GET /main.css
    Server-->>Browser: CSS

    Browser->>Server: GET /main.js
    Server-->>Browser: JavaScript

    Browser->>Server: GET /data.json
    Server-->>Browser: Notes JSON

    Note over Browser: User submits note

    Browser->>Server: POST /new_note
    Server-->>Browser: Redirect to /notes
    Browser->>Server: GET /notes
    Server-->>Browser: Reloaded HTML
