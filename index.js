async function fetchGitHubActivity(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/events`,
    {
      headers: {
        "User-Agent": "node.js",
      },
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User not found. Please check the username.");
    } else {
      throw new Error(`Error fetching data: ${response.status}`);
    }
  }

  const data = await response.json();

  // guard against non-array responses (rate limit / error payloads)
  if (!Array.isArray(data)) {
    throw new Error(`Unexpected API response: ${JSON.stringify(data)}`);
  }

  return data;
}

//   return response.json();
// }

// Function to display activity
function displayActivity(events) {
  // validate input
  if (!Array.isArray(events) || events.length === 0) {
    console.log("No recent activity found.");
    return;
  }

  events.forEach((event) => {
    let action;
    switch (event.type) {
      case "PushEvent":
        // guard commits access
        const commitCount = Array.isArray(event.payload?.commits) ? event.payload.commits.length : 0;
        action = `Pushed ${commitCount} commit(s) to ${event.repo?.name ?? 'unknown repo'}`;
        break;
      case "IssuesEvent":
        action = `${(event.payload?.action ?? 'performed').charAt(0).toUpperCase() + (event.payload?.action ?? 'performed').slice(1)} an issue in ${event.repo?.name ?? 'unknown repo'}`;
        break;
      case "WatchEvent":
        action = `Starred ${event.repo?.name ?? 'unknown repo'}`;
        break;
      case "ForkEvent":
        action = `Forked ${event.repo?.name ?? 'unknown repo'}`;
        break;
      case "CreateEvent":
        action = `Created ${event.payload?.ref_type ?? 'resource'} in ${event.repo?.name ?? 'unknown repo'}`;
        break;
      default:
        action = `${event.type.replace("Event", "")} in ${event.repo?.name ?? 'unknown repo'}`;
        break;
    }
    console.log(`- ${action}`);
  });
}

// Main CLI logic
const username = process.argv[2];
if (!username) {
  console.error("Please provide a GitHub username.");
  process.exit(1);
}

fetchGitHubActivity(username)
  .then((events) => {
    displayActivity(events);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
