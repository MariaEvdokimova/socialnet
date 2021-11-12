import {connect} from 'react-redux';
import Posts from './Posts';
import {addPostText} from "../../../redux/profileReducer";

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts
    }
};

export default connect(mapStateToProps, {addPostText})(Posts);
