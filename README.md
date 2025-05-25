AlertHub
AlertHub is a web application for reporting dangers and viewing real-time alerts, built with Node.js, Express, Socket.IO, and SQLite.
Project Files and Locations
The project is organized as follows (assuming the root directory is C:\Users\anisa\OneDrive\Desktop\Hackathon):

backend/: Contains the server-side code and dependencies.
server.js: The main Node.js file that runs the backend server, handles API requests, and manages real-time updates with Socket.IO.
package.json: Lists project dependencies (e.g., express, socket.io, sqlite3, cors).
node_modules/: Directory for installed Node.js packages (created after running npm install).
database.db: SQLite database file (automatically created in this directory when the server starts, storing alert data).
public/: Directory for static frontend files.
index.html: Displays real-time alerts received via Socket.IO.
report_danger.html: Contains the form for submitting danger reports.





How to Run the Project
Follow these steps to set up and run AlertHub on your local machine.
Prerequisites

Node.js (version 16 or higher, tested with v22.16.0): Download here
Visual Studio Code (optional, for debugging with Live Server): Download here
Live Server Extension for VS Code (optional): Install via the Extensions Marketplace in VS Code.

Step-by-Step Instructions
1. Navigate to the Backend Directory
Open a terminal (e.g., CMD) and change to the backend directory:
cd C:\Users\anisa\OneDrive\Desktop\Hackathon\backend

(Adjust the path if your project is in a different location.)
2. Install Dependencies
Install the required Node.js packages:
npm install

This creates the node_modules folder and installs express, socket.io, sqlite3, and cors.
3. Start the Server
Run the Node.js server:
node server.js


You should see output like:Connected to SQLite database
Server running on port 3000


The server will create database.db if it doesn’t exist and listen on http://localhost:3000.

4. Access the Application
Open a browser and visit:

http://localhost:3000/report_danger.html to submit a report.
http://localhost:3000/index.html to view real-time alerts.

5. Test the Functionality

On report_danger.html, enter details (e.g., Type: Flood, Location: New York, Description: Heavy rain) and submit.
You should see "Report submitted successfully!".
Check index.html to confirm the alert appears in real-time.

Optional: Run with VS Code Debugger (Live Server)
To debug the frontend using VS Code’s Live Server:

Install Live Server Extension:

In VS Code, go to Extensions (Ctrl+Shift+X), search for Live Server, and install it.


Open the Project in VS Code:

Launch VS Code and open the C:\Users\anisa\OneDrive\Desktop\Hackathon folder:code .




Start the Server:

In a terminal within VS Code:cd backend
node server.js




Open with Live Server:

In VS Code, navigate to the public folder.
Right-click report_danger.html and select "Open with Live Server".
The browser will open to http://127.0.0.1:5500/report_danger.html (or similar, depending on your Live Server port).


Test with Live Server:

Submit a report on report_danger.html.
Open http://127.0.0.1:5500/index.html to see real-time alerts.
Note: The server is configured to allow CORS requests from http://127.0.0.1:5500 and http://localhost:5500.



Troubleshooting

Port Conflict (Port 3000):

If port 3000 is in use, find the process:netstat -aon | findstr :3000


Kill it:taskkill /PID <PID> /F


Or change the port in server.js (e.g., to 3001).


CORS Errors with Live Server:

Ensure server.js allows http://127.0.0.1:5500 and http://localhost:5500 in the cors configuration.
Check the browser console (F12) for errors.


Database Issues:

If database.db fails to create, ensure the backend directory has write permissions.
Manually create it:type nul > database.db





Additional Notes

This setup is optimized for a hackathon demo and uses SQLite for simplicity.
Stop the server with Ctrl+C when done, as it’s not designed for 24/7 operation.

