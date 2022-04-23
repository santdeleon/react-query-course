import React from "react";
import { possibleStatuses } from "../helpers/defaultData";

// =============================================================================
// Status Select
// =============================================================================

const StatusSelect = ({ filterConfig, handleStatusSelection }) => (
  <>
    <h3>Status</h3>
    <select
      name="status"
      id="status"
      value={filterConfig?.type === "status" ? filterConfig?.filter : undefined}
      onChange={handleStatusSelection}
      className="status-select"
    >
      <option disabled>Select a status to filter</option>
      {possibleStatuses.map(({ id, label }) => (
        <option key={id} id={label} value={label}>
          {label}
        </option>
      ))}
    </select>
  </>
);

export default StatusSelect;
