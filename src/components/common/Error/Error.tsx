import React, {FC} from 'react';
import styles from './Error.module.css';

type PropsType = {
    errorMessage: string
};

const Error: FC<PropsType> = ({errorMessage}) => {
    return (
        <div className={styles.error}>
            {'Caught: ' + errorMessage}
        </div>
    )
}

export default Error;