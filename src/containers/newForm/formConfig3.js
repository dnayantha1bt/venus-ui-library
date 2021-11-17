import moment from "moment";
import { required, numericality } from "redux-form-validators";
import constants from "../../UILibrary/constants";
import {
  ASSETS_FORM_SECTION,
  FUNDING_FORM_SECTION,
  THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS,
  THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL,
} from "./constants";

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { DIV, LABEL, ROW, COL, FIELD, FULL_CONTAINER, FULL_VIEW_CONTAINER } =
  FORM_TEMPLATES;
const {
  SELECT_OPTION,
  BUTTON_GROUP,
  DATE_PICKER,
  CURRENCY_FIELD,
  FILE_UPLOADER,
  FILE_DOWNLOADER,
  DEFICIT_CONTRIBUTION_SECTION,
} = FORM_FIELDS;
const { PROPOSAL_NAME } = ASSETS_FORM_SECTION.FIELD_KEYS;
const {
  LIKE_TO_SEE_PROJECTION_OYFP,
  WANT_US_TO_MODEL_DC,
  WANT_US_TO_UPLOAD_DCES,
  DEFICIT_CONTRIBUTION_VALUE,
  DEFICIT_CONTRIBUTION_DATE,
  DCFS_ATTACHMENT,
  SCHEME_OPEN_TO_FUTURE_ACCRUAL,
  CURRENT_ANNUAL_CA,
  COMBINED_COMPANY_MC_RA,
  HAVE_TARGET_BUYOUT_VALUE,
  TARGET_BUYOUT_VALUE,
  DATE_VALUE_PROVIDED,
  LIKE_TO_INCLUDE_FLT,
} = FUNDING_FORM_SECTION.FIELD_KEYS;
const yesNoOption = [
  { title: "Yes", value: "yes" },
  { title: "No", value: "no" },
];
const deficitContribution = (schemeId, proposalName, key, timeStamp) =>
  `uploads/scheme`;

export const formFields3 = (
  props,
  dcCount = 0,
  updateDCCount,
  removeFromDCMap
) => {
  const { funding } = props;
  const dcMap = [];
  const fundingData = props.fundingData ? props.fundingData : null;

  for (let i = 0; i < dcCount; i++) {
    dcMap.push({
      type: ROW,
      props: { className: "input-row", gutter: 20 },
      removeBubble: {
        actions: {
          onClick: () => {
            removeFromDCMap(i);
          },
        },
        bool: i !== 0,
      },
      childComponents: [
        {
          type: COL,
          props: { xl: 12, lg: 12, xs: 24 },
          childComponents: [
            {
              type: ROW,
              props: { className: "input-row" },
              childComponents: [
                {
                  type: COL,
                  props: { className: "label-wrapper", xl: 12, xs: 24 },
                  childComponents: [
                    {
                      type: LABEL,
                      props: { className: "input-title" },
                      value: "Deficit Contribution",
                    },
                  ],
                },

                {
                  type: COL,
                  props: { className: "input-wrapper", xl: 12, xs: 24 },
                  childComponents: [
                    {
                      type: FIELD,
                      label: `Deficit Contribution - ${i + 1}`,
                      field: {
                        __order: `d.${i}`,
                        label: "Deficit Contribution",
                        name: `${DEFICIT_CONTRIBUTION_VALUE}_${i}`,
                        validate: [
                          required({ message: "Required" }),
                          numericality({
                            int: true,
                            ">=": 1,
                            message: "Invalid entry.",
                          }),
                        ],
                      },
                      props: {
                        name: `${DEFICIT_CONTRIBUTION_VALUE}_${i}`,
                        component: CURRENCY_FIELD,
                        options: {
                          prefix: "£",
                          props: {
                            precision: 0,
                            className: "form-control",
                            placeholder: "10,000,000",
                          },
                        },
                        title:
                          fundingData &&
                          fundingData[`${DEFICIT_CONTRIBUTION_VALUE}_${i}`]
                            ? fundingData[`${DEFICIT_CONTRIBUTION_VALUE}_${i}`]
                            : "",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: COL,
          props: { className: "label-wrapper", xl: 12, lg: 12, xs: 24 },
          childComponents: [
            {
              type: ROW,
              props: { className: "input-row" },
              childComponents: [
                {
                  type: COL,
                  props: { className: "label-wrapper", xl: 10, xs: 24 },
                  childComponents: [
                    {
                      type: LABEL,
                      props: { className: "input-title" },
                      // value: 'Deficit Contribution Date'
                      value: "Payment Date",
                    },
                  ],
                },
                {
                  type: COL,
                  props: {
                    className: "input-wrapper custom-funding-wrapper",
                    xl: 10,
                    xs: 24,
                  },
                  childComponents: [
                    {
                      type: FIELD,
                      // label: `Deficit Contribution Date - ${i + 1}`,
                      label: `Payment Date - ${i + 1}`,
                      field: {
                        __order: `d.${i}`,
                        // label: 'Deficit Contribution Date',
                        label: "Payment Date",
                        name: `${DEFICIT_CONTRIBUTION_DATE}_${i}`,
                        validate: [required({ message: "Required" })],
                      },
                      props: {
                        name: `${DEFICIT_CONTRIBUTION_DATE}_${i}`,
                        className: "form-control",
                        component: DATE_PICKER, //-After-today
                        options: {
                          disabledDate: (current) =>
                            current && current < moment().startOf("day"),
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  return [
    {
      type: FULL_CONTAINER,
      label: "Would you like to see a projection of your funding position?",
      bool: true,
      field: {
        __order: "a",
        name: LIKE_TO_SEE_PROJECTION_OYFP,
        className: "form-control",
        component: BUTTON_GROUP,
        options: yesNoOption,
        validate: [required({ message: "Required" })],
      },

      when: [
        {
          bool: funding && funding[LIKE_TO_SEE_PROJECTION_OYFP] === "yes",
          // bool : true,
          childComponents: [
            {
              type: FULL_CONTAINER,
              label: "Do you want us to model any deficit contributions?",
              bool: funding && funding[LIKE_TO_SEE_PROJECTION_OYFP] === "yes",
              // bool : true,
              field: {
                __order: "b",
                name: WANT_US_TO_MODEL_DC,
                className: "form-control",
                component: BUTTON_GROUP,
                options: yesNoOption,
                validate: [required({ message: "Required" })],
              },

              when: [
                {
                  bool: funding && funding[WANT_US_TO_MODEL_DC] === "yes",
                  // bool : true,
                  childComponents: [
                    {
                      type: FULL_CONTAINER,
                      label:
                        "Do you want to upload a file of deficit contributions or enter them on screen?",
                      iIcon:
                        "Please select to enter information 'On Screen' or 'Upload File'. Then proceed accordingly.",
                      bool: funding && funding[WANT_US_TO_MODEL_DC] === "yes",
                      field: [
                        {
                          __order: "c",
                          name: WANT_US_TO_UPLOAD_DCES,
                          label:
                            "Do you want to upload file of deficit contributions or enter on screen?",
                          className: "form-control",
                          component: SELECT_OPTION, //BUTTON_GROUP,
                          // options: UploadOptions
                          options: {
                            defaultValue: "Select",
                            dataList: [
                              { value: "Upload File", key: "uploadFile" },
                              { value: "On Screen", key: "onScreen" },
                            ],
                          },
                          validate: [required({ message: "Required" })],
                        },
                        {
                          name: `download_${DCFS_ATTACHMENT}`,
                          component: FILE_DOWNLOADER,
                          editable:
                            props[WANT_US_TO_UPLOAD_DCES] === "uploadFile",
                          url: "deficitContribution",
                          fileName: "deficit-contributions.xlsx",
                        },
                      ],
                      when: [
                        {
                          bool:
                            funding &&
                            funding[WANT_US_TO_UPLOAD_DCES] === "uploadFile",
                          // bool: props[WANT_US_TO_UPLOAD_DCES] === 'yes',
                          childComponents: [
                            {
                              __order: "d",
                              type: FULL_CONTAINER,
                              label: "Upload deficit contribution file",
                              bool:
                                funding &&
                                funding[WANT_US_TO_UPLOAD_DCES] ===
                                  "uploadFile",
                              // bool : true,
                              iIcon:
                                "Download the template file above, complete the required data and save as a csv file. Then upload the csv file.",
                              field: {
                                name: DCFS_ATTACHMENT,
                                className: "form-control",
                                component: FILE_UPLOADER,
                                options: {
                                  accept: [".xlsx"],
                                  manual: true,
                                  block:
                                    props.screen === "reqip" &&
                                    !props[PROPOSAL_NAME],
                                  url: (e) => deficitContribution(e),
                                  params: [
                                    props.schemeId,
                                    props[PROPOSAL_NAME],
                                  ],
                                },
                                validate: [required({ message: "Required" })],
                              },
                            },
                          ],
                        },
                        {
                          bool:
                            funding &&
                            funding[WANT_US_TO_UPLOAD_DCES] === "onScreen",
                          // bool: props[WANT_US_TO_UPLOAD_DCES] === 'no',
                          childComponents: [
                            {
                              type: ROW,
                              props: { className: "input-row" },
                              bool:
                                funding &&
                                funding[WANT_US_TO_UPLOAD_DCES] === "onScreen",
                              // bool : true,
                              childComponents: [
                                {
                                  type: DIV,
                                  props: { className: "label-wrapper" },
                                  bool:
                                    funding &&
                                    funding[WANT_US_TO_UPLOAD_DCES] ===
                                      "onScreen",
                                  // bool : true,
                                  childComponents: [
                                    {
                                      type: LABEL,
                                      bool:
                                        funding &&
                                        funding[WANT_US_TO_UPLOAD_DCES] ===
                                          "onScreen",
                                      // bool : true,
                                      value:
                                        // 'Add upto 20 sets of value and date of deficit contribution',
                                        "Add up to 20 deficit contributions and associated payment dates:",
                                      props: {
                                        className:
                                          "input-title funding-deficit-title",
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              type: ROW,
                              props: { className: "input-row" },
                              bool: true,
                              childComponents: [
                                {
                                  type: FULL_VIEW_CONTAINER,

                                  bool: true,
                                  field: {
                                    __order: "a",
                                    name: "deficit",
                                    className: "form-control",
                                    component: DEFICIT_CONTRIBUTION_SECTION,
                                    options: {
                                      formName: "dirtyFormValues.formName",
                                      formData:
                                        "dirtyFormValues.simpleFormData",
                                      disabled: false,
                                    },
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: FULL_CONTAINER,
              // label: 'Is the scheme open to future accrual?',
              iIcon: THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS,
              label: "Is the scheme open to future accrual of new benefits?",
              bool: funding && funding[LIKE_TO_SEE_PROJECTION_OYFP] === "yes",
              // bool : true,
              field: {
                __order: "e",
                name: SCHEME_OPEN_TO_FUTURE_ACCRUAL,
                className: "form-control",
                component: BUTTON_GROUP,
                options: yesNoOption,
                validate: [required({ message: "Required" })],
              },

              when: [
                {
                  bool:
                    funding && funding[SCHEME_OPEN_TO_FUTURE_ACCRUAL] === "yes",
                  // bool : true,
                  childComponents: [
                    {
                      type: FULL_CONTAINER,
                      // label: 'What is the current annual cost of accrual?',
                      iIcon: THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL,
                      label:
                        "What is the current annual cost of new benefit accrual?",
                      bool:
                        funding &&
                        funding[SCHEME_OPEN_TO_FUTURE_ACCRUAL] === "yes",
                      // bool : true,
                      field: {
                        __order: "f",
                        name: CURRENT_ANNUAL_CA,
                        component: CURRENCY_FIELD,
                        options: {
                          prefix: "£",
                          props: {
                            precision: 0,
                            className: "form-control",
                            placeholder: "10,000,000",
                          },
                        },
                        title: props[CURRENT_ANNUAL_CA] || "",
                        validate: [
                          required({ message: "Required" }),
                          numericality({
                            int: true,
                            ">=": 1,
                            message: "Invalid entry.",
                          }),
                        ],
                      },
                    },
                    {
                      type: FULL_CONTAINER,
                      bool:
                        funding &&
                        funding[SCHEME_OPEN_TO_FUTURE_ACCRUAL] === "yes",
                      // bool : true,
                      // label:
                      //   'What are the combined company and member contributions in respect of accrual?',
                      label:
                        "What are the combined sponsor and member contributions in respect of future accrual of new benefits?",
                      field: {
                        __order: "g",
                        name: COMBINED_COMPANY_MC_RA,
                        component: CURRENCY_FIELD,
                        options: {
                          prefix: "£",
                          props: {
                            precision: 0,
                            className: "form-control",
                            placeholder: "10,000,000",
                          },
                        },
                        title: props[COMBINED_COMPANY_MC_RA] || "",
                        validate: [
                          required({ message: "Required" }),
                          numericality({
                            int: true,
                            ">=": 1,
                            message: "Invalid entry.",
                          }),
                        ],
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: FULL_CONTAINER,
              //label: 'Do you have a target buyout value?',
              label: "Do you have a target buy-out price?",
              bool: funding && funding[LIKE_TO_SEE_PROJECTION_OYFP] === "yes",
              // bool : true,
              field: {
                __order: "h",
                name: HAVE_TARGET_BUYOUT_VALUE,
                className: "form-control",
                component: BUTTON_GROUP,
                options: yesNoOption,
                validate: [required({ message: "Required" })],
              },

              when: [
                {
                  bool: funding && funding[HAVE_TARGET_BUYOUT_VALUE] === "yes",
                  // bool : true,
                  childComponents: [
                    {
                      type: FULL_CONTAINER,
                      // label: 'Target buy-out liability value',
                      bool:
                        funding && funding[HAVE_TARGET_BUYOUT_VALUE] === "yes",
                      // bool : true,
                      label: "Target buy-out price",
                      field: {
                        __order: "i",
                        name: TARGET_BUYOUT_VALUE,
                        className: "form-control",
                        component: CURRENCY_FIELD,
                        options: {
                          prefix: "£",
                          props: {
                            precision: 0,
                            className: "form-control",
                            placeholder: "10,000,000",
                          },
                        },
                        title: props[TARGET_BUYOUT_VALUE] || "",
                        validate: [
                          required({ message: "Required" }),
                          numericality({
                            int: true,
                            ">=": 1,
                            message:
                              "Invalid entry. Value must be greater than £1.",
                          }),
                        ],
                      },
                    },
                    {
                      type: FULL_CONTAINER,
                      // label: 'At what date has this value been provided?',
                      label:
                        "At what date has the buy-out price been provided?",
                      bool:
                        funding && funding[HAVE_TARGET_BUYOUT_VALUE] === "yes",
                      // bool : true,
                      field: {
                        __order: "j",
                        name: DATE_VALUE_PROVIDED,
                        className: "form-control",
                        component: DATE_PICKER, //-Before-today
                        options: {
                          disabledDate: (current) =>
                            current && current > moment().startOf("day"),
                        },
                        validate: [required({ message: "Required" })],
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: FULL_CONTAINER,
              label: "Would you like to include funding level triggers?",
              bool: funding && funding[LIKE_TO_SEE_PROJECTION_OYFP] === "yes",
              // bool : true,
              field: {
                __order: "k",
                name: LIKE_TO_INCLUDE_FLT,
                className: "form-control",
                component: BUTTON_GROUP,
                options: yesNoOption,
                validate: [required({ message: "Required" })],
              },
            },
          ],
        },
      ],
    },
  ];
};
