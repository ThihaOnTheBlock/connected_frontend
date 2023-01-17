import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const api = "https://connected-api.herokuapp.com"

const PostsWidget = ({ userId, isProfile = true }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  //Newsfeed
  const getPosts = async () => {
    const response = await fetch(`${api}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  //Profile
  const getUserPosts = async () => {
    const response = await fetch(
      `${api}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    try{
    const data = await response.json();
    console.log(data)
    dispatch(setPosts({ posts: data }));}catch(e){
      console.log(e.message)
    }
  };

  useEffect(() => {
    if (isProfile) {
      //Profile
      console.log("Triggering profile")
      getUserPosts();
    } else {
      //Newsfeed
      console.log("Triggering newsfeed")
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
