# Interactive Lead Forms: Validation & Production Integrations

This document explains the validation mechanisms, schemas, hooks, and simulated backend states for the **Job Seeker Form** and **Employer Enquiry Form** in the **Trendy Fortune** website, along with step-by-step instructions to link them to live databases.

---

## 🔒 Form Validation Architecture

Validation uses a decoupled, type-safe schema pattern matching **Zod** schema constraints with **React Hook Form** state bindings via `@hookform/resolvers/zod`:

* **Source File**: `src/schemas/formSchemas.ts`
* **Layout File**: `src/components/LeadForm.tsx`

### 1. Job Seeker Validation Rules
* **`fullName`**: Must be a string of at least 2 characters.
* **`phone`**: Minimum of 10 digits required (protects against incomplete mobile entries).
* **`email`**: Must be a legally formatted email address.
* **`preferredCountry`**: Cannot be empty (select dropdown).
* **`jobCategory`**: Must specify an interest area.
* **`experience`**: Cannot be empty (years select dropdown).

### 2. Employer Enquiry Validation Rules
* **`companyName` & `contactPerson`**: Minimum 2 characters.
* **`phone` & `email`**: Valid mobile digits and business email.
* **`industry` & `location`**: Must specify business industry sector and deployment site.
* **`workersRequired`**: Must be a positive number of at least 1 worker.

---

## ⚙️ Submission Pipeline & Toast Feedback

When the user clicks "Submit":
1. **Zod Validation check**: If any input is invalid, form submission halts and localized warning texts appear instantly below offending inputs.
2. **Loading States**: The button switches to `isLoading = true`, showing a spinner and disabling double clicks.
3. **Simulated Latency**: A simulated 2-second API delay mimics real-world network requests.
4. **Toast Notification**: Triggers an animated popup with a success/error tag.
5. **Console Logging**: The fully structured JSON payload logs to the browser console.

---

## 🛰️ Production Integration Roadmap

To transition from the current simulated layout to live database captures, follow these guides:

### Option A: Connecting to Supabase (Recommended)

To store lead submissions directly in a Postgres database:

1. Install the Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```
2. Set up a database client helper in `src/lib/supabase.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```
3. Update the submit handlers inside `src/components/LeadForm.tsx`:
   ```typescript
   // Inside LeadForm.tsx - Seeker Submit handler:
   const onSeekerSubmit = async (data: JobSeekerFormValues) => {
     setIsSubmittingSeeker(true);
     try {
       const { error } = await supabase
         .from('job_seeker_leads')
         .insert([{
           full_name: data.fullName,
           phone: data.phone,
           email: data.email,
           preferred_country: data.preferredCountry,
           job_category: data.jobCategory,
           experience: data.experience,
           message: data.message
         }]);

       if (error) throw error;

       toast({
         title: "Application Received!",
         description: "Details successfully written to Supabase.",
         type: "success"
       });
       seekerForm.reset();
     } catch (err) {
       toast({
         title: "Submission Error",
         description: err.message,
         type: "error"
       });
     } finally {
       setIsSubmittingSeeker(false);
     }
   };
   ```

---

### Option B: Connecting to Google Sheets (Zero-Cost CMS)

To write submissions directly to a Google Spreadsheet:

1. Create a **Google Apps Script** inside your target Google Sheet:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       new Date(),
       data.fullName || data.companyName,
       data.phone,
       data.email,
       data.preferredCountry || data.location,
       data.jobCategory || data.industry,
       data.experience || data.workersRequired,
       data.message
     ]);
     return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```
2. Deploy the Apps Script as a **Web App** and copy the resulting Web App URL.
3. Update your submit handlers in `src/components/LeadForm.tsx` to execute a simple fetch post request:
   ```typescript
   const onSeekerSubmit = async (data: JobSeekerFormValues) => {
     setIsSubmittingSeeker(true);
     try {
       const response = await fetch("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
         mode: "no-cors" // Standard Apps Script CORS bypass
       });

       toast({
         title: "Application Received!",
         description: "Written to Google Sheet.",
         type: "success"
       });
       seekerForm.reset();
     } catch (err) {
       // Handle errors...
     } finally {
       setIsSubmittingSeeker(false);
     }
   };
   ```
This makes data collection completely cost-free and lets non-technical staff manage recruiters easily!
