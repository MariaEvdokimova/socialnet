import classes from "./Post.module.css";
import React from "react";

const Post = (props) => {
    return props.posts.map((post) => {
        return (
            <li key={ post.id }>
                <img className={classes.posts__img} alt='avatar' src={post.avatar} width='40'/>
                {post.text}
                <div>
                    <span>{post.likesCount}</span>
                </div>
            </li>
        )
    })
};

export default Post;