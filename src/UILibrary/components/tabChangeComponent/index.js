import React from 'react';

const TabChange = props => {
    const { children, activeTabKey, formTabs, onchangeTab } = props;

    const changeTabsFromFooter = add => {
        if (add) {
            onchangeTab(formTabs[formTabs.findIndex(t => t.tabKey === activeTabKey) + 1].tabKey);
        } else {
            onchangeTab(formTabs[formTabs.findIndex(t => t.tabKey === activeTabKey) - 1].tabKey);
        }
        window.scrollTo(0, 80);
    };

    return (
        <>
            {children}
            <div className="tab-move">
                <div className="btn-group">
                    {formTabs.findIndex(t => t.tabKey === activeTabKey) !== 0 && (
                        <button
                            className={
                                'btn-blue-o regular right ' +
                                (formTabs.findIndex(t => t.tabKey === activeTabKey) !== formTabs.length - 1
                                    ? 'border-less'
                                    : '')
                            }
                            onClick={e => {
                                e.preventDefault();
                                changeTabsFromFooter(false);
                            }}
                        >
                            <span className="icon">
                                <i className="fa fa-chevron-left"></i>
                            </span>
                            Previous
                        </button>
                    )}
                    {formTabs.findIndex(t => t.tabKey === activeTabKey) !== formTabs.length - 1 && (
                        <button
                            className={
                                'btn-blue-o regular left ' +
                                (formTabs.findIndex(t => t.tabKey === activeTabKey) !== 0 ? 'border-less' : '')
                            }
                            onClick={e => {
                                e.preventDefault();
                                changeTabsFromFooter(true);
                            }}
                        >
                            Next
                            <span className="icon">
                                <i className="fa fa-chevron-right"></i>
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default TabChange;
