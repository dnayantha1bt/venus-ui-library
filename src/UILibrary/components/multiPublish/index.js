import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, getFormInitialValues } from 'redux-form';
import { Checkbox, Row } from 'antd';
import { PublishCheckbox } from '../forms/fieldContainers';

const MultiPublishContainer = props => {
    const { rows, formName } = props;
    const formValues = useSelector(getFormInitialValues(formName));
    const dispatch = useDispatch();

    const [selectAll, setSelectAll] = useState(false);

    const visibleRows = rows.filter(r => !r.hidden);

    useEffect(() => {
        if (!formValues) return;
        //all of the items are selected at init
        const allCheckedAtInit = visibleRows.every(row => formValues[row.name]);
        if (allCheckedAtInit) setSelectAll(true);
    }, [formValues]);

    const onSelectAllChange = isChecked => {
        setSelectAll(isChecked);
        //if (!isChecked) return;
        // console.log('selecting all checkboxes');
        let fieldsWhichAreEnabled = rows.filter(row => !row.props.disabled);
        fieldsWhichAreEnabled.forEach(row => {
            dispatch(change(formName, row.name, isChecked));
        });
    };

    const onDependentValueChange = isChecked => {
        if (!isChecked) setSelectAll(false);
    };

    const checkIfAllDisabled = () => {
        return !rows.some(row => !row.props.disabled);
    };

    return (
        <>
            <Row className="input-row checkbox-row">
                <Checkbox
                    onChange={e => onSelectAllChange(e.target.checked)}
                    checked={selectAll}
                    disabled={checkIfAllDisabled()}
                >
                    <span className="label-wrapper">
                        <span className="ml-1 input-title">Select all</span>
                    </span>
                </Checkbox>
            </Row>
            {visibleRows.map(row => (
                <PublishCheckbox {...row} onChange={onDependentValueChange} />
            ))}
        </>
    );
};

export default MultiPublishContainer;
