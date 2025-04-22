import { 
    faChevronLeft, 
    faChevronRight, 
    faSearch 
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React, { useState } from "react";
  import "./Discover.scss";
  
  function Discover() {
    const [currBot, setCurrBot] = useState(0);
    
    // Dummy data arrays
    const bots = [
      {
        id: 1,
        name: "Travel Companion",
        avatar: "https://images.pexels.com/photos/30327991/pexels-photo-30327991/free-photo-of-historic-fort-in-okzitanien-france.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        bio: "Your ultimate guide for travel planning and cultural insights! 🌍✈️",
        creator: { username: "WanderLabs" },
        profession: "Travel Advisor"
      },
      {
        id: 2,
        name: "Code Mentor",
        avatar: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
        bio: "Learn programming with interactive coding exercises and real-time feedback 💻🚀",
        creator: { username: "TechAcademy" },
        profession: "Programming Tutor"
      },
      {
        id: 3,
        name: "Fitness Coach",
        avatar: "https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=600",
        bio: "Get personalized workout plans and nutrition guidance 💪🥗",
        creator: { username: "FitTech" },
        profession: "Fitness Expert"
      }
    ];
  
    const popularAIs = [
      {
        id: 1,
        name: "Art Assistant",
        avatar: "https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=600",
        creator: { username: "CreativeAI" },
        profession: "Digital Artist"
      },
      {
        id: 2,
        name: "Study Buddy",
        avatar: "https://images.pexels.com/photos/1326947/pexels-photo-1326947.jpeg?auto=compress&cs=tinysrgb&w=600",
        creator: { username: "EduTech" },
        profession: "Education"
      },
      {
        id: 3,
        name: "Finance Guru",
        avatar: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=600",
        creator: { username: "FinWise" },
        profession: "Financial Advisor"
      }
    ];
  
    const engineers = [
      {
        id: 1,
        name: "Code Optimizer",
        avatar: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
        creator: { username: "DevTools" },
        profession: "Software Engineer"
      },
      {
        id: 2,
        name: "Debug Master",
        avatar: "https://images.pexels.com/photos/9242279/pexels-photo-9242279.jpeg?auto=compress&cs=tinysrgb&w=600",
        creator: { username: "CodeFix" },
        profession: "QA Engineer"
      }
    ];
  
    const gamers = [
      {
        id: 1,
        name: "Strategy Pro",
        avatar: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600",
        creator: { username: "GameLabs" },
        profession: "Esports Coach"
      },
      {
        id: 2,
        name: "Quest Guide",
        avatar: "https://images.pexels.com/photos/459762/pexels-photo-459762.jpeg?auto=compress&cs=tinysrgb&w=600",
        creator: { username: "RPGMaster" },
        profession: "Game Assistant"
      }
    ];
  
    const recentlyCreated = [
      {
        id: 1,
        name: "Recipe AI",
        avatar: "https://images.pexels.com/photos/459762/pexels-photo-459762.jpeg?auto=compress&cs=tinysrgb&w=600",
        creator: { username: "FoodieTech" },
        profession: "Culinary Assistant"
      },
      {
        id: 2,
        name: "Music Composer",
        avatar: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600",
        creator: { username: "SoundWave" },
        profession: "Music Producer"
      }
    ];
  
    const handleNextBot = () => {
      setCurrBot((prev) => (prev + 1) % bots.length);
    };
  
    const handlePrevBot = () => {
      setCurrBot((prev) => (prev - 1 + bots.length) % bots.length);
    };
  
    return (
      <div className="discover-container">
        <div className="head-section">
          <h1 className="heading">Discover AIs</h1>
          <p className="para">Find and interact with AIs created by others.</p>
        </div>
        
        <div className="search-section">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Search AIs, creators or topics" />
        </div>
  
        <div className="ai-slider">
          <div className="left" onClick={handlePrevBot}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="ai-profile">
            <div className="avtar">
              <img src={bots[currBot].avatar} alt={bots[currBot].name} />
            </div>
            <div className="ai-info">
              <span className="bot-name">{bots[currBot].name}</span>
              <span className="creator">By @{bots[currBot].creator.username}</span>
              <span className="bio">{bots[currBot].bio}</span>
            </div>
          </div>
          <div className="right" onClick={handleNextBot}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
  
        <div className="popular-ais">
          <h2>Popular AIs</h2>
          {popularAIs.map((ai) => (
            <ProfileCard ai={ai} key={ai.id} />
          ))}
        </div>
  
        <div className="create-ai">
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/v4/yH/r/iDeTHL3TZDJ.png"
            alt="create ai illustration"
          />
          <p>
            Create an AI for deep conversations, help with specific topics or just
            for fun.
          </p>
          <button>Create an AI</button>
        </div>
  
        <div className="engineer">
          <h2>Engineer's Picks</h2>
          {engineers.map((ai) => (
            <ProfileCard ai={ai} key={ai.id} />
          ))}
        </div>
  
        <div className="gamers">
          <h2>Gamer's Corner</h2>
          {gamers.map((ai) => (
            <ProfileCard ai={ai} key={ai.id} />
          ))}
        </div>
  
        <div className="recently-created">
          <h2>New Creations</h2>
          {recentlyCreated.map((ai) => (
            <ProfileCard ai={ai} key={ai.id} />
          ))}
        </div>
      </div>
    );
  }
  
  const ProfileCard = ({ ai }) => {
    return (
      <div className="ai-profile-card">
        <div className="avtar">
          <img src={ai.avatar} alt={ai.name} />
        </div>
        <span className="ai-name">{ai.name}</span>
        <span className="creator">By @{ai.creator.username}</span>
        <span className="profession">{ai.profession}</span>
      </div>
    );
  };
  
  export default Discover;