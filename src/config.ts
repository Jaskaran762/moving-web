// Central place to configure external service URLs
// IMPORTANT: Replace the placeholder with your deployed GCP Cloud Function HTTPS URL
// Example: https://us-central1-your-project.cloudfunctions.net/createAppointment
export const APPOINTMENT_FUNCTION_URL = "https://us-central1-places-api-project-467513.cloudfunctions.net/appointment-save-move"; // TODO: set to your GCP function URL

export const REVIEWS_FUNCTION_URL =
  "https://us-central1-places-api-project-467513.cloudfunctions.net/get-review-gmap-placeid/get-place-reviews-placeid";
