import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { UserProfile } from './Model/ProfileModel'
import ContactCard from './components/Contactcard/ContactCards';
 
  const Obj=new UserProfile()
  Obj.email="abc@gmail.com";
  Obj.initials="A";
  Obj.displayname="ABC Name";
  Obj.department="IT Industry";
  Obj.imageSrc="";
  Obj.location="Chennai";
  Obj.phoneNo="123456789";
  Obj.role="Okay";
  ReactDOM.render(<ContactCard  User={Obj}/>, document.getElementById('root'));
 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
