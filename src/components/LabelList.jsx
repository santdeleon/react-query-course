import React from "react";
import {defaultLabels} from "../helpers/defaultData"


const LabelList = () => {
return (
  <div className="labels">
    <h3>Labels</h3>
    <ul>
    {defaultLabels.map(({id, name, color}) => (
      <li>
        <button className={color}>
        {name}
        </button>
      </li>
    ))}
    </ul>
  </div>
)
}


export default LabelList
