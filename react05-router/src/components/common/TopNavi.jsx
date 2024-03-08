import React from "react";
import { NavLink } from 'react-router-dom';

const TopNavi = () => {
  return (
    <nav>
      <NavLink to='/'>HOME</NavLink>&nbsp;
      <NavLink to='/list'>게시판</NavLink>&nbsp;
      <NavLink to='/intro'>인트로</NavLink>&nbsp;
      <NavLink to='/intro/mas'>마스프로필</NavLink>&nbsp;
      <NavLink to='/intro/router'>Router 소개</NavLink>&nbsp;
      <NavLink to='/xyz'>잘못된URL</NavLink>&nbsp;
    </nav>
  );
};

export default TopNavi;