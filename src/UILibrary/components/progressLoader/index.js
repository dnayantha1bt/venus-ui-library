import React, { Component } from 'react';
import { Progress } from 'antd';

class CustomLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percentage: 0,
            time: this.props.timeDuration
        };
    }

    componentDidMount() {
        const { timeDuration } = this.props;
        if (timeDuration) this.setPercentage(timeDuration);
    }

    setPercentage(timeDuration) {
        const { percentage, time } = this.state;
        const OneSecondIncrementPercentage = this.getOneSecondIncrementPercentage(timeDuration);

        if (time !== 0) {
            setTimeout(() => {
                this.setState({ time: time - 1, percentage: percentage + OneSecondIncrementPercentage });
                this.setPercentage(timeDuration);
            }, 1000);
        }
    }

    getOneSecondIncrementPercentage(timeDuration) {
        return 100 / timeDuration;
    }

    render() {
        const { percentage, time } = this.state;
        const { timeDuration } = this.props;

        return (
            <div>
                {timeDuration && time !== timeDuration ? (
                    <div className="custom-loader">
                        <Progress type="circle" percent={percentage.toFixed(1)} width={100} strokeWidth={8} />
                        <span className="text-white">{time} seconds left</span>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default CustomLoader;
