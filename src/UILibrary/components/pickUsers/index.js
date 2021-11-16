import React from 'react';

import SimplePickUsersContainer from './templates/simplePickUser';
import constants from '../../constants';

const { PICK_USER_TYPE_SIMPLE } = constants;

const PickUsersContainer = props => {
    const { pickUserType } = props;
    return (
        <>
            <div className="lgim-styles-wrapper">
                {pickUserType === PICK_USER_TYPE_SIMPLE ? <SimplePickUsersContainer {...props} /> : null}
            </div>
        </>
    );
};

export default PickUsersContainer;
