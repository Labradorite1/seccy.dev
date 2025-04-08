import ToastInfo from "./ToastInfo";

export default interface AppState {
  header: boolean;
  refreshHeader: boolean;
  toasts: ToastInfo[];
}
