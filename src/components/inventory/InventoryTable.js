import { useSelector, useDispatch } from "react-redux";
import { removeInventoryItem } from "../../app/redux/actions/inventory";

export default function InventoryTable() {
  const dispatch = useDispatch();

  // Get Inventory from Redux
  const inventoryData = useSelector(
    (state) => state.inventory
  );

  // Make sure inventory is an Array
  const inventory = Array.isArray(inventoryData)
    ? inventoryData
    : Array.isArray(inventoryData?.inventory)
      ? inventoryData.inventory
      : [];

  // Delete Inventory Item
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmed) {
      dispatch(removeInventoryItem(id));
    }
  };

  return (
    <section className="inventory-table-section">

      <h3>Inventory List</h3>

      {inventory.length === 0 ? (
        <p className="inventory-empty">
          No inventory items found. Add your first item above.
        </p>
      ) : (
        <div className="inventory-table-wrapper">

          <table className="inventory-table">

            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>

                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>

                  <td>
                    <button
                      type="button"
                      className="inventory-delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </section>
  );
}