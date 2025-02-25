'use client'

import React, { useState } from 'react';
import CustomButton from './CustomButton';
import FormReportError from './FormReportError';
import Modal from './Modal';
import Rules from './Rules';

export default function GameHelp() {

  const [showReportErrorModal, setShowReportErrorModal] = useState(false)
  const [showRulesModal, setRulesModal] = useState(false)


  return (
    <>
      <div className="bg-gray-100 py-16 rounded-lg text-center">
        <h3 className="text-2xl font-bold">Поможем чем сможем</h3>
        <CustomButton onClickFunc={() => setShowReportErrorModal(!showReportErrorModal)} className="max-w-52 mx-auto mt-3" theme='dark'>Сообщить об ошибке</CustomButton>
        <CustomButton onClickFunc={() => setRulesModal(!showRulesModal)} className="max-w-52 mx-auto mt-3" theme='dark'>Правила игры</CustomButton>
      </div>
      <Modal showModal={showReportErrorModal} showModalFunc={setShowReportErrorModal}>
        <FormReportError/>
      </Modal>
      <Modal showModal={showRulesModal} showModalFunc={setRulesModal}>
        <Rules/>
      </Modal>
    </>
  );
};