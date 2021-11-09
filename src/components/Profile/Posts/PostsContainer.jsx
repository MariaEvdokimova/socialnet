import {connect} from 'react-redux';
import Posts from './Posts';
import {addPostText, updatePostText} from "../../../redux/profileReducer";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
};

export default connect(mapStateToProps, {updatePostText, addPostText})(Posts);
