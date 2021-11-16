import React, { useState } from 'react';
import PickUsersComponent from '../../UILibrary/components/pickUsers';
import constants from '../../UILibrary/constants';
import data from './dataset.json';

const { PICK_USER_TYPE_SIMPLE, SIGNATORIES_SELECTION } = constants;

const PickUsers = () => {
    const [dataset, setDataset] = useState(data);

    const handleChangeDataset = (changedDataset, cb) => {
        setDataset({ ...dataset, ...changedDataset });
    };

    return (
        <div className="lgim-styles-wrapper">
            <PickUsersComponent
                pickUserType={PICK_USER_TYPE_SIMPLE}
                iIconText={'Pick LGIM Directors'}
                userType={'admin'}
                maxCount={2}
                dataset={dataset}
                pickupType={SIGNATORIES_SELECTION}
                document={'IAA'}
                handleChangeDataset={handleChangeDataset}
            />
        </div>
    );
};

export default PickUsers;
