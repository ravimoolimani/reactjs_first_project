import React, { useState } from "react";
import "./cardForm.css";
import logo from "./images/Group 2.png";
import CreditCard from "./creditCard";

function CardForm() {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      cardHolderName.trim().length === 0 ||
      cardNumber.trim().length === 0 ||
      cvc.trim().length === 0 ||
      (cvc.length > 0 && !/^\d+$/.test(cvc))
    ) {
      setError(true);
      return;
    }

    setSuccessMessage("details submitted successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);

    if (cardHolderName && cardNumber && expiryDate && expiryMonth && cvc) {
      console.log(
        "Cardholder Name:",
        cardHolderName,
        "Card Number:",
        cardNumber,
        "Expiry Date:",
        expiryDate,
        "Expiry Month:",
        expiryMonth,
        "CVC:",
        cvc
      );
      setSubmitted(true);
    }
  };

  const handleCardNumberChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "");
    setCardNumber(numericInput);
  };

  return (
    <div className="compo">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <p className="cardholder">CARDHOLDER NAME</p>
            <input
              placeholder="e.g. Jane Appleseed"
              onChange={(e) => setCardHolderName(e.target.value)}
              className="cards"
              id="Cname"
            />
            {error && cardHolderName.length === 0 ? (
              <label>Name can't be empty</label>
            ) : null}
          </div>

          <div>
            <p className="cardholder">CARD NUMBER</p>
            <input
              placeholder="eg 1234 5678 9123 0000"
              maxLength={19}
              onChange={handleCardNumberChange}
              value={cardNumber
                .replace(/\s/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim()}
              className="cards"
              id="Cno"
            />
            {error && cardNumber.length === 0 ? (
              <label>Card number required</label>
            ) : null}
          </div>

          <section id="date">
            <div>
              <p>EXP.DATE</p>
              <input
                placeholder="MM"
                maxLength={2}
                onChange={(e) => setExpiryDate(e.target.value)}
                // required
                className="my"
                id="Cdate"
              />
                {error && expiryDate.length === 0 ? (
              <label className="Cdate_label">Expiry Date required</label>
            ) : null}
            </div>
            <div>
              <p> (MM/YY)</p>
              <input
                placeholder="YY"
                maxLength={2}
                onChange={(e) => setExpiryMonth(e.target.value)}
                // required
                className="my"
                id="Cyear"
              />
                 {error && expiryMonth.length === 0 ? (
              <label className="Cyear_label">expiry Month required</label>
            ) : null}
            </div>

            <div>
              <p className="cvv">CVC</p>
              <input
                placeholder="e.g. 123"
                maxLength={3}
                onChange={(e) => setCvc(e.target.value)}
                id="cvc"
              />
              {error && cvc.length === 0 ? (
                <label className="cvc_cond">CVC must be  numeric</label>
              ) : null}
              {error && cvc.length > 0 && !/^\d+$/.test(cvc) ? (
                <label className="cvc_error_label">CVC must be numeric</label>
              ) : null}
            </div>
          </section>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          <button className="sub">Confirm</button>
        </form>
      </div>

      {submitted && (
        <CreditCard
          cardHolderName={cardHolderName}
          cardNumber={cardNumber}
          expiryDate={expiryDate}
          expiryMonth={expiryMonth}
          cvc={cvc}
        />
      )}
    </div>
  );
}

export default CardForm;