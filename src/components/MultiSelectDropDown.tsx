import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Quant", value: "Quant" },
  { label: "Machine Learning", value: "Machine Learning" },
  { label: "Graduate", value: "Graduate" },
];

const  MultiSelectDropDown = () => {
    const [selected, setSelected] = useState([]);

    return (
            <MultiSelect 
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select" />
    );
}

export default MultiSelectDropDown;