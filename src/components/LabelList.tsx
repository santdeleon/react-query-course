import React from "react";
import { defaultLabels } from "../helpers/defaultData";

// =============================================================================
// Label List
// =============================================================================

const LabelList = React.memo(({ setFilterConfig }) => (
  <div className="labels">
    <h2>Labels</h2>
    <ul>
      {defaultLabels.map(({ id, name, color }) => {
        return (
          <li key={id}>
            <button
              className={color}
              onClick={() => setFilterConfig({ type: "label", value: name })}
            >
              {name}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
));

export default LabelList;
