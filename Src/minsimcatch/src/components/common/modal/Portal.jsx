import { useMemo } from "react";
import { createPortal } from "react-dom";

/**
 *
 * @param {object} props
 * @param {object} props.children
 * @param {string} props.elementId
 */

function Portal({ children, elementId }) {
  const rootElement = useMemo(
    () => document.getElementById(elementId),
    [elementId]
  );

  return createPortal(children, rootElement);
}

export default Portal;
