import React, { Component } from 'react';
import { AutoComplete as AntAutoComplete, Icon, Input } from 'antd';

export default class AutoComplete extends Component {
    render() {
        let {
            input,
            meta: { touched, error },
            options,
            ...props
        } = this.props;
        let hasError = touched && error !== undefined;
        if (!options)
            options = {
                dataSource: []
            };

        let { dataSource, cb, defaultValue, ...rest } = options;

        return (
            <div className="field-wrapper autocomplete">
                <input type="text" {...input} {...props} hidden={true} />
                <AntAutoComplete
                    dataSource={dataSource}
                    {...rest}
                    defaultValue={defaultValue ? defaultValue : input.value}
                    value={input.value}
                    disabled={props.disabled}
                    onSelect={value => {
                        if (cb) cb(value);
                    }}
                    onChange={value => input.onChange(value)}
                    onBlur={e => {
                        input.onBlur(e);
                    }}
                    children={<input type="text" className="input-field  form-control" />}
                    filterOption={
                        options.filter
                            ? (iv, o) => o.props.children.toUpperCase().indexOf(iv.toUpperCase()) !== -1
                            : null
                    }
                >
                    <Input
                        prefix=""
                        suffix={
                            dataSource && dataSource.length ? (
                                <Icon type="caret-down" className="certain-category-icon" />
                            ) : null
                        }
                        title={props.disabled && props.title ? props.title : ''}
                        maxLength={200}
                        placeholder={
                            props.placeholder && options.dataSource && options.dataSource.length > 0
                                ? props.placeholder
                                : null
                        }
                    />
                </AntAutoComplete>
                {hasError && <span className="error">{error}</span>}
            </div>
        );
    }
}
