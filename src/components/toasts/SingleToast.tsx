import { Toast } from "react-bootstrap";
import ToastInfo from "../../types/ToastInfo";
import { useState } from "react";

export default function SingleToast({ toastInfo }: { toastInfo: ToastInfo }) {
  const [show, setShow] = useState<boolean>(true);
  return (
    <Toast bg="secondary" className="m-2" show={show} onClose={() => setShow(false)} delay={3000} autohide>
      <Toast.Body className="text-white">{toastInfo.message}</Toast.Body>
    </Toast>
  );
}
