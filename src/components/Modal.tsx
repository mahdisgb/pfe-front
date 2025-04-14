import React from "react";
type ModalProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title: string;
  onSubmit?: ()=>void,
  customButton?:boolean
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children, title,onSubmit,customButton =true }) => {
  return (
    <>
      {open  && (
          <div className="w-screen h-screen bg-[rgba(0,0,0,.3)] z-[9999] fixed inset-0 flex  justify-center">
            <div className="pt-[10vh]">
            <div className="p-6 pb-0 bg-white rounded-lg *:pb-5">
              <div className="block">
                <h1 className="text-base">{title}</h1>
              </div>
              <div >{children}</div>
              {customButton && (
                <div className="flex justify-end items-center gap-2 *:font-base *:text-sm ">
                <button
                  onClick={onClose}
                  className="py-1 px-3 border-solid border-[#ccc] hover:border-primary border-[1px] hover:text-primary rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={onSubmit}
                  type="submit"
                  className="py-1 px-3 border-solid border-[#ccc] hover:border-primary border-[1px] hover:text-primary rounded-lg"
                >
                  Enregistrer
                </button>
              </div>
              )}
              
            </div>
              </div>
          </div>
      )}
    </>
  );
};

export default Modal;