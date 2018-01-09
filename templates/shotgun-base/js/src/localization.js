// localization
function i18n(key, lang) {
  translations = {
    "actions": {
      "en-us": "Actions"
    },
    "find-anything": {
      "en-us": "Find anything (like tutorials, time logs, or task templates)"
    },
    "follow-updates": {
      "en-us": "Follow Updates"
    },
    "my-contributions": {
      "en-us": "My Contributions"
    },
    "my-follow-settings": {
      "en-us": "My Follow Settings"
    },
    "my-requests": {
      "en-us": "My Requests"
    },
    "organization-requests": {
      "en-us": "Organization Requests"
    },
    "search-requests": {
      "en-us": "Search Requests..."
    },
    "sign-in": {
      "en-us": "Sign In"
    },
    "submit-a-new-request": {
      "en-us": "Submit A New Request"
    },
    "submit-a-request": {
      "en-us": "Submit A Request"
    }
  }
  return translations[key][lang]
}