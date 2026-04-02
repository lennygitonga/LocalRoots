const BASE_URL = "http://localhost:5000/api";

// REPORTS
export async function fetchReports() {
  const res = await fetch(`${BASE_URL}/reports`);
  return res.json();
}

export async function createReport(report) {
  const res = await fetch(`${BASE_URL}/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });
  return res.json();
}

export async function resolveReport(id) {
  const res = await fetch(`${BASE_URL}/reports/${id}/resolve`, {
    method: "PATCH",
  });
  return res.json();
}

// HELP REQUESTS
export async function fetchHelpRequests() {
  const res = await fetch(`${BASE_URL}/help`);
  return res.json();
}

export async function createHelpRequest(request) {
  const res = await fetch(`${BASE_URL}/help`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  return res.json();
}

export async function claimHelpRequest(id, claimedBy) {
  const res = await fetch(`${BASE_URL}/help/${id}/claim`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ claimedBy }),
  });
  return res.json();
}

export async function deleteHelpRequest(id) {
  const res = await fetch(`${BASE_URL}/help/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// MESSAGES
export async function fetchPublicMessages() {
  const res = await fetch(`${BASE_URL}/messages/public`);
  return res.json();
}

export async function createMessage(message) {
  const res = await fetch(`${BASE_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
  return res.json();
}

export async function fetchPrivateMessages(conversationId) {
  const res = await fetch(`${BASE_URL}/messages/private/${conversationId}`);
  return res.json();
}