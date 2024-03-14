import React, { useEffect } from "react";

interface TooltipProps {
  tooltipText?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ tooltipText }) => {
  useEffect(() => {
    const tooltip = document.getElementById("tooltip");

    if (tooltip) {
      const tooltipTextElement = tooltip.querySelector(".js-tooltip-text");

      const positionTooltip = () => {
        const headerHeight =
          document.querySelector(".js-site-header").offsetHeight;

        // Reset to default position
        tooltipTextElement.classList.remove("pos-bottom");
        tooltipTextElement.style.setProperty("--offset-x", "0px");

        const rect = tooltipTextElement.getBoundingClientRect();

        // Check for overflow
        const overflowTop = rect.top < headerHeight;
        const overflowLeft = rect.left < 0;
        const overflowRight = rect.right > window.innerWidth;

        if (overflowTop) {
          tooltipTextElement.classList.add("pos-bottom");
        }

        if (overflowLeft) {
          const overflowAmount = Math.abs(rect.left);
          tooltipTextElement.style.setProperty(
            "--offset-x",
            `${overflowAmount}px`
          );
        } else if (overflowRight) {
          const overflowAmount = rect.right - window.innerWidth;
          tooltipTextElement.style.setProperty(
            "--offset-x",
            `-${overflowAmount}px`
          );
        }
      };

      ["mouseover", "click"].forEach((event) =>
        tooltip.addEventListener(event, positionTooltip)
      );
    }
  }, []);

  if (!tooltipText) {
    return null;
  }

  return (
    <span id="tooltip" className="tooltip js-tooltip" tabIndex={0}>
      <svg className="icon">
        <use href="#info"></use>
      </svg>
      <span className="tooltip-text js-tooltip-text">
        <span className="tooltip-inner">{tooltipText}</span>
      </span>
    </span>
  );
};

export default Tooltip;

{
  /* <Tooltip tooltipText="Your tooltip text goes here" /> */
}
