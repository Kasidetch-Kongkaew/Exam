import CancelIcon from "@mui/icons-material/Cancel";
import classes from "./FormInput.module.css";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ open, onClose, children }: ModalProps) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors 
${open ? "visible bg-black/20" : "invisible"}`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-[20px] pb-10 pt-7 lg:px-10 px-4 shadow-md transition-all 
      ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      `}
      >
        <div
          className={`${classes.Close} absolute top-2 right-2 p-1`}
          onClick={onClose}
        >
          <CancelIcon />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
