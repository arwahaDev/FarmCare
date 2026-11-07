import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../../app/redux/actions/expenses";

function ExpenseForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Seeds");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [crops, setCrops] = useState([]);
  const [cropId, setCropId] = useState("");

  useEffect(() => {
    try {
      const savedCrops = JSON.parse(
        localStorage.getItem("agri_crops") || "[]"
      );
      setCrops(savedCrops);
    } catch {
      setCrops([]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cropId) {
      alert("Please select a crop.");
      return;
    }

    if (
      !title.trim() ||
      !amount ||
      Number(amount) <= 0 ||
      !Number.isFinite(Number(amount)) ||
      !date
    ) {
      alert("Please enter a title, valid amount, and date.");
      return;
    }

    const selectedCrop = crops.find(
      (crop) => String(crop.id) === String(cropId)
    );

    const newExpense = {
      id: Date.now(),
      title: title.trim(),
      category,
      amount: Number(amount),
      date,
      cropId,
      cropName: selectedCrop?.name || "",
    };

    dispatch(addExpense(newExpense));

    setTitle("");
    setCategory("Seeds");
    setAmount("");
    setDate("");
    setCropId("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>Add Expense</h3>

      {crops.length === 0 && (
        <div className="alert alert-warning">
          Please add a crop before adding an expense.
        </div>
      )}

      <label htmlFor="expense-title">Expense Title</label>
      <input
        id="expense-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Wheat seeds"
        required
      />

      {/* Crop Selection */}
      <label htmlFor="expense-crop">Select Crop</label>
      <select
        id="expense-crop"
        value={cropId}
        onChange={(e) => setCropId(e.target.value)}
        required
      >
        <option value="">Select a crop</option>

        {crops.map((crop, index) => (
          <option key={crop.id || index} value={crop.id}>
            {crop.name}
          </option>
        ))}
      </select>

      <label htmlFor="expense-category">Category</label>
      <select
        id="expense-category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Seeds">Seeds</option>
        <option value="Fertilizer">Fertilizer</option>
        <option value="Labor">Labor</option>
        <option value="Fuel">Fuel</option>
        <option value="Equipment">Equipment</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="expense-amount">Amount (PKR)</label>
      <input
        id="expense-amount"
        type="number"
        min="0.01"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        required
      />

      <label htmlFor="expense-date">Date</label>
      <input
        id="expense-date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit" disabled={crops.length === 0}>
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;