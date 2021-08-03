import React from "react";

import { updateUser } from "../../api/user";

import "./inputEmail.css";

const EMAIL_REG = /\S+@\S+\.\S+/;

const InputEmail = ({ user, onUpdateUser }) => {
  const [email, setEmail] = React.useState(user.email);

  React.useEffect(() => {
    setEmail(user.email);
  }, [user.email]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      email,
    };

    const resp = await updateUser(updatedUser);

    onUpdateUser(resp);
  };

  const hasEmail = !!user.email;

  const buildSubmitBtnAdditionalClassnames = () => {
    if (hasEmail) {
      return "input-email__submit-btn_none";
    }

    const isValidEmail = EMAIL_REG.test(email);

    return isValidEmail
      ? "input-email__submit-btn_valid"
      : "input-email__submit-btn_disabled";
  };

  return (
    <div className="input-email">
      <div>
        {hasEmail ? (
          <div className="list-count-item-done"></div>
        ) : (
          <span className="list-count-item">2.</span>
        )}
      </div>
      <form className="input-email__form" onSubmit={handleSubmitForm}>
        <label htmlFor="email">Оставь почту:</label>
        <input
          required
          type="email"
          id="email"
          className="input-email__input"
          onChange={handleChangeEmail}
          value={email || ""}
          disabled={hasEmail}
        />
        <button
          className={`input-email__submit-btn ${buildSubmitBtnAdditionalClassnames()}`}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default InputEmail;
