import React from "react";

export default function ConfirmModal({ show, message, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div 
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div 
        className="accent-box p-4 text-center"
        style={{
          width: "350px",
          background: "#111",
          borderRadius: "10px",
          boxShadow: "0 0 15px #0ff",
        }}
      >
        <h4 className="mb-3 text-neon">{message}</h4>

        <div className="d-flex gap-3 justify-content-center">
          <button className="neon-btn" onClick={onConfirm}>Yes</button>
          <button className="neon-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
