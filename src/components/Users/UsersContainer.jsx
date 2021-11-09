import Users from "./Users";
import {connect} from "react-redux";
import {
    follow,
    getUsers,
    setTotalUsers,
    unfollow
} from "../../redux/usersReducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {

    componentDidMount () {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChange = (page) => {
        this.props.getUsers(page, this.props.pageSize);
    }

    render () {
        return <>
            { this.props.isFetching && <Preloader/> }
            <Users
                totalUsers={this.props.totalUsers}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChange={this.onPageChange}
                users={this.props.users}
                usersFollowInProgress={this.props.usersFollowInProgress}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
            />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        isFetching: state.usersPage.isFetching,
        usersFollowInProgress: state.usersPage.usersFollowInProgress
    }
};

export default connect(mapStateToProps,
    {follow, unfollow, setTotalUsers, getUsers})(UsersContainer);
