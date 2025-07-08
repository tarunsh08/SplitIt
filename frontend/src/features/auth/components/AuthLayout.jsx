import { useState } from "react";

// Custom MUI-style components
export const Box = ({ children, sx = {}, component = "div", ...props }) => {
  const baseStyles = {
    display: "flex",
    flexDirection: "column",
    ...sx,
  };

  const Component = component;
  return (
    <Component style={baseStyles} {...props}>
      {children}
    </Component>
  );
};

export const Container = ({ children, maxWidth = "sm", sx = {} }) => {
  const containerStyles = {
    maxWidth:
      maxWidth === "sm" ? "600px" : maxWidth === "md" ? "900px" : "1200px",
    margin: "0 auto",
    padding: "0 16px",
    width: "100%",
    ...sx,
  };

  return <div style={containerStyles}>{children}</div>;
};

export const Typography = ({
  variant = "body1",
  children,
  sx = {},
  color = "inherit",
  align = "inherit",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "h3":
        return { fontSize: "3rem", fontWeight: 400, lineHeight: 1.167 };
      case "h4":
        return { fontSize: "2.125rem", fontWeight: 400, lineHeight: 1.235 };
      case "h5":
        return { fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.334 };
      case "h6":
        return { fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.6 };
      case "subtitle1":
        return { fontSize: "1rem", fontWeight: 400, lineHeight: 1.75 };
      case "body1":
        return { fontSize: "1rem", fontWeight: 400, lineHeight: 1.5 };
      case "body2":
        return { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.43 };
      default:
        return { fontSize: "1rem", fontWeight: 400, lineHeight: 1.5 };
    }
  };

  const styles = {
    ...getVariantStyles(),
    color:
      color === "primary"
        ? "#1976d2"
        : color === "secondary"
        ? "#dc004e"
        : color === "textSecondary"
        ? "#6c757d"
        : color,
    textAlign: align,
    margin: 0,
    ...sx,
  };

  return <div style={styles}>{children}</div>;
};

export const TextField = ({
  label,
  variant = "outlined",
  fullWidth = false,
  type = "text",
  value,
  onChange,
  error = false,
  helperText,
  required = false,
  InputProps = {},
  sx = {},
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const containerStyles = {
    width: fullWidth ? "100%" : "auto",
    marginBottom: "16px",
    ...sx,
  };

  const inputStyles = {
    width: "100%",
    padding: "16px 14px",
    fontSize: "16px",
    border: `2px solid ${error ? "#d32f2f" : focused ? "#1976d2" : "#e0e0e0"}`,
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s ease",
    backgroundColor: "white",
    fontFamily: "inherit",
    paddingLeft: InputProps.startAdornment ? "48px" : "14px",
    paddingRight: InputProps.endAdornment ? "48px" : "14px",
  };

  const labelStyles = {
    position: "absolute",
    left: InputProps.startAdornment ? "48px" : "14px",
    top: focused || value ? "-8px" : "16px",
    fontSize: focused || value ? "12px" : "16px",
    color: error ? "#d32f2f" : focused ? "#1976d2" : "#666",
    backgroundColor: "white",
    padding: "0 4px",
    transition: "all 0.2s ease",
    pointerEvents: "none",
    transform: focused || value ? "translateY(0)" : "translateY(0)",
  };

  const helperTextStyles = {
    fontSize: "12px",
    color: error ? "#d32f2f" : "#666",
    marginTop: "4px",
    marginLeft: "14px",
  };

  return (
    <div style={containerStyles}>
      <div style={{ position: "relative" }}>
        {InputProps.startAdornment && (
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "16px",
              zIndex: 1,
            }}
          >
            {InputProps.startAdornment}
          </div>
        )}
        <label style={labelStyles}>
          {label} {required && <span style={{ color: "#d32f2f" }}>*</span>}
        </label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyles}
          {...props}
        />
        {InputProps.endAdornment && (
          <div
            style={{
              position: "absolute",
              right: "14px",
              top: "16px",
              zIndex: 1,
            }}
          >
            {InputProps.endAdornment}
          </div>
        )}
      </div>
      {helperText && <div style={helperTextStyles}>{helperText}</div>}
    </div>
  );
};

export const Button = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = false,
  children,
  onClick,
  sx = {},
  ...props
}) => {
  const [hover, setHover] = useState(false);

  const getColorStyles = () => {
    if (variant === "contained") {
      switch (color) {
        case "primary":
          return {
            backgroundColor: hover ? "#1565c0" : "#1976d2",
            color: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          };
        case "secondary":
          return {
            backgroundColor: hover ? "#c51162" : "#dc004e",
            color: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          };
        default:
          return {
            backgroundColor: hover ? "#1565c0" : "#1976d2",
            color: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          };
      }
    }
    return {
      backgroundColor: "transparent",
      color: "#1976d2",
      border: "none",
    };
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { padding: "6px 16px", fontSize: "13px" };
      case "large":
        return { padding: "12px 24px", fontSize: "15px" };
      default:
        return { padding: "10px 20px", fontSize: "14px" };
    }
  };

  const buttonStyles = {
    width: fullWidth ? "100%" : "auto",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
    ...getColorStyles(),
    ...getSizeStyles(),
    ...sx,
  };

  return (
    <button
      style={buttonStyles}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export const IconButton = ({ children, onClick, sx = {} }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    background: "none",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    backgroundColor: hover ? "rgba(0,0,0,0.04)" : "transparent",
    ...sx,
  };

  return (
    <button
      style={styles}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, sx = {} }) => {
  const styles = {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    padding: "32px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
    ...sx,
  };

  return <div style={styles}>{children}</div>;
};

export const Link = ({ children, onClick, sx = {} }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    color: hover ? "#1565c0" : "#1976d2",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: 500,
    transition: "color 0.2s ease",
    ...sx,
  };

  return (
    <span
      style={styles}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </span>
  );
};

// AuthLayout Component
const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card sx={{ width: "100%", maxWidth: "400px" }}>
            <Box sx={{ textAlign: "center", marginBottom: "32px" }}>
              <Typography
                variant="h4"
                sx={{ marginBottom: "8px", color: "#333", fontWeight: 600 }}
              >
                {title}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {subtitle}
              </Typography>
            </Box>
            {children}
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
