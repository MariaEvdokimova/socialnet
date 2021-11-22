import React, {useEffect, useState} from 'react';

const ProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e) => {
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