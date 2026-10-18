# Search Page Specification — Thoughts

## Objective

Build a search page that allows visitors to find content by keywords, content type, and date.

## Search Features

### 1. Keyword Search

- Search titles, descriptions, and article content where available.
- Search should be case-insensitive.
- Empty search text should display all content matching the active filters.

### 2. Content Type Filter

Provide four options:

- All
- Articles
- Signals
- Books

### 3. Date Filtering

Support the following:

- **Year:** Show all content from a selected year.
- **Month:** Show all content from a selected month, across any year.
- **Year + Month:** Show content from a specific month in a specific year.
- **Custom Date Range:** Select a start date and end date, inclusive.

Year/month selection and custom date range should be alternative filtering modes, not conflicting filters.

Use each item's website publication date. For Books, use the date the recommendation was added to the website.

### 4. Combining Filters

All active filters should work together.

Example: Searching "statistics", selecting Articles, and choosing 2025 should return only matching articles published in 2025.

### 5. Results

- Display results newest first.
- Show title, description, thumbnail (when available), content type, and date.
- Clicking a result opens its corresponding page.
- Display the number of matching results.
- Show a helpful message when no results match.

### 6. User Interface

- Search bar at the top.
- Content-type filters below the search bar.
- Year and month dropdowns.
- Optional custom date range with start/end date pickers.
- Clear Filters button.
- Responsive layout for desktop and mobile.

## Technical Requirements

- Use the existing Astro architecture and content collections.
- Avoid introducing a database or backend.
- Keep filtering client-side for the initial version.
- Do not change unrelated pages or features.
- Preserve the website's existing visual style.

## Acceptance Criteria

- Keyword search works independently.
- Year and month filters work independently and together.
- Custom date ranges include both boundary dates.
- Keyword, content type, and date filters combine correctly.
- Clearing filters restores all results.
- Empty results are handled correctly.
- Search works on desktop and mobile.
- Existing navigation and article links remain functional.
