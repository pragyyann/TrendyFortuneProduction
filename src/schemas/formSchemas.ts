import { z } from "zod";

export const jobSeekerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(100, { message: "Full name must be 100 characters or fewer." })
    .trim(),
  phone: z
    .string()
    .min(7, { message: "Please enter a valid phone number." })
    .max(20, { message: "Phone number must be 20 characters or fewer." })
    .trim(),
  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .max(120, { message: "Email address must be 120 characters or fewer." })
    .email({ message: "Please enter a valid email address." })
    .trim(),
  currentLocation: z
    .string()
    .min(2, { message: "Current location is required." })
    .max(100, { message: "Location must be 100 characters or fewer." })
    .trim(),
  preferredCountry: z
    .string()
    .min(1, { message: "Please select a preferred country." })
    .max(80, { message: "Country must be 80 characters or fewer." }),
  preferredJobRole: z
    .string()
    .min(2, { message: "Please enter the job role you are interested in." })
    .max(100, { message: "Job role must be 100 characters or fewer." })
    .trim(),
  experience: z.enum(["Fresher", "1-2 Years", "2-5 Years", "5+ Years"], {
    message: "Please select your work experience.",
  }),
  passportStatus: z.enum(
    ["Yes, I have passport", "No, but I have applied", "No, I have not applied"],
    { message: "Please select your passport status." }
  ),
  cvFile: z.any().optional(),
  message: z
    .string()
    .max(1000, { message: "Message must be 1000 characters or fewer." })
    .optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to be contacted to submit.",
    }),
  // Honeypot — should always be empty. Never shown to real users.
  website: z.string().optional(),
});

export const employerSchema = z.object({
  companyName: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." })
    .max(150, { message: "Company name must be 150 characters or fewer." })
    .trim(),
  contactPerson: z
    .string()
    .min(2, { message: "Contact person name must be at least 2 characters." })
    .max(100, { message: "Contact person name must be 100 characters or fewer." })
    .trim(),
  phone: z
    .string()
    .min(7, { message: "Please enter a valid contact phone number." })
    .max(20, { message: "Phone number must be 20 characters or fewer." })
    .trim(),
  email: z
    .string()
    .max(120, { message: "Email must be 120 characters or fewer." })
    .email({ message: "Please enter a valid business email." })
    .trim(),
  industry: z
    .string()
    .min(1, { message: "Please select an industry category." }),
  workersRequired: z
    .number()
    .min(1, { message: "Number of workers required must be at least 1." })
    .max(10000, { message: "Number of workers must be 10,000 or fewer." }),
  location: z
    .string()
    .min(2, { message: "Please enter the job location/country." })
    .max(100, { message: "Location must be 100 characters or fewer." })
    .trim(),
  requiredJobRoles: z
    .string()
    .min(2, { message: "Please enter the job roles you require." })
    .max(100, { message: "Job roles must be 100 characters or fewer." })
    .trim(),
  message: z
    .string()
    .min(5, { message: "Please enter your inquiry details." })
    .max(1000, { message: "Message must be 1000 characters or fewer." })
    .trim(),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to be contacted to submit.",
    }),
  // Honeypot — should always be empty.
  website: z.string().optional(),
});

export type JobSeekerFormValues = z.infer<typeof jobSeekerSchema>;
export type EmployerFormValues = z.infer<typeof employerSchema>;
