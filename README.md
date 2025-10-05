# Personal Expense Tracker

A simple expense tracker built with React. Lets you add, edit, and delete expenses with amount in ₹, date, category, and an optional note. All data is stored in your browser — no server required.

## Features

- Add a new expense (amount in rupees, date, category, note)
- Edit and update an existing expense
- Delete any expense
- Data saved in browser (localStorage)
- Required field validation
- Basic categories: Food, Travel, Bills, Others
- Minimal, clean interface

## How to Run

1. Make sure Node.js is installed on your computer.
2. Download all project files into a folder.
3. Open a terminal in that folder.
4. Run:
   ```
   npm install
   npm start
   ```
5. Go to http://localhost:3000 in your browser.

## How it Works

- Fill in amount, date, category, and (optional) note, then click Add Expense.
- To edit, click "Edit" next to any entry, change details, then click Update Expense.
- To delete, click "Delete" and confirm.
- Data stays in your browser even after a refresh or restart.

## Assumptions

- Only the current user tracks their own expenses (no user/login system).
- App is for personal use only, not shared between users or devices.
- Only the given basic categories.
- Rupees (₹) is the currency.

## Example

Add an expense like this:

| Amount  | Date       | Category | Note   |
| ------- | ---------- | -------- | ------ |
| ₹500.00 | 2025-10-05 | Food     | Dinner |
