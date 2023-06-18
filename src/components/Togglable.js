import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? "none" : "" }; //hide when form is visible
  const show = { display: visible ? "" : "none" }; //show when form is visible

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
