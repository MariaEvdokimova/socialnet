import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import style from '../../common/FormControls/FormControl.module.css';

type PropsType = {
    error: string | null,
    status: string,
    updateUserStatus: (newStatus: string) => void
};

const ProfileStatus: FC<PropsType> = ({error, ...props}) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    useEffect (() => {
        setStatus(props.status);
    }, [props.status])


    return (
        <div>
            { !editMode
                ? <span onDoubleClick={activateEditMode}>{props.status || '...'}</span>
                : <input onChange={onStatusChange}
                           autoFocus={true}
                           onBlur={deactivateEditMode}
                           value={status}/>
            }
            {error && <div className={style.form__common_error}>{error}</div>}
        </div>
    )
}

export default ProfileStatus;

/*class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {
        return (
            <div>
                { !this.state.editMode
                    ? <span onDoubleClick={this.activateEditMode}>{this.props.status || '...'}</span>
                    : <input onChange={this.onStatusChange}
                             autoFocus={true}
                             onBlur={this.deactivateEditMode}
                             value={this.state.status}/>
                }
            </div>
        )
    }
}

export default ProfileStatus;*/