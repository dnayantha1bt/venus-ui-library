import React from 'react';
import { List, Avatar, Tooltip } from 'antd';
import constants from '../../../constants';
import _ from 'lodash';

const { APPROVERS_SELECTION, SIGNATORIES_SELECTION } = constants;

const SimplePickUsersContainer = props => {
    const {
        dataset = {},
        handleChangeDataset,
        pickupType = APPROVERS_SELECTION,
        disabled,
        maxCount,
        pickUserTitle,
        iIconText,
        userType,
        document
    } = props;

    const datasetKey =
        pickupType === APPROVERS_SELECTION
            ? 'approvers'
            : pickupType === SIGNATORIES_SELECTION
            ? 'signatories'
            : 'selectedUsers';

    const handleChange = (type, anchor) => {
        const typeKey = type === 'LGIM' ? 'admin' : type === 'clientTeam' ? type : type.toLowerCase();
        const selectedPool = _.get(dataset, `${datasetKey}.${document}.${typeKey}`, []);

        const selectedUserIndex = selectedPool.findIndex(_u => _u.userId === anchor.userId);
        if (selectedUserIndex < 0) {
            if (maxCount && selectedPool && selectedPool.length === maxCount) return;
            selectedPool.push(anchor);
        } else selectedPool.splice(selectedUserIndex, 1);

        dataset[datasetKey] = dataset[datasetKey] || {};
        dataset[datasetKey][document] = dataset[datasetKey][document] || {};
        dataset[datasetKey][document][typeKey] = selectedPool;
        handleChangeDataset(dataset);
    };

    const listUsers = (type, users, selectedList) => {
        users.forEach(u => {
            const isSelectedUser = selectedList.find(_u => _u.userId === u.userId);
            if (isSelectedUser) u.isSelected = true;
            else u.isSelected = false;
        });

        const selectedUsers = users.filter(u => u.isSelected).length;

        const usersMap = user => {
            //should revisit this, user has a deault image, if user has default image then he has not uploaded an image
            let profileImageAvaliable = user.imageUrl && user.imageUrl.indexOf('/profile.png') < 0 ? true : false;

            return (
                <List.Item className="list">
                    <List.Item.Meta
                        // avatar={<img src={userImg} className="img-fluid image" alt="user-img" icon="user" />}
                        // avatar={
                        //   <Avatar size={42} style={{ backgroundColor: '#1899cc' }}>
                        //     {user.firstName.charAt(0).toUpperCase()}
                        //   </Avatar>
                        // }
                        avatar={
                            <Avatar
                                size={42}
                                style={{ backgroundColor: '#1899cc' }}
                                src={profileImageAvaliable ? user.imageUrl : null}
                            >
                                {user.firstName.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        title={`${user.firstName} ${user.lastName}`}
                    />
                    <div>
                        <button
                            type="button"
                            disabled={
                                disabled || (maxCount && selectedUsers && selectedUsers === maxCount) ? disabled : null
                            }
                            className={`btn-approval btn-${user.isSelected}`}
                            onClick={() => {
                                handleChange(type, user);
                            }}
                        >
                            {user.isSelected ? 'Deselect' : 'Select'}
                        </button>
                    </div>
                </List.Item>
            );
        };

        return (
            <>
                <div className="inner-header clearfix">
                    <label className="title">
                        {/* Select {type} users for {pickupType === APPROVERS_SELECTION ? 'approval' : 'execution'} */}
                        {pickupType === APPROVERS_SELECTION
                            ? `Select ${type} users for approval`
                            : pickUserTitle
                            ? pickUserTitle
                            : 'Select signatories'}
                        {iIconText ? (
                            <Tooltip placement="top" title={iIconText}>
                                <span className="i-icon">
                                    <i className="fa fa-info-circle"></i>
                                </span>
                            </Tooltip>
                        ) : null}
                    </label>
                    {/* <label className="selected-users">
            {selectedUsers ? selectedUsers : 0} {type} {selectedUsers === 1 ? 'user' : 'users'}{' '}
            selected
          </label> */}
                    <label className="selected-users">{selectedUsers ? selectedUsers : 0} selected</label>
                </div>
                <div className="content-holder clearfix">
                    <List
                        className="approval-list-items"
                        itemLayout="horizontal"
                        dataSource={users}
                        renderItem={usersMap}
                    />
                </div>
            </>
        );
    };

    let lgimPool = _.get(dataset, `userPool.${datasetKey}.${document}.admin`, []);
    let clientPool = _.get(dataset, `userPool.${datasetKey}.${document}.client`, []);
    let clientTeamPool = _.get(dataset, `userPool.${datasetKey}.${document}.clientTeam`, []);

    let lgimSelectors = _.get(dataset, `${datasetKey}.${document}.admin`, []);
    let clientSelectors = _.get(dataset, `${datasetKey}.${document}.client`, []);
    let clientTeamSelectors = _.get(dataset, `${datasetKey}.${document}.clientTeam`, []);

    return (
        <div className="users-for-approval-wrapper">
            {lgimPool.length
                ? !['client', 'clientTeam'].includes(userType)
                    ? listUsers('LGIM', lgimPool, lgimSelectors)
                    : null
                : null}
            {clientPool.length
                ? !['admin', 'clientTeam'].includes(userType)
                    ? listUsers('client', clientPool, clientSelectors)
                    : null
                : null}
            {clientTeamPool.length
                ? !['client', 'admin'].includes(userType)
                    ? listUsers('clientTeam', clientTeamPool, clientTeamSelectors)
                    : null
                : null}
        </div>
    );
};

export default SimplePickUsersContainer;
