import './App.css';
import React from 'react';




function App() {
  // state variables
  
  const [register, setIsRegistered] = React.useState(false);
  const [loggedIn, setIsLoggedIn] = React.useState(false);
  const [userName, setUsername] = React.useState('');
  const [toUserName, setToUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [payment, setPayment] = React.useState(''); //
  const [payments, setPayments] = React.useState([]); // all Payments
  const [type, setType] = React.useState('');
  const [note, setNote] = React.useState('');
  

  function getPayments(){
    fetch('/getPayments')
    .then(res => res.json()) // built in json to js
    .then((data) => {
      console.log(data);
      setPayments(data);
    }) 
    .catch(error => console.log(error));
  }
  
  const loginClick = () =>{
    console.log("User has clicked login button.");
    setIsLoggedIn(true);
    getPayments();
  };

  const registerClick = () =>{
    console.log("User has clicked register button.");
    setIsRegistered(true);
    
  };

  function submitPayment(){

    console.log(payment);
    const body = {
      userName : userName,
      payment: payment, //
      toUserName: toUserName,
      type: type,
      note: note,

    };
    const settings = {
      method: 'post',
      body: JSON.stringify(body),
    }
    fetch('/submitPayment', settings) // makes http request to back end
      .then(() => getPayments())
      .then(() => setPayment(''))
      //.then(() => setToUsername(''))
      .catch(error => console.log(error));
  }
  
  
  if(!register){
    return(
      <div>
      <div  class = "banner"><span class = "payment-app-title">Payment App</span></div>

      <div class = "login-grid">
                <header  class = "site-header">Register</header>
 
                <label id = "login-label" class = "username">Username: </label>
                <input value={userName} onChange={(event)=>setUsername(event.target.value)} type = "text" id = "login-input" class = "username-content" name = "username" required/>
           
                <label id ="login-label" class = "password">Password: </label>
                <input value={password} onChange={(event)=>setPassword(event.target.value)} type = "password" id = "login-input"class = "password-content" name = "password" required/>
  
      </div>
      {/* <button class = "login-button" onClick={loginClick}>Login</button> */}
      <button id = "register-button" onClick={registerClick}>Register</button>

    </div>
    );
  }
  if(!loggedIn) {
    
    return(
      <div>
      <div  class = "banner"><span class = "payment-app-title">Payment App</span></div>

      <div class = "login-grid">
                <header  class = "site-header">Login </header>
 
                <label id = "login-label" class = "username">Username: </label>
                <input value={userName} onChange={(event)=>setUsername(event.target.value)} type = "text" id = "login-input" class = "username-content" name = "username" required/>
           
                <label id ="login-label" class = "password">Password: </label>
                <input value={password} onChange={(event)=>setPassword(event.target.value)} type = "password" id = "login-input"class = "password-content" name = "password" required/>
  
      </div>
      <button class = "login-button" onClick={loginClick}>Login</button>
      {/* <button id = "register-button" onClick={registerClick}>Register</button> */}

    </div>
    );
  }

  return (
    
    <div>
      <div  class = "banner"><span class = "payment-app-title">Payment App</span></div>
      <h1>Welcome {userName}!</h1>
    <div id = "make-payment-float">
      <div id = "make-payment">
        <div class = "make-payment-div"><strong>Amount:</strong></div>
        
        <textarea
          class = "make-payment-textarea" 
          value={payment}
          onChange={(event) => setPayment(event.target.value)}
        />
       
        <div class = "make-payment-div"><strong>Pay to:</strong></div>
        <textarea
          class = "make-payment-textarea" 
          value={toUserName}
          onChange={(event) => setToUsername(event.target.value)}
        />

        <div class = "make-payment-div"><strong>Payment Type:</strong></div>
        <textarea 
          class = "make-payment-textarea"
          value={type}
          onChange={(event) => setType(event.target.value)}
        />
        <div class = "make-payment-div"><strong>Note:</strong></div>
        <textarea 
          id = "note"
          class = "make-payment-textarea"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />

      </div>
      <button onClick={submitPayment}>Make Payment</button>
    </div>

    <header id = "all-payments-header">All Payments</header>
      <div id = "all-payments-feed">
      
      <div id = "overflow">
        {payments.map(m => {
          return (
            <div id = "payment">
              
              <div id = "from"><strong>From:</strong> {m.userName}</div>
              <br />
              <div id = "amount"><strong>Amount:</strong> ${m.payment}</div>
              <br />
              <div id = "to"><strong>To:</strong> {m.toUserName}</div>
              <br />
              <div id = "type"><strong>Payment Type:</strong> {m.type}</div>
              <br />
              <div id = "note"><strong>Note:</strong> {m.note}</div>
              
            </div>
          );
        })}

      </div>
        
      </div>

    </div>
    
  );
}

export default App;

