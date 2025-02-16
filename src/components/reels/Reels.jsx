import { useEffect, useState } from "react";
import Reel from "../reel/Reel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Reels = () => {
  const feakReels = [
    {
      id: "101",
      caption:
        "Golden hour vibes at the beach! 🌅✨ Nothing beats the sound of waves crashing and the sky painted in shades of orange and pink. Pure serenity! 🌊💛 #SunsetLover #BeachVibes #GoldenHour #NatureAtItsBest #Wanderlust",
      user: {
        id: "u101",
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
      postMedia: {
        id: "201",
        postId: "101",
        mediaUrl:
          "https://videos.pexels.com/video-files/6878205/6878205-sd_506_960_25fps.mp4",
        type: "video",
        altText:
          "A beautiful sunset at the beach with orange and pink hues in the sky",
      },
    },
    {
      id: "102",
      caption: "Pizza🍕",
      user: {
        id: "u102",
        username: "aniket205kadam",
        profileUrl:
          "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likes: 45,
      commentCount: 5,
      createdAt: "2025-02-11T19:00:00Z",
      location: "New York, USA",
      collaborators: ["foodie_jane"],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: {
        id: "202",
        postId: "102",
        mediaUrl:
          "https://videos.pexels.com/video-files/30627970/13111085_360_640_25fps.mp4",
        type: "video",
        altText: "Delicious pizza being baked in a wood-fired oven",
      },
    },
    {
      id: "104",
      caption: "Late-night coding session 💻☕ #programmer #code #hustle",
      user: {
        id: "u104",
        username: "dev_guru",
        profileUrl:
          "https://videos.pexels.com/video-files/30564620/13089912_360_640_30fps.mp4",
      },
      liked: true,
      likes: 78,
      commentCount: 20,
      createdAt: "2025-02-12T23:59:00Z",
      location: "Silicon Valley, CA",
      collaborators: ["tech_master"],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: {
        id: "204",
        postId: "104",
        mediaUrl:
          "https://videos.pexels.com/video-files/30618930/13107470_640_360_24fps.mp4",
        type: "video",
        altText: "A programmer typing on a laptop in a dimly lit room",
      },
    },
    {
      id: "105",
      caption: "Morning workout done! 💪🏋️‍♂️ #Fitness #GymLife",
      user: {
        id: "u105",
        username: "fit_john",
        profileUrl:
          "https://videos.pexels.com/video-files/30272799/12977171_640_360_30fps.mp4",
      },
      liked: false,
      likes: 35,
      commentCount: 8,
      createdAt: "2025-02-13T07:00:00Z",
      location: "Los Angeles, CA",
      collaborators: [],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: {
        id: "205",
        postId: "105",
        mediaUrl:
          "https://videos.pexels.com/video-files/30056480/12892218_360_640_30fps.mp4",
        type: "video",
        altText: "A man lifting weights in the gym",
      },
    },
    {
      id: "106",
      caption: "Skydiving adventure 🪂 #ExtremeSports #ThrillSeeker",
      user: {
        id: "u106",
        username: "thrill_seeker",
        profileUrl:
          "https://videos.pexels.com/video-files/30401545/13028930_640_360_60fps.mp4",
      },
      liked: true,
      likes: 90,
      commentCount: 15,
      createdAt: "2025-02-13T12:00:00Z",
      location: "Dubai, UAE",
      collaborators: ["adrenaline_rush"],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: {
        id: "206",
        postId: "106",
        mediaUrl:
          "https://videos.pexels.com/video-files/30106304/12912463_360_640_25fps.mp4",
        type: "video",
        altText: "A skydiver jumping from a plane with a breathtaking view",
      },
    },
    {
      id: "107",
      caption:
        "Home-cooked meal 🍲✨ Who else loves homemade food? #Foodie #Cooking",
      user: {
        id: "u107",
        username: "chef_anna",
        profileUrl:
          "https://videos.pexels.com/video-files/30260143/12972683_360_682_30fps.mp4",
      },
      liked: false,
      likes: 60,
      commentCount: 12,
      createdAt: "2025-02-13T14:30:00Z",
      location: "Paris, France",
      collaborators: ["foodblogger123"],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: {
        id: "207",
        postId: "107",
        mediaUrl:
          "https://videos.pexels.com/video-files/30226167/12959191_360_640_60fps.mp4",
        type: "video",
        altText: "A chef preparing a delicious home-cooked meal",
      },
    },
  ];

  const newReels = [
    {
      id: "108",
      caption: "Snowy adventures in the Alps! ❄️🏔️ #WinterWonderland #SkiLife",
      user: {
        id: "u108",
        username: "snow_lover",
        profileUrl:
          "https://images.pexels.com/photos/3728086/pexels-photo-3728086.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: true,
      likes: 80,
      commentCount: 18,
      createdAt: "2025-02-14T08:00:00Z",
      location: "Swiss Alps, Switzerland",
      collaborators: ["ski_pro", "mountain_king"],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: {
        id: "208",
        postId: "108",
        mediaUrl:
          "https://videos.pexels.com/video-files/2873755/2873755-sd_640_360_25fps.mp4",
        type: "video",
        altText: "Skiing through fresh snow in the Alps",
      },
    },
    {
      id: "109",
      caption: "Street food tour in Bangkok! 🍜🌶️ #Foodie #TravelEats",
      user: {
        id: "u109",
        username: "food_explorer",
        profileUrl:
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      liked: false,
      likes: 54,
      commentCount: 9,
      createdAt: "2025-02-14T12:45:00Z",
      location: "Bangkok, Thailand",
      collaborators: ["spice_master"],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: {
        id: "209",
        postId: "109",
        mediaUrl:
          "https://videos.pexels.com/video-files/854082/854082-sd_640_360_25fps.mp4",
        type: "video",
        altText: "A sizzling street food stall serving Thai delicacies",
      },
    },
    {
      id: "110",
      caption:
        "Morning yoga by the beach 🧘‍♀️🌊 #Mindfulness #WellnessJourney",
      user: {
        id: "u110",
        username: "zen_vibes",
        profileUrl:
          "https://videos.pexels.com/video-files/3191914/3191914-sd_640_360_25fps.mp4",
      },
      liked: true,
      likes: 67,
      commentCount: 14,
      createdAt: "2025-02-14T06:30:00Z",
      location: "Bali, Indonesia",
      collaborators: ["yoga_guru"],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: {
        id: "210",
        postId: "110",
        mediaUrl:
          "https://videos.pexels.com/video-files/28620283/12435040_360_640_30fps.mp4",
        type: "video",
        altText: "A woman practicing yoga at sunrise on a beach",
      },
    },
    {
      id: "111",
      caption:
        "Exploring the streets of Tokyo at night 🎌🌆 #CityLights #TravelDiaries",
      user: {
        id: "u111",
        username: "urban_nomad",
        profileUrl:
          "https://videos.pexels.com/video-files/855828/855828-sd_640_360_30fps.mp4",
      },
      liked: false,
      likes: 75,
      commentCount: 22,
      createdAt: "2025-02-14T21:15:00Z",
      location: "Tokyo, Japan",
      collaborators: ["tech_junkie", "night_owl"],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: {
        id: "211",
        postId: "111",
        mediaUrl:
          "https://videos.pexels.com/video-files/6237084/6237084-sd_360_640_30fps.mp4",
        type: "video",
        altText: "Neon-lit streets of Tokyo bustling with people",
      },
    },
    {
      id: "112",
      caption: "Breathtaking view from the top! 🏞️⛰️ #NatureLover #HikingLife",
      user: {
        id: "u112",
        username: "trail_blazer",
        profileUrl:
          "https://videos.pexels.com/video-files/15172075/15172075-sd_360_640_30fps.mp4",
      },
      liked: true,
      likes: 88,
      commentCount: 17,
      createdAt: "2025-02-14T15:00:00Z",
      location: "Grand Canyon, USA",
      collaborators: [],
      hideLikesAndViewCounts: false,
      allowComments: true,
      postMedia: {
        id: "212",
        postId: "112",
        mediaUrl:
          "https://videos.pexels.com/video-files/7467776/7467776-sd_360_640_30fps.mp4",
        type: "video",
        altText: "A hiker standing at the edge of the Grand Canyon",
      },
    },
  ];
  

  const [reels, setReels] = useState(feakReels);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (currentIndex === reels.length - 2) {
      console.log("Call to the api for next reels");
      //TODO: api call
      setReels((prevReels) => [...prevReels, ...newReels]);
    }

  }, [currentIndex]);

  return (
    <div className="reels-container">
      <div className="controls">
        <div className="up-btn">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        </div>
        <div className="down-btn">
        <button
          onClick={handleNext}
          disabled={currentIndex === reels.length - 1}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
        </div>
      </div>
      <div className="reel-wrapper">
        <Reel reel={reels[currentIndex]} handleNext={handleNext} handlePrev={handlePrev} />
      </div>
    </div>
  );
};

export default Reels;
