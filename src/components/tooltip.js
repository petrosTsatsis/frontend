import React, { useState } from 'react';
import '../App.css'; // You can style your tooltip in a separate CSS file

const Tooltip = ({ text, children }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const showTooltip = () => {
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <div className="tooltip-container" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isTooltipVisible && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default Tooltip;