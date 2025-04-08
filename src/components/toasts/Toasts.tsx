import { useAppState } from "../../contexts/AppState";
import SingleToast from "./SingleToast";

export default function Toasts() {
  const [appState, _] = useAppState();
  return (
    <div className="position-absolute bottom-0 end-0">
      {appState.toasts?.map((x) => (
        <SingleToast toastInfo={x} />
      ))}
    </div>
  );
}
