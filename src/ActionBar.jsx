const ActionBar = ({ children, ...props }) => {
  return <div className="action-bar d-flex gap-2">{children}</div>;
};

export default ActionBar;
