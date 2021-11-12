import React from 'react';
import classes from './Posts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";

const maxLength = maxLengthCreator(30);

const PostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newPostText'} placeholder={'Add text'}
                       validate={[required, maxLength]} />
            </div>
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