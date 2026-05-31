# Google Apps Script — Payment Flow Update

This document contains the code you need to **manually add** to your Google Apps Script project to support the payment flow.

## Overview

Two changes are needed:

1. **Add `lookup_application_by_id` action handler** to the existing `doPost(e)` dispatcher
2. **Add the `lookupApplicationById()` function** that searches the Applications sheet
3. **(Optional)** Update `submitApplication()` to write payment columns

---

## Step 1: Update `doPost(e)` Dispatcher

In your existing `doPost(e)` function, add this condition **before** the final error/fallback return:

```javascript
// Add this inside doPost(e) alongside your existing action handlers
if (body.action === "lookup_application_by_id") {
  return lookupApplicationById(body);
}
```

Your `doPost` should look something like:

```javascript
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (body.action === "application") {
      return submitApplication(body);
    }

    if (body.action === "employer_inquiry") {
      return submitEmployerInquiry(body);
    }

    // NEW — Payment flow lookup
    if (body.action === "lookup_application_by_id") {
      return lookupApplicationById(body);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: "Unknown action" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Step 2: Add `lookupApplicationById()` Function

Paste this function into your Apps Script project:

```javascript
/**
 * Looks up an application by application_id in the Applications sheet.
 * Returns only safe/public fields — never returns internal columns.
 */
function lookupApplicationById(data) {
  try {
    // Validate input
    if (!data.application_id || typeof data.application_id !== "string") {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: "application_id is required"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Applications");

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: "Applications sheet not found"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var dataRange = sheet.getDataRange();
    var values = dataRange.getValues();

    if (values.length < 2) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: "Application not found"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Get headers (first row)
    var headers = values[0].map(function(h) {
      return String(h).toLowerCase().trim();
    });

    // Find the application_id column index
    var appIdColIndex = headers.indexOf("application_id");
    if (appIdColIndex === -1) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: "application_id column not found in sheet"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Search for the matching row
    var matchedRow = null;
    for (var i = 1; i < values.length; i++) {
      if (String(values[i][appIdColIndex]).trim() === data.application_id.trim()) {
        matchedRow = values[i];
        break;
      }
    }

    if (!matchedRow) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: "Application not found"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Build a map of column name -> value for the matched row
    var rowMap = {};
    for (var j = 0; j < headers.length; j++) {
      rowMap[headers[j]] = String(matchedRow[j] || "");
    }

    // Return only safe fields
    var safeData = {
      application_id:    rowMap["application_id"] || "",
      full_name:         rowMap["full_name"] || "",
      mobile_number:     rowMap["mobile_number"] || "",
      job_id:            rowMap["job_id"] || "",
      country_slug:      rowMap["country_slug"] || "",
      role:              rowMap["role"] || "",
      preferred_country: rowMap["preferred_country"] || "",
      preferred_job_role:rowMap["preferred_job_role"] || "",
      payment_required:  rowMap["payment_required"] || "",
      payment_amount:    rowMap["payment_amount"] || "",
      payment_status:    rowMap["payment_status"] || "",
      status:            rowMap["status"] || ""
    };

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: safeData
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: "Server error: " + err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

------

## Step 2.5: Generate Application ID inside `submitApplication()` on Backend

Instead of the frontend generating the `application_id` (which can cause mismatches), we now generate it exclusively inside Google Apps Script to guarantee they match perfectly.

Update your `submitApplication(data)` function in your Apps Script to implement this logic:

1. **Generate the unique Application ID inside the function**:
   ```javascript
   // Generate unique Application ID on the backend (e.g. APP-20260530-1538-2910)
   var date = new Date();
   var year = date.getFullYear();
   var month = ("0" + (date.getMonth() + 1)).slice(-2);
   var day = ("0" + date.getDate()).slice(-2);
   var hours = ("0" + date.getHours()).slice(-2);
   var minutes = ("0" + date.getMinutes()).slice(-2);
   var randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
   
   var applicationId = "APP-" + year + month + day + "-" + hours + minutes + "-" + randomNum;
   ```

2. **Save `applicationId` and dynamic `payment_link` to the row**:
   - Write the generated `applicationId` to the sheet's `application_id` column.
   - Write `"/pay?application_id=" + applicationId` to the sheet's `payment_link` column.

3. **Ensure you return the generated `application_id` in the JSON response**:
   ```javascript
   return ContentService
     .createTextOutput(JSON.stringify({
       success: true,
       message: "Application submitted successfully",
       application_id: applicationId
     }))
     .setMimeType(ContentService.MimeType.JSON);
   ```

---

## Step 3: Add Payment Columns to Applications Sheet

Add these column headers to your Applications sheet (in the header row) if they don't already exist:

| Column Header | Description |
|---|---|
| `payment_required` | Whether payment is required (YES/NO) |
| `payment_amount` | Token money amount |
| `payment_status` | Pending, Paid, Failed |
| `payment_gateway` | Gateway name (for future use) |
| `payment_order_id` | Gateway order ID (for future use) |
| `payment_transaction_id` | Gateway transaction ID (for future use) |
| `payment_date` | Date of payment completion (for future use) |
| `payment_link` | Direct payment link for the application |

Google Apps Script will now write these headers and the generated `applicationId` / `payment_link` fields automatically if they are mapped to the sheet columns.

If your `submitApplication()` uses a fixed list of columns, add these new fields to that list.

---

## Step 4: Re-deploy

After making changes:

1. Go to **Deploy → Manage deployments** in the Apps Script editor
2. Click the pencil icon on your active deployment
3. Set **Version** to "New version"
4. Click **Deploy**
5. Test by calling the `/api/applications/lookup` endpoint from your Next.js app

---

## Testing

You can test the lookup locally by sending this request:

```bash
curl -X POST http://localhost:3000/api/applications/lookup \
  -H "Content-Type: application/json" \
  -d '{"application_id": "APP-1717100000-123"}'
```

Expected responses:

- **Found**: `{ "success": true, "data": { "application_id": "...", ... } }`
- **Not found**: `{ "success": false, "message": "Application not found" }`
