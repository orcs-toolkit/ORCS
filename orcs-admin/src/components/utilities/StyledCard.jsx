import React from "react";

const StyledCard = ({ title, body, borderColor }) => (
  <div
    className={`col-5 my-2 px-2 mx-3 text-black border-${borderColor} rounded border`}
  >
    <div className="d-inline-block relative py-3 mt-2">
      <h4 className="fs-22 font-w600">{title}</h4>
      <h3>{body}</h3>
    </div>
  </div>
);

export default StyledCard;
