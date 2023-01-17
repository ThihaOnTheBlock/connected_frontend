import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath,firstName,lastName } = useSelector((state) => state.user);

  return (
    <Box>
      {/* NavBar */}
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
       
        {/* Post */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          
          <h1>NewsFeed</h1>
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>

        {/* User */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <h1>Profile</h1>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        
        {/* FriendList */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <h2>Advertisements</h2>
            <AdvertWidget />
            <Box m="2rem 0" />
            <h2>People</h2>
            <h3>Added You</h3>
            <FriendListWidget userId={_id} />
            <h3>Friend Requests Pending</h3>
            <FriendListWidget userId={_id} />
            <h3>Your Friends</h3>
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
