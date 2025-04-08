import { Toast } from "react-bootstrap";
import ToastInfo from "../../types/ToastInfo";
import { useState } from "react";

export default function SingleToast({ toastInfo }: { toastInfo: ToastInfo }) {
  const [show, setShow] = useState<boolean>(true);

  return (
    <Toast bg={toastInfo.toastVariant} className="m-2" show={show} onClose={() => setShow(false)} delay={3000} autohide>
      <Toast.Body className={toastInfo.toastVariant === "dark" ? "text-white" : ""}>{toastInfo.message}</Toast.Body>
    </Toast>
  );
}
