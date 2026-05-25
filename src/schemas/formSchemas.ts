import { z } from "zod";

export const jobSeekerSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number (minimum 10 digits)." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  preferredCountry: z.string().min(1, { message: "Please select a preferred country." }),
  jobCategory: z.string().min(2, { message: "Please select or type a job category." }),
  experience: z.string().min(1, { message: "Please select your years of experience." }),
  cvFile: z.any().optional(), // In client-side stub this is handled as custom file input
  message: z.string().optional()
});

export const employerSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  contactPerson: z.string().min(2, { message: "Contact person name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid contact phone number." }),
  email: z.string().email({ message: "Please enter a valid business email." }),
  industry: z.string().min(1, { message: "Please select an industry category." }),
  workersRequired: z.number().min(1, { message: "Number of workers required must be at least 1." }),
  location: z.string().min(2, { message: "Please enter the job location/country." }),
  message: z.string().optional()
});

export type JobSeekerFormValues = z.infer<typeof jobSeekerSchema>;
export type EmployerFormValues = z.infer<typeof employerSchema>;
