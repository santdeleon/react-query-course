import React from "react";
import { defaultLabels } from "../helpers/defaultData";

// =============================================================================
// Label List
// =============================================================================

const LabelList = React.memo(({ setLabelFilter }) => (
  <div className="labels">
    <h2>Labels</h2>
    <ul>
      {defaultLabels.map(({ id, name, color }) => {
        return (
          <li key={id}>
            <button className={color} onClick={() => setLabelFilter(name)}>
              {name}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
));

export default LabelList;
