import React, { Component } from 'react';
import constants from '../../../constants';
import { Tooltip } from 'antd';

const { FORM_ACTION_TYPES } = constants;

export default class FormHeader extends Component {
    render() {
        const { title, iIconText, actions } = this.props;
        const buttonTemplates = {
            [FORM_ACTION_TYPES.SAVE]: {
                fa: 'fa fa-icon fa-save',
                btn: 'btn btn-outline btn-save'
            },
            [FORM_ACTION_TYPES.SAVE_PROFILE]: {
                fa: 'fa fa-icon fa-save',
                btn: 'tpip-btn-blue regular btn-submit'
            },
            [FORM_ACTION_TYPES.SUBMIT]: {
                fa: 'fa fa-icon',
                btn: 'tpip-btn-blue regular btn-submit'
            },
            [FORM_ACTION_TYPES.APPROVE]: {
                fa: 'fa fa-icon fa-check-circle',
                btn: 'btn-green regular btn-submit'
            },
            [FORM_ACTION_TYPES.REJECT]: {
                fa: 'fa fa-icon fa-times-circle',
                btn: 'btn-red regular btn-submit'
            },
            [FORM_ACTION_TYPES.ADD]: {
                fa: 'fa fa-icon fa-plus',
                btn: 'btn-green btn-add'
            },
            [FORM_ACTION_TYPES.DOWNLOAD]: {
                fa: 'fa fa-icon fa-download',
                btn: 'btn btn-outline btn-download'
            },
            [FORM_ACTION_TYPES.PUBLISH]: {
                btn: 'tpip-btn-blue regular btn-submit'
            },
            [FORM_ACTION_TYPES.UPDATE]: {
                btn: 'tpip-btn-blue regular btn-submit'
            },
            [FORM_ACTION_TYPES.CONTINUE]: {
                btn: 'tpip-btn-blue regular btn-submit'
            },
            [FORM_ACTION_TYPES.ACTIVATE]: {
                btn: 'tpip-btn-blue regular btn-submit'
            },
            [FORM_ACTION_TYPES.REQUEST]: {
                btn: 'tpip-btn-blue regular btn-submit'
            },
            [FORM_ACTION_TYPES.REQUESTIAA]: {
                btn: 'tpip-btn-blue regular btn-submit'
            },
            [FORM_ACTION_TYPES.ADD_GROUP]: {
                fa: 'fa fa-icon fa-plus',
                btn: 'btn-green btn-add'
            },
            [FORM_ACTION_TYPES.CREATE_GROUP]: {
                fa: 'fa fa-icon fa-plus',
                btn: 'btn-green btn-add'
            },
            [FORM_ACTION_TYPES.CREATE_USER]: {
                fa: 'fa fa-icon fa-plus',
                btn: 'btn-green btn-add'
            },
            [FORM_ACTION_TYPES.DELETE]: {
                btn: 'btn-red regular btn-submit'
            },
            [FORM_ACTION_TYPES.DELETE_ACCOUNT]: {
                btn: 'btn btn-red regular btn-delete-account'
            },
            [FORM_ACTION_TYPES.PORTFOLIO]: {
                btn: 'tpip-btn-blue regular'
            }
        };
        const FormAction = ({ action: { type, title, state, bool, ...rest } }) => {
            const { fa, btn } = buttonTemplates[type];
            const { inProgress } = state;
            return typeof bool === 'undefined' || bool === true ? (
                <button className={btn} {...rest}>
                    {fa ? (
                        <i className={`fa fa-icon ${inProgress ? 'fa-circle-o-notch fa-spin' : fa}`}></i>
                    ) : inProgress ? (
                        <i className="fa fa-icon fa-circle-o-notch fa-spin"></i>
                    ) : null}{' '}
                    {title ? title : type}
                </button>
            ) : null;
        };

        return (
            <div className="form-header">
                <h2 className="form-title">
                    {title}
                    {iIconText ? (
                        <Tooltip placement="top" title={iIconText}>
                            <span className="i-icon">
                                <i className="fa fa-info-circle"></i>
                            </span>
                        </Tooltip>
                    ) : null}
                </h2>

                <div className="form-action-wrapper">
                    {actions.map((action, key) =>
                        action.type === FORM_ACTION_TYPES.SAVE ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.SAVE_PROFILE ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.SUBMIT ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.ADD ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.APPROVE ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.REJECT ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.DOWNLOAD ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.PUBLISH ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.UPDATE ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.CONTINUE ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.ACTIVATE ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.REQUEST ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.REQUESTIAA ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.ADD_GROUP ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.CREATE_GROUP ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.CREATE_USER ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.DELETE ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.DELETE_ACCOUNT ? (
                            <FormAction action={action} key={key} />
                        ) : action.type === FORM_ACTION_TYPES.PORTFOLIO ? (
                            <FormAction action={action} key={key} />
                        ) : null
                    )}
                </div>
            </div>
        );
    }
}
