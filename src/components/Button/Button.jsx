import { useCallback } from "react";

const Button = ({ cssClasses, onClick, color, disabled, loading, icon, text, outlined }) => {
  const additionalClasses = useCallback(() => {
    const c = []
    switch (color) {
      case 'primary':
        c.push(outlined ? 'btn-outline-primary' : 'btn-primary')
    }
    return c
  }, [])

  return (
    <button
      className={'btn ' + cssClasses + " " + additionalClasses().join(' ')}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading &&
        <span
          className="spinner-border spinner-border-sm me-1"
          aria-hidden="true"
        ></span>
      }
      {icon &&
        <svg href={icon} className="bi pe-none" width="16" height="16" />
      }
      {text}
    </button>
  );
};


export default Button;
