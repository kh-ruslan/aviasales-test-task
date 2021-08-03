import React from "react";
import "./App.css";

//components
import InputEmail from "./components/InputEmail/InputEmail";
import ShareSocials from "./components/ShareSocials/ShareSocials";
import FinalPage from "./components/FinalPage/FinalPage";

import { createUser, fetchUser } from './api/user';

const DEFAULT_USER = {
  email: null,
  shared: false,
};

function App() {
  const [user, setUser] = React.useState(DEFAULT_USER);

  React.useEffect(() => {
    const userId = localStorage.getItem("aviasalesUserId");

    if (userId) {
      fetchUser(userId).then((user) => setUser(user));
    } else {
      createUser().then((user) => {
        localStorage.setItem("aviasalesUserId", user.id);
        setUser(user);
      });
    }
  }, []);

  const isFinalPage = !!user.email && user.shared;
  const appClassname = `App ${isFinalPage ? "App_final-page" : ""}`;

  return (
    <div className={appClassname}>
      {!isFinalPage && !!user.id && (
        <>
          <h1>Чтобы выиграть путешествие</h1>
          <ShareSocials user={user} onUpdateUser={setUser} />
          <InputEmail user={user} onUpdateUser={setUser} />
        </>
      )}

      {isFinalPage && <FinalPage />}
    </div>
  );
}

export default App;
