import { notification } from 'antd';
let _instance = null;

class NotificationHelper {
    state = {
        success: {
            show: false,
            message: ''
        },
        error: {
            show: false,
            message: ''
        },
        warning: {
            show: false,
            message: ''
        }
    };

    static getInstance() {
        if (_instance === null) {
            _instance = new NotificationHelper();
        }

        return _instance;
    }

    success(message) {
        notification['success']({
            key: 'success',
            message: message
            // description: message
        });
    }

    warning(message) {
        notification['warning']({
            key: 'warning',
            message: message
            // description: message
        });
    }

    error(message) {
        notification['error']({
            key: 'error',
            message: message
            // description: message
        });
    }
}

export default NotificationHelper;
