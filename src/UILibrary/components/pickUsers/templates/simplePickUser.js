import React from 'react';
import { List, Avatar, Tooltip } from 'antd';
import _ from 'lodash';

const SimplePickUsersContainer = props => {
    const {
        dataset = {},
        handleChangeDataset,
        disabled,
        maxCount,
        iIconText,
        subPathToGet,
        subPathToSet,
        title
    } = props;

    const handleChange = anchor => {
        let _dataset = _.cloneDeep(dataset);
        const selectedPool = _.get(_dataset, subPathToSet, []);

        const selectedUserIndex = selectedPool.findIndex(_u => _u.userId === anchor.userId);
        if (selectedUserIndex < 0) {
            if (maxCount && selectedPool && selectedPool.length === maxCount) return;
            selectedPool.push(anchor);
        } else selectedPool.splice(selectedUserIndex, 1);

        let subPathToSetArr = subPathToSet.split('.');
        subPathToSetArr = '[' + subPathToSetArr.join('][') + ']';
        _.setWith(_dataset, subPathToSetArr, selectedPool, Object);
        handleChangeDataset(_dataset);
    };

    const listUsers = (users, selectedList) => {
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
                                handleChange(user);
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
                        {title}
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

    let userPool = _.get(dataset, subPathToGet, []);
    let selectedUserPool = _.get(dataset, subPathToSet, []);

    return (
        <div className="users-for-approval-wrapper">
            {userPool.length ? listUsers(userPool, selectedUserPool) : null}
        </div>
    );
};

export default SimplePickUsersContainer;
