"use client"

export default function CloseModalButton({ closeFunc }: { closeFunc: React.Dispatch<React.SetStateAction<boolean>> }) {

  return (
    <button
    onClick={() => closeFunc(false)}
    className="absolute top-7 right-5 flex justify-center items-center m-0 p-0 w-6 h-6">
      <span className="relative close-modal-btn w-6 h-6"/>
    </button>
  );
}
