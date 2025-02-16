import React, { useEffect, useState } from "react";
import "./Posts.scss";
import PostPreview from "../post/PostPreview";
import Loading from "../icons/Loading";

function Posts() {
  const feakPosts = [
    {
      id: "101",
      caption:
        "Golden hour vibes at the beach! 🌅✨ Nothing beats the sound of waves crashing and the sky painted in shades of orange and pink. Pure serenity! 🌊💛 #SunsetLover #BeachVibes #GoldenHour #NatureAtItsBest #Wanderlust",
      user: {
        id: "",
        username: "its_herry",
        profileUrl:
          "https://images.pexels.com/photos/1615776/pexels-photo-1615776.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likes: 23,
      commentCount: 10,
      createdAt: "2025-02-11T18:30:00Z",
      location: "Miami Beach, FL",
      collaborators: ["emma_smith", "david_brown"],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: [
        {
          id: "201",
          postId: "101",
          mediaUrl:
            "https://images.pexels.com/photos/30553412/pexels-photo-30553412/free-photo-of-vibrant-red-lanterns-in-urban-street-scene.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          type: "image",
          altText:
            "A beautiful sunset at the beach with orange and pink hues in the sky",
        },
        {
          id: "202",
          postId: "101",
          mediaUrl:
            "https://videos.pexels.com/video-files/2519660/2519660-sd_640_360_24fps.mp4",
          type: "video",
          altText: "Waves gently hitting the shore while the sun sets",
        },
      ],
    },
    {
      id: "102",
      caption:
        "Hiking through the mountains was an unforgettable experience! ⛰️🎭 The view from the top was absolutely breathtaking. Who else loves adventures like this? #HikingAdventures #NatureLover #MountainViews",
      user: {
        id: "",
        username: "adventure_joe",
        profileUrl:
          "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: false,
      likes: 45,
      commentCount: 20,
      createdAt: "2025-02-12T10:15:00Z",
      location: "Rocky Mountains, CO",
      collaborators: [],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: [
        {
          id: "203",
          postId: "102",
          mediaUrl:
            "https://images.pexels.com/photos/289347/pexels-photo-289347.jpeg?auto=compress&cs=tinysrgb&w=600",
          type: "image",
          altText: "A scenic mountain landscape with a clear blue sky",
        },
        {
          id: "204",
          postId: "102",
          mediaUrl:
            "https://images.pexels.com/photos/289347/pexels-photo-289347.jpeg?auto=compress&cs=tinysrgb&w=600",
          type: "image",
          altText: "A scenic mountain landscape with a clear blue sky",
        },
        {
          id: "205",
          postId: "102",
          mediaUrl:
            "https://images.pexels.com/photos/289347/pexels-photo-289347.jpeg?auto=compress&cs=tinysrgb&w=600",
          type: "image",
          altText: "A scenic mountain landscape with a clear blue sky",
        },
        {
          id: "206",
          postId: "102",
          mediaUrl:
            "https://images.pexels.com/photos/289347/pexels-photo-289347.jpeg?auto=compress&cs=tinysrgb&w=600",
          type: "image",
          altText: "A scenic mountain landscape with a clear blue sky",
        },
      ],
    },
    {
      id: "103",
      caption:
        "Sunday brunch with my favorite people! 🍔🍞 Nothing beats good food and great company. What’s your go-to brunch meal? #Foodie #BrunchTime #WeekendVibes",
      user: {
        id: "",
        username: "foodie_anna",
        profileUrl:
          "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likes: 67,
      commentCount: 15,
      createdAt: "2025-02-10T09:00:00Z",
      location: "New York City, NY",
      collaborators: ["john_doe"],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: [
        {
          id: "204",
          postId: "103",
          mediaUrl:
            "https://images.pexels.com/photos/3026803/pexels-photo-3026803.jpeg?auto=compress&cs=tinysrgb&w=600",
          type: "image",
          altText:
            "A delicious spread of pancakes, croissants, and fresh fruits",
        },
      ],
    },
    {
      id: "104",
      caption:
        "Late-night coding session fueled by coffee and determination! ☕️💻 Debugging never felt so rewarding. What’s your best coding hack? #CodingLife #Programmer #NightOwl",
      user: {
        id: "",
        username: "code_master",
        profileUrl:
          "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likes: 89,
      commentCount: 30,
      createdAt: "2025-02-09T23:45:00Z",
      location: "San Francisco, CA",
      collaborators: [],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: [
        {
          id: "205",
          postId: "104",
          mediaUrl:
            "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600",
          type: "image",
          altText:
            "A laptop screen displaying lines of code with a cup of coffee nearby",
        },
      ],
    },
  ];
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [posts, setPosts] = useState(feakPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      await delay(2000);
      console.log("requested more data");
      setPage((prevPage) => prevPage + 1);
      // feak work
      setPosts((prevPosts) => [...prevPosts, ...feakPosts]);
      setLoading(false);
    }
  };

  useEffect(() => {
    // here get the data from server
    console.log("Next page is : " + page);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <PostPreview post={post} />
      ))}
      {loading && <Loading top={80} />}
    </div>
  );
}

export default Posts;
