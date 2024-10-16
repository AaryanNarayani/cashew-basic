import { Modal } from "flowbite-react";

interface ModalCompProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export function ModalComp({
  openModal,
  setOpenModal,
  title,
  children,
}: ModalCompProps) {
  return (
    <>
    <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="bg-blue-950/15"
      >
        <div className="bg-black p-4 text-white text-[35px] font-medium flex justify-between">
          <h1>{title}</h1>
          <div className="hover:cursor-pointer" onClick={()=>setOpenModal(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-7 mt-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
          </div>
        </div>
        <div className="min-w-full max-w-full min-h-[200px]">{children}</div>
      </Modal>
    </>
  );
}
export default ModalComp;
