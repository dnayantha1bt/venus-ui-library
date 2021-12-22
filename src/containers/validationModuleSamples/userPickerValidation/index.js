import React, { useEffect, useState } from "react";
import { formFields } from "./formConfig";
import CreateFormComponent from "../../../UILibrary/components/forms";
import PickUsersContainer from "../../../UILibrary/components/pickUsers";
import constants from "../../../UILibrary/constants";
import data from "./dataset.json";
import {
  APPROVAL_FORM_SECTION,
  ASSETS_FORM_SECTION,
  FORM_NAME,
  FORM_TITLE,
  REQUEST_A_FORMAL_PROPOSAL_FROM_US,
} from "./constants";
import { userPickerValidations } from '../../../UILibrary/validation-module/formSubmitValiations';
import NotificationHelper from "../../../UILibrary/helpers/NotificationHelper";

const {
  FORM_TYPE_WITH_TABS,
  BUTTON_TITLE_SAVE,
  BUTTON_TITLE_REQUEST,
  ON_SAVE_MESSAGE,
  ON_SUBMIT_MESSAGE,
  FORM_SECTION_INCLUDE_NEW,
  FORM_SECTION_INCLUDE_COMPONENT,
  PICK_USER_TYPE_SIMPLE
} = constants;

const InitialProposalForm = (props) => {
  const formSubmit = (formData) => {
    console.log("formData", formData);
    const pickerErrors = userPickerValidations(dataset, ['FMA'], 'signatories', 'admin');
    if(pickerErrors.message) {
      return NotificationHelper.getInstance().error(pickerErrors.message);
    }
  };
  const [dataset, setDataset] = useState();

  useEffect(() => {
    setDataset(data);
  }, []);

  const handleChangeDataset = (changedDataset, cb) => {
    setDataset({ ...dataset, ...changedDataset });
  };

  const formTabs = [
    {
      type: FORM_SECTION_INCLUDE_NEW,
      tabKey: ASSETS_FORM_SECTION.KEY,
      tabName: ASSETS_FORM_SECTION.NAME,
      formFieldFunction: formFields,
    },
    {
      type: FORM_SECTION_INCLUDE_COMPONENT,
      tabKey: APPROVAL_FORM_SECTION.KEY,
      tabName: APPROVAL_FORM_SECTION.NAME,
      formSection: (
        <PickUsersContainer
          pickUserType={PICK_USER_TYPE_SIMPLE}
          iIconText={"Pick LGIM Directors"}
          title={"Pick LGIM Directors"}
          maxCount={2}
          handleChangeDataset={handleChangeDataset}
          dataset={dataset}
          subPathToGet={"userPool.signatories.IAA.admin"} // get data from dataset.userPool.signatories.IAA.admin
          subPathToSet={"signatories.IAA.admin"} // set data to dataset.signatories.IAA.admin
        />
      ),
    },
  ];

  return (
    <CreateFormComponent
      formTabs={formTabs}
      formName={FORM_NAME}
      formType={FORM_TYPE_WITH_TABS}
      disabled={false}
      action_inProgress={false}
      handleFormSubmit={formSubmit}
      options={{
        title: FORM_TITLE,
        titleIicon: REQUEST_A_FORMAL_PROPOSAL_FROM_US,
        saveButton: {
          title: BUTTON_TITLE_SAVE,
          showButton: true,
        },
        submitButton: {
          title: BUTTON_TITLE_REQUEST,
          showButton: true,
        },
        onSubmitMessage: ON_SUBMIT_MESSAGE,
        onSaveMessage: ON_SAVE_MESSAGE,
      }}
    />
  );
};

export default InitialProposalForm;
