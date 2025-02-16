import React, { useEffect, useRef, useState } from "react";
import "./Profile.scss";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEllipsis,
  faXmark,
  faPhotoFilm,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import VerifiedBadge from "../../components/icons/VerifiedBadge";
import ReelIcon from "../../components/icons/ReelIcon";
import PostCard from "../../components/post/PostCard";
import FollowModal from "../../components/popups/FollowModal";
import useClickOutside from "../../hooks/useClickOutside";

function Profile() {
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
      likesCount: 23,
      commentsCount: 10,
      createdAt: "2025-02-11T18:30:00Z",
      location: "Miami Beach, FL",
      collaborators: ["emma_smith", "david_brown"],
      hideLikesAndViewCounts: false,
      allowComments: false,
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
      likesCount: 45,
      commentsCount: 20,
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
      likesCount: 67,
      commentsCount: 15,
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
      likesCount: 89,
      commentsCount: 30,
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
    {
      id: "105",
      caption:
        "Late-night coding session fueled by coffee and determination! ☕️💻 Debugging never felt so rewarding. What’s your best coding hack? #CodingLife #Programmer #NightOwl",
      user: {
        id: "",
        username: "code_master",
        profileUrl:
          "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likesCount: 89,
      commentsCount: 30,
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
            "https://videos.pexels.com/video-files/16455384/16455384-hd_1080_1920_60fps.mp4",
          type: "video",
          thumbnailUrl:
            "https://images.pexels.com/videos/16455384/birtday-present-birth-birthday-girl-16455384.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          altText:
            "A laptop screen displaying lines of code with a cup of coffee nearby",
        },
      ],
    },
    {
      id: "106",
      caption:
        "Late-night coding session fueled by coffee and determination! ☕️💻 Debugging never felt so rewarding. What’s your best coding hack? #CodingLife #Programmer #NightOwl",
      user: {
        id: "",
        username: "code_master",
        profileUrl:
          "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likesCount: 89,
      commentsCount: 30,
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
            "https://videos.pexels.com/video-files/30627970/13111089_1440_2560_25fps.mp4",
          type: "video",
          thumbnailUrl:
            "https://images.pexels.com/videos/30627970/pizza-pizza-slice-pizzas-rene-sourdough-30627970.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          altText:
            "A laptop screen displaying lines of code with a cup of coffee nearby",
        },
      ],
    },
    {
      id: "107",
      caption:
        "Late-night coding session fueled by coffee and determination! ☕️💻 Debugging never felt so rewarding. What’s your best coding hack? #CodingLife #Programmer #NightOwl",
      user: {
        id: "",
        username: "code_master",
        profileUrl:
          "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likesCount: 89,
      commentsCount: 30,
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
            "https://images.pexels.com/photos/30594080/pexels-photo-30594080/free-photo-of-playful-cat-relaxing-on-sunlit-rocks-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          type: "image",
          altText:
            "A laptop screen displaying lines of code with a cup of coffee nearby",
        },
      ],
    },
    {
      id: "108",
      caption:
        "Late-night coding session fueled by coffee and determination! ☕️💻 Debugging never felt so rewarding. What’s your best coding hack? #CodingLife #Programmer #NightOwl",
      user: {
        id: "",
        username: "code_master",
        profileUrl:
          "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likesCount: 89,
      commentsCount: 30,
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
            "https://images.pexels.com/photos/30681878/pexels-photo-30681878/free-photo-of-glamour-portrait-of-a-woman-in-red-lighting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          type: "image",
          altText:
            "A laptop screen displaying lines of code with a cup of coffee nearby",
        },
      ],
    },
    {
      id: "109",
      caption:
        "Late-night coding session fueled by coffee and determination! ☕️💻 Debugging never felt so rewarding. What’s your best coding hack? #CodingLife #Programmer #NightOwl",
      user: {
        id: "",
        username: "code_master",
        profileUrl:
          "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likesCount: 89,
      commentsCount: 30,
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
            "https://images.pexels.com/photos/30699397/pexels-photo-30699397/free-photo-of-vibrant-rose-blossoms-in-lush-greenery.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          type: "image",
          altText:
            "A laptop screen displaying lines of code with a cup of coffee nearby",
        },
      ],
    },
  ];
  const suggestedUser = [
    {
      id: "5671",
      username: "john_doe",
      profileUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      fullName: "John Doe",
    },
    {
      id: "5672",
      username: "emma_watson",
      profileUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      fullName: "Emma Watson",
    },
    {
      id: "5673",
      username: "michael_smith",
      profileUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      fullName: "Michael Smith",
    },
    {
      id: "5674",
      username: "sophia_lee",
      profileUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      fullName: "Sophia Lee",
    },
    {
      id: "5675",
      username: "david_jones",
      profileUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      fullName: "David Jones",
    },
    {
      id: "5676",
      username: "olivia_martin",
      profileUrl: "https://randomuser.me/api/portraits/women/6.jpg",
      fullName: "Olivia Martin",
    },
    {
      id: "5677",
      username: "william_taylor",
      profileUrl: "https://randomuser.me/api/portraits/men/7.jpg",
      fullName: "William Taylor",
    },
    {
      id: "5678",
      username: "ava_clark",
      profileUrl: "https://randomuser.me/api/portraits/women/8.jpg",
      fullName: "Ava Clark",
    },
    {
      id: "5679",
      username: "noah_wilson",
      profileUrl: "https://randomuser.me/api/portraits/men/9.jpg",
      fullName: "Noah Wilson",
    },
    {
      id: "5680",
      username: "mia_rodriguez",
      profileUrl: "https://randomuser.me/api/portraits/women/10.jpg",
      fullName: "Mia Rodriguez",
    },
    {
      id: "5681",
      username: "james_brown",
      profileUrl: "https://randomuser.me/api/portraits/men/11.jpg",
      fullName: "James Brown",
    },
    {
      id: "5682",
      username: "charlotte_anderson",
      profileUrl: "https://randomuser.me/api/portraits/women/12.jpg",
      fullName: "Charlotte Anderson",
    },
    {
      id: "5683",
      username: "benjamin_thomas",
      profileUrl: "https://randomuser.me/api/portraits/men/13.jpg",
      fullName: "Benjamin Thomas",
    },
    {
      id: "5684",
      username: "amelia_white",
      profileUrl: "https://randomuser.me/api/portraits/women/14.jpg",
      fullName: "Amelia White",
    },
    {
      id: "5685",
      username: "elijah_harris",
      profileUrl: "https://randomuser.me/api/portraits/men/15.jpg",
      fullName: "Elijah Harris",
    },
    {
      id: "5686",
      username: "isabella_lopez",
      profileUrl: "https://randomuser.me/api/portraits/women/16.jpg",
      fullName: "Isabella Lopez",
    },
  ];
  const feakReels = [
    {
      id: "101",
      caption: "Golden hour vibes at the beach! 🌅✨",
      user: {
        id: "",
        username: "its_herry",
        profileUrl:
          "https://images.pexels.com/photos/1615776/pexels-photo-1615776.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likesCount: 23,
      commentsCount: 10,
      createdAt: "2025-02-11T18:30:00Z",
      location: "Miami Beach, FL",
      collaborators: ["emma_smith", "david_brown"],
      hideLikesAndViewCounts: false,
      allowComments: false,
      postMedia: [
        {
          id: "201",
          postId: "101",
          mediaUrl:
            "https://videos.pexels.com/video-files/2519660/2519660-sd_640_360_24fps.mp4",
          thumbnailUrl:
            "https://images.pexels.com/photos/30488841/pexels-photo-30488841/free-photo-of-stylish-rattan-chair-in-minimalist-interior-setting.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          type: "video",
          altText: "Waves gently hitting the shore while the sun sets",
        },
      ],
    },
    {
      id: "102",
      caption:
        "Hiking through the mountains was an unforgettable experience! ⛰️🎭",
      user: {
        id: "",
        username: "adventure_joe",
        profileUrl:
          "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: false,
      likesCount: 45,
      commentsCount: 20,
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
            "https://videos.pexels.com/video-files/13111089_1440_2560_25fps.mp4",
          thumbnailUrl:
            "https://images.pexels.com/photos/4887831/pexels-photo-4887831.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          type: "video",
          altText: "A scenic mountain landscape with a clear blue sky",
        },
      ],
    },
    {
      id: "103",
      caption: "Sunday brunch with my favorite people! 🍔🍞",
      user: {
        id: "",
        username: "foodie_anna",
        profileUrl:
          "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likesCount: 67,
      commentsCount: 15,
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
            "https://videos.pexels.com/video-files/16455384/16455384-hd_1080_1920_60fps.mp4",
          thumbnailUrl:
            "https://images.pexels.com/photos/30494421/pexels-photo-30494421/free-photo-of-delicious-croissant-with-fresh-berries-and-cream-topping.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          type: "video",
          altText:
            "A delicious spread of pancakes, croissants, and fresh fruits",
        },
      ],
    },
    {
      id: "104",
      caption:
        "Late-night coding session fueled by coffee and determination! ☕️💻",
      user: {
        id: "",
        username: "code_master",
        profileUrl:
          "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likesCount: 89,
      commentsCount: 30,
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
            "https://videos.pexels.com/video-files/30627970/13111089_1440_2560_25fps.mp4",
          thumbnailUrl:
            "https://images.pexels.com/photos/30594080/pexels-photo-30594080/free-photo-of-playful-cat-relaxing-on-sunlit-rocks-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          type: "video",
          altText:
            "A laptop screen displaying lines of code with a cup of coffee nearby",
        },
      ],
    },
    {
      id: "104",
      caption:
        "Late-night coding session fueled by coffee and determination! ☕️💻",
      user: {
        id: "",
        username: "code_master",
        profileUrl:
          "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likesCount: 89,
      commentsCount: 30,
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
            "https://videos.pexels.com/video-files/30627970/13111089_1440_2560_25fps.mp4",
          thumbnailUrl:
            "https://images.pexels.com/photos/30594080/pexels-photo-30594080/free-photo-of-playful-cat-relaxing-on-sunlit-rocks-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          type: "video",
          altText:
            "A laptop screen displaying lines of code with a cup of coffee nearby",
        },
      ],
    },
    {
      id: "104",
      caption:
        "Late-night coding session fueled by coffee and determination! ☕️💻",
      user: {
        id: "",
        username: "code_master",
        profileUrl:
          "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likesCount: 89,
      commentsCount: 30,
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
            "https://videos.pexels.com/video-files/30627970/13111089_1440_2560_25fps.mp4",
          thumbnailUrl:
            "https://images.pexels.com/photos/30594080/pexels-photo-30594080/free-photo-of-playful-cat-relaxing-on-sunlit-rocks-outdoors.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          type: "video",
          altText:
            "A laptop screen displaying lines of code with a cup of coffee nearby",
        },
      ],
    },
  ];

  const users = [
    {
      id: "1",
      username: "john_doe",
      fullName: "John Doe",
      profileUrl:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "2",
      username: "jane_smith",
      fullName: "Jane Smith",
      profileUrl:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "3",
      username: "mike_jordan",
      fullName: "Michael Jordan",
      profileUrl:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "4",
      username: "emma_watson",
      fullName: "Emma Watson",
      profileUrl:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "5",
      username: "elon_musk",
      fullName: "Elon Musk",
      profileUrl:
        "https://images.pexels.com/photos/1549004/pexels-photo-1549004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "6",
      username: "elon_musk",
      fullName: "Elon Musk",
      profileUrl:
        "https://images.pexels.com/photos/1549004/pexels-photo-1549004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "7",
      username: "elon_musk",
      fullName: "Elon Musk",
      profileUrl:
        "https://images.pexels.com/photos/1549004/pexels-photo-1549004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "8",
      username: "elon_musk",
      fullName: "Elon Musk",
      profileUrl:
        "https://images.pexels.com/photos/1549004/pexels-photo-1549004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "9",
      username: "elon_musk",
      fullName: "Elon Musk",
      profileUrl:
        "https://images.pexels.com/photos/1549004/pexels-photo-1549004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const { username } = useParams();

  const feakUser = {
    id: "12345",
    username: username,
    profileUrl:
      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Spring and React Learner",
    fullName: "Aniket Kadam",
    postsCount: 1,
    followers: 10,
    following: 12,
    story: true,
  };

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPosts, setShowPosts] = useState(true);
  const [showReels, setShowReels] = useState(false);
  const [showSuggestedUser, setShowSuggestedUser] = useState(false);
  const suggestedUsersRef = useRef();
  const [followersPage, setFollowersPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);
  const [followers, setFollowers] = useState(users);
  const [following, setFollowing] = useState(users);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const followersBoxRef = useRef(null);
  const followingBoxRef = useRef(null);

  useClickOutside(followersBoxRef, () => setShowFollowers(false));
  useClickOutside(followingBoxRef, () => setShowFollowing(false));

  useEffect(() => {
    // get the user by username
    setUser(feakUser);
    setLoading(false);

    // get the user posts
    setUser((user) => ({ ...user, posts: feakPosts }));
  }, []);

  const suggestedUserHandler = () => {
    if (showSuggestedUser) {
      setShowSuggestedUser(false);
    } else {
      setUser((user) => ({ ...user, similarUser: suggestedUser }));
      setShowSuggestedUser(true);
    }
  };

  const reelsHandler = () => {
    // get the user reels
    setUser((user) => ({ ...user, reels: feakReels }));
    setShowReels(true);
    setShowPosts(false);
  };

  const scrollLeft = () => {
    if (suggestedUsersRef.current) {
      suggestedUsersRef.current.scrollBy({ left: -700, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (suggestedUsersRef.current) {
      suggestedUsersRef.current.scrollBy({ left: 700, behavior: "smooth" });
    }
  };

  const getMoreFollowers = () => {
    // called to the API
    if (followersPage < 4) {
      setFollowers((prev) => [...prev, ...prev]);
      setFollowersPage((prev) => prev + 1);
    }
    // console.log("Followers page is: " + page);
  };

  const getMoreFollowing = () => {
    // called to the API
    setFollowing((prev) => [...prev, ...prev]);
    setFollowingPage((prev) => prev + 1);
  };

  const searchFollowers = (query) => {
    setFollowers(
      followers.filter(
        (user) => user.username.includes(query) || user.fullName.includes(query)
      )
    );
  };

  const searchFollowing = (query) => {
    setFollowing(
      following.filter(
        (user) => user.username.includes(query) || user.fullName.includes(query)
      )
    );
  };

  if (loading) {
    return <span>Loading...</span>;
  } else {
    return (
      <div className={`profile-container ${user.story ? "has-story" : ""}`}>
        {showFollowers && (
          <FollowModal
            ref={followersBoxRef}
            heading={"Followers"}
            user={user}
            follows={followers}
            handleClose={() => setShowFollowers(false)}
            handleAnotherPage={getMoreFollowers}
            handleSearch={searchFollowers}
            isCurrentUserProfile={true}
          />
        )}
        {showFollowing && (
          <FollowModal
            ref={followingBoxRef}
            heading={"Following"}
            user={user}
            follows={following}
            handleClose={() => setShowFollowing(false)}
            handleAnotherPage={getMoreFollowing}
            handleSearch={searchFollowing}
            isCurrentUserProfile={false}
          />
        )}
        <div className="profile-header">
          <div className="profile-picture">
            <img src={user.profileUrl} alt={`${user.username} profile`} />
          </div>
          <div className="profile-details">
            <div className="user-meta">
              <span className="username">{user.username}</span>
              <VerifiedBadge />
              <div className="action-buttons">
                <button className="btn follow-btn">Follow</button>
                <button className="btn message-btn">Message</button>
              </div>
              <div className="icon-buttons">
                <button
                  className="btn suggestions-btn"
                  onClick={suggestedUserHandler}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                </button>
                <button className="btn more-options">
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat">
                <span className="count">{user.postsCount}</span>
                <span>Posts</span>
              </div>
              <div
                className="stat"
                style={{ cursor: "pointer" }}
                onClick={() => setShowFollowers(true)}
              >
                <span className="count">{user.followers}</span>
                <span>Followers</span>
              </div>
              <div
                className="stat"
                style={{ cursor: "pointer" }}
                onClick={() => setShowFollowing(true)}
              >
                <span className="count">{user.following}</span>
                <span>Following</span>
              </div>
            </div>

            <div className="bio-section">
              <span className="full-name">{user.fullName}</span>
              <p className="bio">{user.bio}</p>
            </div>
          </div>
        </div>

        {showSuggestedUser && (
          <div className="suggested-users">
            {user.similarUser?.length > 6 && (
              <button className="scroll-btn left" onClick={scrollLeft}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            )}
            <div className="header">
              <span>Suggested for you</span>
              <Link to="#" className="see-all">
                See all
              </Link>
            </div>
            <div className="users-list" ref={suggestedUsersRef}>
              {user.similarUser?.map((similar) => (
                <div className="user-card" key={similar.id}>
                  <button className="remove-btn">
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                  <img
                    src={similar.profileUrl}
                    alt={`${similar.username} profile`}
                  />
                  <span className="username">{similar.username}</span>
                  <VerifiedBadge />
                  <span className="full-name">{similar.fullName}</span>
                  <Link to="#" className="follow-link">
                    Follow
                  </Link>
                </div>
              ))}
            </div>
            {user.similarUser?.length > 6 && (
              <button className="scroll-btn right" onClick={scrollRight}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            )}
          </div>
        )}

        <div className="content-section">
          <div className="content-tabs">
            <div
              className={`tab ${showPosts ? "active" : ""}`}
              onClick={() => {
                setShowPosts(true);
                setShowReels(false);
              }}
            >
              <FontAwesomeIcon icon={faPhotoFilm} />
              <span>Posts</span>
            </div>
            <div
              className={`tab ${showReels ? "active" : ""}`}
              onClick={reelsHandler}
            >
              <ReelIcon />
              <span>Reels</span>
            </div>
          </div>

          <div className="content-display">
            {showPosts && (
              <div className="posts-list">
                {user.posts?.map((post) => (
                  <PostCard post={post} key={post.id} />
                ))}
              </div>
            )}
            {showReels && (
              <div className="reels-list">
                {user.reels?.map((reel) => (
                  <PostCard post={reel} key={reel.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
