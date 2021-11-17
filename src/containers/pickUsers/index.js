import React, { useEffect, useState } from 'react';
import PickUsersComponent from '../../UILibrary/components/pickUsers';
import data from './dataset.json';

const PickUsers = () => {
    const [dataset, setDataset] = useState();

    useEffect(() => {
        setDataset(data);
    }, []);

    const handleChangeDataset = (changedDataset, cb) => {
        setDataset({ ...dataset, ...changedDataset });
    };

    return (
        <div className="lgim-styles-wrapper">
            <PickUsersComponent
                iIconText={'Pick LGIM Directors'}
                title={'Pick LGIM Directors'}
                maxCount={2}
                handleChangeDataset={handleChangeDataset}
                dataset={dataset}
                subPathToGet={'userPool.signatories.IAA.admin'} // get data from dataset.userPool.signatories.IAA.admin
                subPathToSet={'signatories.IAA.admin'}  // set data to dataset.signatories.IAA.admin
            />
        </div>
    );
};

export default PickUsers;
