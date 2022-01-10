import Users from "./Users";
import {connect} from "react-redux";
import {
    FilterType,
    follow,
    requestUsers,
    unfollow
} from "../../redux/usersReducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage, getFilter,
    getIsFetching,
    getPageSize, getportionSize,
    getTotalUsers, getUsers,
    getUsersFollowInProgress
} from "../../redux/users-selectors";
import {UsersType} from "../../types/types";
import {AppStateType} from "../../redux/store";

type MapStateToPropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsers: number,
    portionSize: number,
    users: Array<UsersType>,
    usersFollowInProgress: Array<number>,
    filter: FilterType
};

type MapDispatchToPropsType = {
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
    requestUsers: (page: number, pageSize: number, filter: FilterType) => void
};

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {

    componentDidMount () {
        const {currentPage, pageSize, filter} = this.props;
        this.props.requestUsers(currentPage, pageSize, filter);
    }

    onPageChange = (page: number) => {
        this.props.requestUsers(page, this.props.pageSize, this.props.filter);
    }

    onFilterChanged = (filter: FilterType) => {
        this.props.requestUsers(1, this.props.pageSize, filter);
    }

    render () {
        return <>
            <h2>{this.props.pageTitle}</h2>
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
                onFilterChanged={this.onFilterChanged}
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

const mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        totalUsers: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        isFetching: getIsFetching(state),
        usersFollowInProgress: getUsersFollowInProgress(state),
        portionSize: getportionSize(state),
        filter: getFilter(state)
    }
};

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {follow, unfollow, requestUsers})(UsersContainer);
