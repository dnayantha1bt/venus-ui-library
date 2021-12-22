import moment from "moment";
import { required, numericality } from "redux-form-validators";
import constants from "../../../UILibrary/constants";
import { ASSETS_FORM_SECTION } from "./constants";

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER } = FORM_TEMPLATES;
const {
  DATE_PICKER,
  NUMBER_FIELD,
  BUTTON_GROUP,
  CURRENCY_FIELD,
  ASSETS_VALUE_SEPARATOR,
} = FORM_FIELDS;

const {
  ASSET_VALUE,
  ASSET_VAL_DATE,
  KNOW_TARGET_RETURN,
  TARGET_RETURN,
  KNOW_CURRENT_ASSET_ALLOCATION,
  CURRENT_ASSET_ALLOCATION_TYPE,
  KNOW_LIABILITY_HEDGE_RATIO,
  INTEREST_RATE_HEDGE_RATIO,
  INFLATION_HEDGE_RATIO,
  KNOW_TOTAL_AM_ICF,
  AM_AND_CF,
  HOLD_LESS_LIQUUD_ASSETS,
  FULLY_ESG_PORTFOLIO,
} = ASSETS_FORM_SECTION.FIELD_KEYS;

const yesNoOption = [
  { title: "Yes", value: "yes" },
  { title: "No", value: "no" },
];

const onYesKnowLiabilityHedgeRatio = (isBool, order, disabled) => [
  {
    type: FULL_CONTAINER,
    label: "Interest rate hedge ratio (as a % of assets)",
    bool: isBool,
    // bool: true,
    field: {
      __order: `${order}a`,
      name: INTEREST_RATE_HEDGE_RATIO,
      className: "form-control",
      component: NUMBER_FIELD,
      suffix: "%",
      options: {
        decimalScale: 0,
        placeholder: 0,
        allowNegative: false,
        min: 0,
        max: 100,
      },
    },
    validate: [required({ message: "Required" })],
  },
  {
    type: FULL_CONTAINER,
    label: "Inflation hedge ratio (as a % of assets)",
    bool: isBool,
    // bool: true,
    field: {
      __order: `${order}b`,
      name: INFLATION_HEDGE_RATIO,
      className: "form-control",
      component: NUMBER_FIELD,
      suffix: "%",
      options: {
        decimalScale: 0,
        placeholder: 0,
        allowNegative: false,
        min: 0,
        max: 100,
      },
      validate: [required({ message: "Required" })],
    },
  },
];

export const formFields = (props = {}) => {
  const { assets } = props;
  return [
    {
      type: FULL_CONTAINER,
      label: "Asset value",
      field: {
        __order: "a",
        name: ASSET_VALUE,
        component: CURRENCY_FIELD,
        options: {
          prefix: "£",
          props: {
            precision: 0,
            className: "form-control",
            placeholder: "10,000,000",
          },
        },
        title: (assets && assets[ASSET_VALUE]) || "",
        validate: [
          required({ message: "Required" }),
          numericality({ int: true, ">=": 1, message: "Invalid entry." }),
        ],
      },
    },
    {
      type: FULL_CONTAINER,
      bool: true,
      label: "Asset value date",
      field: {
        __order: "b",
        name: ASSET_VAL_DATE,
        className: "form-control",
        component: DATE_PICKER,
        options: {
          disabledDate: (current) =>
            current && current > moment().startOf("day"),
        },
        validate: [required({ message: "Required" })],
      },
    },
    {
      type: FULL_CONTAINER,
      bool: true,
      label: "Do you know your target investment return above gilts?",
      hide: ["reqamao", "appamao"].includes(props.step && props.step.stepKey),
      field: {
        __order: "c",
        name: KNOW_TARGET_RETURN,
        className: "form-control",
        component: BUTTON_GROUP,
        options: yesNoOption,
        validate: ["reqamao", "appamao"].includes(
          props.step && props.step.stepKey
        )
          ? []
          : [required({ message: "Required" })],
      },

      when: [
        {
          bool: assets && assets[KNOW_TARGET_RETURN] === "yes",
          childComponents: [
            {
              type: FULL_CONTAINER,
              iIcon:
                "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
              label: "Target return above gilts (net of fees)",
              bool: assets && assets[KNOW_TARGET_RETURN] === "yes",
              field: {
                __order: "d",
                name: TARGET_RETURN,
                className: "form-control",
                component: NUMBER_FIELD,
                suffix: "%",
                options: {
                  decimalScale: 3,
                  placeholder: "-1.000 - 5.000",
                  allowNegative: true,
                  min: -1,
                  max: 5.0,
                },
                validate: [
                  required({ message: "Required" }),
                  numericality({
                    int: false,
                    ">=": -1,
                    "<=": 5.0,
                    message: "Invalid entry.",
                  }),
                ],
              },
            },
            {
              type: FULL_CONTAINER,
              bool: assets && assets[KNOW_TARGET_RETURN] === "yes",
              label: "Do you know your current asset allocation?",
              field: {
                __order: "e",
                name: KNOW_CURRENT_ASSET_ALLOCATION,
                className: "form-control",
                component: BUTTON_GROUP,
                options: yesNoOption,
              },
              validate: [required({ message: "Required" })],
              ...((assets && assets[KNOW_CURRENT_ASSET_ALLOCATION] === "yes") ||
              (assets && assets[KNOW_TARGET_RETURN] !== "no")
                ? {
                    when: [
                      {
                        bool:
                          assets &&
                          assets[KNOW_CURRENT_ASSET_ALLOCATION] === "yes",
                        childComponents: [
                          {
                            type: FULL_CONTAINER,
                            bool:
                              assets &&
                              assets[KNOW_CURRENT_ASSET_ALLOCATION] === "yes",
                            label:
                              "How do you want to enter your current asset allocation?",
                            field: {
                              __order: "f",
                              name: CURRENT_ASSET_ALLOCATION_TYPE,
                              className: "form-control",
                              component: BUTTON_GROUP,
                              options: [
                                { title: "Simple", value: "simple" },
                                { title: "Detail", value: "detail" },
                              ],
                              validate: [required({ message: "Required" })],
                            },

                            when: [
                              {
                                bool:
                                  assets &&
                                  assets[CURRENT_ASSET_ALLOCATION_TYPE] ===
                                    "simple",
                                childComponents: [
                                  {
                                    type: FULL_VIEW_CONTAINER,
                                    bool: true,
                                    field: {
                                      __order: "a",
                                      name: "assets",
                                      className: "form-control",
                                      component: ASSETS_VALUE_SEPARATOR,
                                      options: {
                                        tabKey: ASSETS_FORM_SECTION.KEY,
                                        formName: props.formName,
                                        asyncFormData: assets && assets,
                                        currentAssetAT: "simple",
                                      },
                                    },
                                  },
                                ],
                              },
                              {
                                bool:
                                  assets &&
                                  assets[CURRENT_ASSET_ALLOCATION_TYPE] ===
                                    "detail",
                                //   bool: true,
                                childComponents: [
                                  {
                                    type: FULL_VIEW_CONTAINER,
                                    bool: true,
                                    field: {
                                      __order: "a",
                                      name: "assets",
                                      className: "form-control",
                                      component: ASSETS_VALUE_SEPARATOR,
                                      options: {
                                        tabKey: ASSETS_FORM_SECTION.KEY,
                                        formName: props.formName,
                                        asyncFormData: assets && assets,
                                        currentAssetAT: "detail",
                                      },
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: FULL_CONTAINER,
                            label: "Do you know your liability hedge ratio?",
                            bool: true,
                            field: {
                              __order: "g",
                              name: KNOW_LIABILITY_HEDGE_RATIO,
                              className: "form-control",
                              component: BUTTON_GROUP,
                              options: yesNoOption,
                              validate: [required({ message: "Required" })],
                            },

                            when: [
                              {
                                bool:
                                  assets &&
                                  assets[KNOW_LIABILITY_HEDGE_RATIO] === "yes",
                                childComponents: onYesKnowLiabilityHedgeRatio(
                                  assets &&
                                    assets[KNOW_LIABILITY_HEDGE_RATIO] ===
                                      "yes",
                                  "g"
                                ),
                              },
                            ],
                          },
                          {
                            type: FULL_CONTAINER,
                            bool: true,
                            label:
                              "Do you know the impact of your current asset management and investment consulting fees?",
                            field: {
                              __order: "h",
                              name: KNOW_TOTAL_AM_ICF,
                              className: "form-control",
                              component: BUTTON_GROUP,
                              options: yesNoOption,
                              validate: [required({ message: "Required" })],
                            },

                            when: [
                              {
                                bool: true,
                                childComponents: [
                                  {
                                    type: FULL_CONTAINER,
                                    //label: 'Asset management & consulting fees (as a % of assets)',
                                    iIcon:
                                      "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                                    label:
                                      "Asset management and investment advisory fees (as a % of assets)",
                                    // bool: props[KNOW_TOTAL_AM_ICF] === 'yes',
                                    bool: true,
                                    field: {
                                      __order: "i",
                                      name: AM_AND_CF,
                                      className: "form-control",
                                      component: NUMBER_FIELD,
                                      suffix: "%",
                                      options: {
                                        decimalScale: 2,
                                        placeholder: "0.00 - 5.00",
                                        min: 0,
                                        max: 5.0,
                                        allowNegative: false,
                                      },
                                      validate: [
                                        required({ message: "Required" }),
                                        numericality({
                                          int: false,
                                          ">=": 0.0,
                                          "<=": 5.0,
                                          message: "Invalid entry.",
                                        }),
                                      ],
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  }
                : {}),
            },
          ],
        },
        ...((assets && assets[KNOW_TARGET_RETURN] === "no") ||
        (assets && assets[KNOW_CURRENT_ASSET_ALLOCATION] !== "yes")
          ? [
              {
                bool: assets && assets[KNOW_TARGET_RETURN] === "no",
                //   bool: true,
                childComponents: [
                  {
                    type: FULL_CONTAINER,
                    label:
                      "How do you want to enter your current asset allocation?",
                    // bool: props[KNOW_TARGET_RETURN] === 'no',
                    bool: true,
                    field: {
                      __order: "j",
                      name: CURRENT_ASSET_ALLOCATION_TYPE,
                      className: "form-control",
                      component: BUTTON_GROUP,
                      options: [
                        { title: "Simple", value: "simple" },
                        { title: "Detail", value: "detail" },
                      ],
                      validate: [required({ message: "Required" })],
                    },

                    when: [
                      {
                        bool:
                          assets &&
                          assets[CURRENT_ASSET_ALLOCATION_TYPE] === "simple",
                        //   bool: true,
                        childComponents: [
                          {
                            type: FULL_VIEW_CONTAINER,
                            bool: true,
                            field: {
                              __order: "a",
                              name: "assets",
                              className: "form-control",
                              component: ASSETS_VALUE_SEPARATOR,
                              options: {
                                tabKey: ASSETS_FORM_SECTION.KEY,
                                formName: props.formName,
                                asyncFormData: assets && assets,
                                currentAssetAT: "simple",
                              },
                            },
                          },
                        ],
                      },
                      {
                        bool:
                          assets &&
                          assets[CURRENT_ASSET_ALLOCATION_TYPE] === "detail",
                        //   bool: true,
                        childComponents: [
                          {
                            type: FULL_VIEW_CONTAINER,
                            bool: true,
                            field: {
                              __order: "a",
                              name: "assets",
                              className: "form-control",
                              component: ASSETS_VALUE_SEPARATOR,
                              options: {
                                tabKey: ASSETS_FORM_SECTION.KEY,
                                formName: props.formName,
                                asyncFormData: assets && assets,
                                currentAssetAT: "detail",
                              },
                            },
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: FULL_CONTAINER,
                    bool: assets && assets[KNOW_TARGET_RETURN] === "no",
                    label: "Do you know your liability hedge ratio?",
                    field: {
                      __order: "k",
                      name: KNOW_LIABILITY_HEDGE_RATIO,
                      className: "form-control",
                      component: BUTTON_GROUP,
                      options: yesNoOption,
                      validate: [required({ message: "Required" })],
                    },

                    when: [
                      {
                        bool:
                          assets &&
                          assets[KNOW_LIABILITY_HEDGE_RATIO] === "yes",
                        childComponents: onYesKnowLiabilityHedgeRatio(
                          assets &&
                            assets[KNOW_LIABILITY_HEDGE_RATIO] === "yes",
                          "k"
                        ),
                      },
                    ],
                  },
                  {
                    type: FULL_CONTAINER,
                    // label:
                    //   'Do you know what your total asset management and investment consulting fees are?',
                    bool: true,
                    label:
                      "Do you know the impact of your current asset management and investment consulting fees?",
                    field: {
                      __order: "l",
                      name: KNOW_TOTAL_AM_ICF,
                      className: "form-control",
                      component: BUTTON_GROUP,
                      options: yesNoOption,
                      validate: [required({ message: "Required" })],
                    },

                    when: [
                      {
                        bool: assets && assets[KNOW_TOTAL_AM_ICF] === "yes",
                        childComponents: [
                          {
                            type: FULL_CONTAINER,
                            //label: 'Asset management & consulting fees (as a % of assets)',
                            iIcon:
                              "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                            label:
                              "Asset management and investment advisory fees (as a % of assets)",
                            bool: assets && assets[KNOW_TOTAL_AM_ICF] === "yes",
                            field: {
                              __order: "m",
                              name: AM_AND_CF,
                              className: "form-control",
                              component: NUMBER_FIELD,
                              suffix: "%",
                              options: {
                                decimalScale: 2,
                                placeholder: "0.00 - 5.00",
                                min: 0,
                                max: 5.0,
                                allowNegative: false,
                              },
                              validate: [
                                required({ message: "Required" }),
                                numericality({
                                  int: false,
                                  ">=": 0.0,
                                  "<=": 5.0,
                                  message: "Invalid entry.",
                                }),
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ]
          : []),
      ],
    },
    {
      type: FULL_CONTAINER,
      label:
        "Do you want to avoid holding less liquid assets, such as property?",
      field: {
        __order: "n",
        name: HOLD_LESS_LIQUUD_ASSETS,
        className: "form-control",
        component: BUTTON_GROUP,
        options: yesNoOption,
        validate: [required({ message: "Required" })],
      },
    },
    {
      type: FULL_CONTAINER,
      label:
        "Do you want to fully integrate Environmental, Social and Governance (ESG) themes within your portfolio allocation?",

      field: {
        __order: "o",
        name: FULLY_ESG_PORTFOLIO,
        className: "form-control",
        component: BUTTON_GROUP,
        options: yesNoOption,
        validate: [required({ message: "Required" })],
      },
    },
  ];
};
