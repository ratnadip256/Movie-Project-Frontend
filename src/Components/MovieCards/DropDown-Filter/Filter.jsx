import React from "react";

const Filter = ({ title, options, func }) => {
  return (
    <div className="select">
      <select
        onChange={func}
        className="outline-none focus:outline-none focus:ring-0"
        defaultValue="0"
        name="format"
        id="format"
      >
        <option className="options text-gray-300" value="0" disabled>
          {title}
        </option>

        {options.map((op, i) => (
          <option
            key={i}
            value={op.value}  
            className="options text-gray-100"
            style={{
              background: "rgba(28, 28, 35, 0.65)",
              backdropFilter: "blur(10px)",
              color: "#e5e5e5",
            }}
          >
            {op.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
