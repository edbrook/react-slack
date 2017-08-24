import React from 'react';

function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={"avatar for " + props.user.name}/>
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user}/>
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

function FormatDate(props) {
  const date = props.date;
  const dd = date.getDate();
  const mm = date.getMonth();
  const yyyy = date.getFullYear();
  return <span>{dd}/{mm}/{yyyy}</span>;
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author}/>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        <FormatDate date={props.date}/>
      </div>
    </div>
  );
}

export default Comment;