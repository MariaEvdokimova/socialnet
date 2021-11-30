import React from 'react';
import styles from './Error.module.css';

const Error = ({errorMessage}) => {
    return (
        <div className={styles.error}>
            {'Caught: ' + errorMessage}
        </div>
    )
}

export default Error;