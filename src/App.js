import React, { useEffect, useState } from 'react';
import './App.css';
import { useForm } from "react-hook-form";
import axios from 'axios';

function App() {

  let [toast, setToast] = useState('');
  let [popup, setPopup] = useState();
  let [messages, setMessages] = useState([]);
  let [search, setSearch] = useState('');
  const { handleSubmit, register, errors, reset } = useForm();

  const onSubmit = values => {
    axios.post(`http://localhost:3001/api/v1/message`, values)
      .then(res => {
        getMessages()
        reset();
        showToast('Message added successfully.')
      })
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() =>setToast(''), 2000);
  }

  useEffect(() => {
    getMessages()
  }, [])

  const getMessages = () => {
    axios.get(`http://localhost:3001/api/v1/message`)
      .then(res => {
        if (res?.data?.messages?.length) {
          console.log(res)
          setMessages(res.data.messages);
        }
      })
  }

  let messagesList = messages;

  if (search) {
    messagesList = messages.filter(msg => msg.email.includes(search));
  }

  let messagesElement = messagesList.length ? messagesList.map(message =>
    (
      <div className="message_list">
        <img onClick={()=> setPopup(message.email)} className="avatar" src={message.image}></img>
        <div className="message_data" >
          <h2>{message.email}</h2>
          <p>{message.text}</p>
        </div>
      </div>
    )
  ) : <h4>No Data Found</h4>;

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="email" placeholder="Email*" ref={register({ required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email address" }})} />
        {errors.email && errors.email.message}
        <input name="text" placeholder="Message*" ref={register({   required: "Message is Required", })} />
        {errors.text && errors.text.message}
        <button type="submit">Submit</button>
      </form>
      <input name="search" className="search_input" placeholder="Search" onChange={(e) => setSearch(e.target.value)}></input>
      <div className="message_container" id="containerDiv">
        {messagesElement}
      </div>

      {toast && <div className="toast"><p>{toast}</p></div>}
      {popup && <div className="popup_container" onClick={()=> setPopup('')}><div className="popup"><p>{popup}</p></div></div>}
    </div>
  );
}

export default App;
