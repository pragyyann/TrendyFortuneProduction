/**
 * sanitize.ts
 * Shared server-side input sanitization utilities.
 * Strips HTML tags, trims whitespace, and enforces max lengths.
 * Pure — no external dependencies.
 */

const HTML_TAG_PATTERN = /<[^>]*>/g;
const SCRIPT_PATTERN = /javascript\s*:/gi;
const NULL_BYTE_PATTERN = /\0/g;

/**
 * Sanitize a single string value:
 *  - Trim whitespace
 *  - Remove null bytes
 *  - Strip HTML tags
 *  - Remove javascript: URIs
 *  - Enforce max character length
 */
export function sanitizeString(value: unknown, maxLen = 1000): string {
  if (typeof value !== "string") return "";
  return value
    .replace(NULL_BYTE_PATTERN, "")
    .replace(HTML_TAG_PATTERN, "")
    .replace(SCRIPT_PATTERN, "")
    .trim()
    .slice(0, maxLen);
}

/**
 * Field length limits used across all forms.
 */
export const FIELD_LIMITS = {
  full_name: 100,
  contact_person: 100,
  company_name: 150,
  mobile_number: 20,
  email: 120,
  current_location: 100,
  country_location: 100,
  preferred_country: 80,
  preferred_job_role: 100,
  required_job_roles: 100,
  message: 1000,
  notes: 1000,
  application_id: 50,
  appointment_id: 50,
  appointment_date: 20,
  appointment_time: 20,
  appointment_type: 50,
  visitor_type: 30,
} as const;

type FieldKey = keyof typeof FIELD_LIMITS;

/**
 * Sanitize a payload object by applying per-field sanitization and limits.
 * Keys not in FIELD_LIMITS are sanitized with the default 500 char limit.
 * Non-string values (numbers, booleans) pass through unchanged.
 */
export function sanitizePayload(
  payload: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "string") {
      const limit = (FIELD_LIMITS as Record<string, number>)[key] ?? 500;
      result[key] = sanitizeString(value, limit);
    } else {
      // Pass numbers, booleans, etc. through as-is
      result[key] = value;
    }
  }

  return result;
}
