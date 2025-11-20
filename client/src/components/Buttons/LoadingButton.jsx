import React from "react";
import { Loader2, Check, XCircle } from "lucide-react";


const LoadingButton = ({
  onClick,
  loading,
  success,
  error,
  text = "Submit",
  successText = "Success",
  errorText = "Failed",
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 text-white font-medium transform transition-all duration-300
        ${loading ? "scale-95 opacity-80" : "scale-100"}
        ${
          success
            ? "bg-green-500 hover:bg-green-600"
            : error
            ? "bg-red-500 hover:bg-red-600"
            : "bg-purple-500 hover:bg-purple-600"
        }
        ${className}`}
    >
      {loading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Processing...
        </>
      ) : success ? (
        <>
          <Check size={20} />
          {successText}
        </>
      ) : error ? (
        <>
          <XCircle size={20} />
          {errorText}
        </>
      ) : (
        <>
          <Check size={20} />
          {text}
        </>
      )}
    </button>
  );
};

export default LoadingButton;
