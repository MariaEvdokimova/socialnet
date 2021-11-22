import Users from "./Users";
import {connect} from "react-redux";
import {
    follow,
    requestUsers,
    setTotalUsers,
    unfollow
} from "../../redux/usersReducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage,
    getIsFetching,
    getPageSize, getportionSize,
    getTotalUsers, getUsers,
    getUsersFollowInProgress
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

    componentDidMount () {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChange = (page) => {
        this.props.requestUsers(page, this.props.pageSize);
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
                portionSize={this.props.portionSize}
            />
        </>
    }
}
/*
const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsers: state.usersPage.totalUsers,
        currentPage: state.usersPage.currentPage,
        pageSize: state.usersPage.pageSize,
        isFetching: state.usersPage.isFetching,
        usersFollowInProgress: state.usersPage.usersFollowInProgress
    }
};*/

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalUsers: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        isFetching: getIsFetching(state),
        usersFollowInProgress: getUsersFollowInProgress(state),
        portionSize: getportionSize(state)
    }
};

export default connect(mapStateToProps,
    {follow, unfollow, setTotalUsers, requestUsers})(UsersContainer);
