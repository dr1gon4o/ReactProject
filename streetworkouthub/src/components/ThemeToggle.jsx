import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { useEffect } from "react";

export default function ThemeToggle() {
  const dim = useSelector((state) => state.theme.neon);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className = dim ? "dim-mode" : "";
  }, [dim]);

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="switchCheckDim"
        onChange={() => dispatch(toggleTheme())}
        checked={dim}
      />
    </div>
  );
}
