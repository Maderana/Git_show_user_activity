#Solution for the github-user-activity challenge from roadmap.sh

# GitHub User Activity (roadmap.sh challenge)

Small CLI that fetches recent public events for a GitHub user and prints a short summary.

Requirements
- Node.js 18+ (uses the global fetch API).
- No npm packages required.

Quick start
1. Open a terminal in the project folder:
   cd \Git_show_user_activity
2. Run:
   node index.js '<github-username>'

Example
- node index.js maderana

Output is a list of brief activity lines (pushes, issues, stars, forks, creates, etc.). If no username is provided the script exits with an error.

How it works (brief)
- Calls GitHub Events API: `https://api.github.com/users/:username/events`.
- Validates HTTP response and ensures the payload is an array.
- Normalizes common event types (PushEvent, IssuesEvent, WatchEvent, ForkEvent, CreateEvent) into short, human-readable lines and prints them.
- Handles basic errors (user not found, unexpected response).

Notes
- Unauthenticated GitHub API requests are rate limited (60 requests/hour). If you need higher limits, run authenticated requests (not implemented in the script).
- The script uses optional chaining and modern JS (Node 18+).

Optional: add a package.json to provide an npm start script

- Create `package.json` and run `npm start` instead of calling node directly (example below).


