import React, { FC } from 'react';
import classes from './Posts.module.css';
import Post from "./Post/Post";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, Textarea} from "../../common/FormControls/FormControls";
import {PostsType} from "../../../types/types";

const maxLength = maxLengthCreator(30);

const PostsForm: FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<FormDataKey>('newPostText', [required, maxLength], Textarea, 'Add text')}
            <button>Add post</button>
        </form>
    )
}

const PostsReduxForm = reduxForm<FormDataType>({form: 'PostsForm'})(PostsForm);

type PostsPropsType = {
    posts: Array<PostsType>,
    addPostText: (newPostText: string) => void
};

type FormDataType = {
    newPostText: string
}

type FormDataKey = Extract<keyof FormDataType, string>;

const Posts: FC<PostsPropsType> = (props) => {

    const addPost = (formData: FormDataType) => {
        props.addPostText(formData.newPostText);
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