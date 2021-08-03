import React from "react";
import {
  FacebookShareButton,
  OKShareButton,
  TwitterShareButton,
  VKShareButton,
  FacebookIcon,
  VKIcon,
  OKIcon,
  TwitterIcon,
} from "react-share";

import { updateUser } from "../../api/user";

import "./shareSocials.css";

const SHARE_URL = "https://kandidat.aviasales.ru/";

const ShareSocials = ({ user, onUpdateUser }) => {
  const handleShareWindowClose = async () => {
    const updatedUser = {
      ...user,
      shared: true,
    };

    const resp = await updateUser(updatedUser);

    onUpdateUser(resp);
  };

  const { shared } = user;

  return (
    <div className="share-socials">
      <div>
        {shared ? (
          <div className="list-count-item-done"></div>
        ) : (
          <span className="list-count-item">1.</span>
        )}
        Поделись с друзьями:
      </div>

      <div className="share-socials__buttons">
        <VKShareButton
          disabled={shared}
          url={SHARE_URL}
          onShareWindowClose={handleShareWindowClose}
        >
          <VKIcon round={true} />
        </VKShareButton>
        <FacebookShareButton
          disabled={shared}
          url={SHARE_URL}
          onShareWindowClose={handleShareWindowClose}
        >
          <FacebookIcon round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          disabled={shared}
          url={SHARE_URL}
          onShareWindowClose={handleShareWindowClose}
        >
          <TwitterIcon round={true} />
        </TwitterShareButton>
        <OKShareButton
          disabled={shared}
          url={SHARE_URL}
          onShareWindowClose={handleShareWindowClose}
        >
          <OKIcon round={true} />
        </OKShareButton>
      </div>
    </div>
  );
};

export default ShareSocials;
