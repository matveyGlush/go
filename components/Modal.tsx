"use client"

import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import CloseModalButton from './CloseModalButton';

interface CustomModalProps {
  children?: ReactNode,
  className?: string,
  showModalFunc: React.Dispatch<React.SetStateAction<boolean>>,
  showModal: boolean,
}

export default function Modal({ children, className = '', showModal, showModalFunc }: CustomModalProps) {

  const dialogRef = useRef<HTMLDialogElement>(null)

  useLayoutEffect(() => {
      if (dialogRef.current?.open && !showModal) {
        dialogRef.current?.close()
        document.body.style.overflow = 'auto'
      } else if (!dialogRef.current?.open && showModal) {
        dialogRef.current?.showModal()
        document.body.style.overflow = 'hidden'
        document.body.style.height = '100%'
      }
  }, [showModal])

  return (
    <>
      <dialog
        ref={dialogRef}
        className={`fixed inset-0 w-full max-w-lg dialog-backdrop rounded-md p-4 md:p-12 border bg-gray-100 text-black ${className}`}
      >
        <CloseModalButton closeFunc={showModalFunc}/>
        {children}
      </dialog>
    </>
  );
};