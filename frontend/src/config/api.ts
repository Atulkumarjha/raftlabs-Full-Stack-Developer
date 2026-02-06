const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://raftlabs-full-stack-developer.onrender.com"

// Remove trailing slash to prevent double slashes in API calls
export const API_URL = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
