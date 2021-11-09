import React from 'react';
import classes from './Posts.module.css';
import Post from "./Post/Post";

const Posts = (props) => {
    const newPostElement = React.createRef();

    const onPostChange = () => {
        const text = newPostElement.current.value;
        props.updatePostText(text);
    };

    const onAddPost = () => {
        props.addPostText();
        newPostElement.current.value = '';
    };

    return (
        <div>
            My Posts
            <div>
                <textarea
                    onChange={onPostChange}
                    value={props.newPostText}
                    ref={newPostElement}
                />
                <button onClick={onAddPost}>Add post</button>
            </div>
            <ul className={classes.posts__list}>
                <Post posts={props.posts}/>
            </ul>
        </div>
    )
};

export default Posts;