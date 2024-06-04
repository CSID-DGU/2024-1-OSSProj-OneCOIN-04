import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const Portal = ({ children, elementId }) => {
  const rootElemRef = useRef(document.createElement("div"));

  useEffect(() => {
    const parentElem = document.getElementById(elementId);
    parentElem.appendChild(rootElemRef.current);

    return () => {
      rootElemRef.current.remove();
    };
  }, [elementId]);

  return createPortal(children, rootElemRef.current);
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  elementId: PropTypes.string.isRequired,
};

export default Portal;
