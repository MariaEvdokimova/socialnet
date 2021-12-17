import {connect} from 'react-redux';
import Posts from './Posts';
import {actions} from "../../../redux/profileReducer";
import { PostsType } from '../../../types/types';
import {AppStateType} from "../../../redux/store";

type MapStateToPropsType = {
    posts: Array<PostsType>
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts
    }
};

const addPostText = actions.addPostText;

export default connect(mapStateToProps, {addPostText})(Posts);
