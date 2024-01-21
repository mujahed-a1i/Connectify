import "./modal.css";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userIcon from "../assests/userIcon/user_icon.png";
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import * as modalsAction from '../../store/reducers/modals';
import closeButton from "../assests/icons/closeIcon1.svg";
import  * as postAction from '../../store/reducers/posts';

export default function Modal() {

  const [description, setDescription] = useState('')
  const dispatch = useDispatch();
  let firstName = useSelector((state) => state.session.user.firstName);
  let lastName = useSelector((state) => state.session.user.lastName);
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  
  const params = useParams();

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownWrapper = document.querySelector(".feedPostModal");

      if (dropdownWrapper && !dropdownWrapper.contains(event.target)) {
        dispatch(modalsAction.hideModal());
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        dispatch(modalsAction.hideModal());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);


  const handleSubmitPost = (e) => {
    const post = {
      description: description,
    };

    e.preventDefault();
    dispatch(modalsAction.hideModal());
    return dispatch(postAction.createPost(post));
  };

  
  const handleCloseModal = (e) => {
    e.preventDefault();
    dispatch(modalsAction.hideModal());
  };


  if (params.feed === 'feed') {
    return (
      <dialog open className="feedPostModal">
        <div className="feedPostUserInfo">
          <img className="feedUserIcon" src={userIcon} alt="User Post Icon" width="56" height="56"/>
          <h1 className="feedPostUserName">{`${firstName}  ${lastName}`}</h1>
          <img className="feedCloseButton" src={closeButton} onClick={handleCloseModal} height='20' width='20' alt="close" />
        </div>
        <form className="feedPostModalForm" action="submit">
          <label htmlFor="postDescription"></label>
          <textarea id="postDescription" className="feedPostModalTextBox" 
            type="textarea" placeholder="What do you want to talk about?" 
            maxLength='3000' value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="feedModalPostButton" 
            onClick={handleSubmitPost} type="submit"
            disabled={description.length === 0} >
              Post 
          
          </button>
        </form>
      </dialog>
    );
  }
  
}
