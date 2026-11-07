import { useSelector } from "react-redux";
import { useState } from "react";

function WageSummary() {
  const workers = useSelector(
    (state) => state.workers?.workers ?? []
  );

  const attendance = useSelector(
    (state) => state.attendance?.records ?? []
  );

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const calculateWage = (worker) => {
    const workerRecords = attendance.filter(
      (record) =>
        String(record.workerId) === String(worker.id) &&
        record.date?.startsWith(selectedMonth)
    );

    const presentDays = workerRecords.filter(
      (record) => record.status === "Present"
    ).length;

    const halfDays = workerRecords.filter(
      (record) => record.status === "Half-day"
    ).length;

    const totalDays = presentDays + halfDays * 0.5;

    return {
      presentDays,
      halfDays,
      totalDays,
      payable: totalDays * Number(worker.dailyWage || 0),
    };
  };

  const totalPayable = workers.reduce(
    (total, worker) =>
      total + calculateWage(worker).payable,
    0
  );

  return (
    <section className="wage-summary">
      <h3>Monthly Wage Summary</h3>

      <div className="mb-3">
        <label htmlFor="wage-month">Select Month</label>

        <input
          id="wage-month"
          type="month"
          className="form-control"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      <div className="alert alert-success">
        <strong>Total Wages Payable: </strong>
        PKR {totalPayable.toLocaleString()}
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Worker Name</th>
              <th>Daily Wage</th>
              <th>Present Days</th>
              <th>Half Days</th>
              <th>Payable Amount</th>
            </tr>
          </thead>

          <tbody>
            {workers.map((worker) => {
              const wage = calculateWage(worker);

              return (
                <tr key={worker.id}>
                  <td>{worker.fullName}</td>
                  <td>
                    PKR {Number(worker.dailyWage || 0).toLocaleString()}
                  </td>
                  <td>{wage.presentDays}</td>
                  <td>{wage.halfDays}</td>
                  <td>
                    PKR {wage.payable.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default WageSummary;