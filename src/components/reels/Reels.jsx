import { useEffect, useState } from "react";
import Reel from "../reel/Reel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import postService from "../../services/postService";
import useConnectedUser from "../../hooks/useConnectedUser";
import { toast } from "react-toastify";
import NotFoundTv from "../3D-componets/NotFoundTv";
import "./Reels.scss";

const Reels = () => {
  const connectedUser = useConnectedUser();
  const [reels, setReels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [noReels, setNoReels] = useState(false);

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
    if (isLastPage) return;
    (async () => {
      const reelResponse = await postService.getReels(
        page,
        5,
        connectedUser.authToken
      );
      if (!reelResponse.success) {
        toast.error(reelResponse.error);
        return;
      }
      setNoReels(
        reelResponse.data.content.length === 0 && reelResponse.data.first
      );
      setIsLastPage(reelResponse.data.last);
      console.log(reelResponse.data.content);
      setReels((prevReels) =>
        prevReels
          ? [...prevReels, ...reelResponse.data.content]
          : [...reelResponse.data.content]
      );
      setLoading(false);
    })();
  }, [page]);

  useEffect(() => {
    if (isLastPage) return;
    if (currentIndex === reels.length - 2) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [currentIndex]);

  if (!loading && noReels) {
    return (
      <div className="no-reels">
        <NotFoundTv msg={"No reels? No problem! Add your first reel and make some magic! 🎬✨"} />
      </div>
    );
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="reels-container">
      <div className="reel-wrapper">
        <Reel
          reel={reels[currentIndex]}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
      <div className="controls">
        <button
          className="nav-btn up-btn"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          className="nav-btn down-btn"
          onClick={handleNext}
          disabled={currentIndex === reels.length - 1}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
    </div>
  );
};

export default Reels;
