import classes from "./Post.module.css";
import React, {FC} from "react";
import {PostsType} from "../../../../types/types";

type PostPropsType = {
    posts: Array<PostsType>
}

const Post: FC<PostPropsType> = (props) => {
    return <div> {
        props.posts.map((post) => {
            return (
                <li key={post.id}>
                    <img className={classes.posts__img} alt='avatar' src={post.avatar} width='40'/>
                    {post.text}
                    <div>
                        <span>{post.likesCount}</span>
                    </div>
                </li>
            )
        }).reverse()
    }
    </div>
};

export default Post;