import React, { useState, useEffect } from "react";
import "./App.css";

const initialExpense = { id: "", amount: "", date: "", category: "", note: "" };
const categories = ["Food", "Travel", "Bills", "Others"];

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(initialExpense);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const validate = () => {
    const e = {};
    if (!form.amount || Number(form.amount) <= 0) e.amount = "Amount must be positive";
    if (!form.date) e.date = "Date is required";
    if (!form.category) e.category = "Category is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const resetForm = () => {
    setForm(initialExpense);
    setErrors({});
    setEditMode(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editMode) {
      setExpenses(exp =>
        exp.map(item => (item.id === form.id ? { ...form } : item))
      );
    } else {
      setExpenses(exp => [...exp, { ...form, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const onEdit = (id) => {
    const exp = expenses.find(e => e.id === id);
    if (exp) {
      setForm(exp);
      setEditMode(true);
      setErrors({});
    }
  };

  const onDelete = (id) => {
    if (window.confirm("Delete this expense?")) {
      setExpenses(exp => exp.filter(e => e.id !== id));
      if (editMode && form.id === id) resetForm();
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Personal Expense Tracker</h1>

      <form onSubmit={onSubmit} style={{ marginBottom: 20, padding: 15, border: "1px solid #ccc", borderRadius: 5 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Amount</label><br />
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
          />
          <div style={{ color: "red", fontSize: 12 }}>{errors.amount}</div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Date</label><br />
          <input
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />
          <div style={{ color: "red", fontSize: 12 }}>{errors.date}</div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Category</label><br />
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div style={{ color: "red", fontSize: 12 }}>{errors.category}</div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Note (optional)</label><br />
          <input
            type="text"
            value={form.note}
            onChange={e => setForm({ ...form, note: e.target.value })}
            placeholder="Add note"
          />
        </div>

        <button type="submit">{editMode ? "Update Expense" : "Add Expense"}</button>
        {editMode && (
          <button type="button" style={{ marginLeft: 10 }} onClick={resetForm}>Cancel</button>
        )}
      </form>

      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses found. Add one above.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th align="left">Amount</th>
              <th align="left">Date</th>
              <th align="left">Category</th>
              <th align="left">Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(({ id, amount, date, category, note }) => (
              <tr key={id} style={{ borderBottom: "1px solid #eee" }}>
                <td>₹{parseFloat(amount).toFixed(2)}</td>
                <td>{date}</td>
                <td>{category}</td>
                <td>{note}</td>
                <td>
                  <button onClick={() => onEdit(id)} style={{ marginRight: 6 }}>Edit</button>
                  <button onClick={() => onDelete(id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
