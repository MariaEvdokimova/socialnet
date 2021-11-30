import React from 'react';
import classes from './Posts.module.css';
import Post from "./Post/Post";
import {reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, Textarea} from "../../common/FormControls/FormControls";

const maxLength = maxLengthCreator(30);

const PostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField('newPostText', [required, maxLength], Textarea, 'Add text')}
            <button>Add post</button>
        </form>
    )
}

const PostsReduxForm = reduxForm({form: 'PostsForm'})(PostsForm);

const Posts = (props) => {

    const addPost = (values) => {
        props.addPostText(values.newPostText);
    }
    return (
        <div>
            My Posts
            <PostsReduxForm onSubmit={addPost}/>
            <ul className={classes.posts__list}>
                <Post posts={props.posts}/>
            </ul>
        </div>
    )
};

export default Posts;