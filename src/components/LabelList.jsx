import React from "react";

const LabelList = React.memo(({ labels }) => (
  <div className="labels">
    <h2>Labels</h2>
    <ul>
      {labels.map(({ id, name, color }) => {
        return (
          <li key={id}>
            <button className={color}>{name}</button>
          </li>
        );
      })}
    </ul>
  </div>
));

export default LabelList;
