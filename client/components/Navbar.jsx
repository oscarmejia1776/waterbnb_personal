import React, { createContext, useState } from "react";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import { TbWorld } from "react-icons/tb";
import { MdMenuOpen } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import DropDownLogin from "./DropDownLogin";
import Search from "./Search";

const Navbar = ({
  onSearchSuccess,
  theme,
  toggleTheme,
  onIconClick,
  onAbout,
  location,
  onLocationChange,
  date,
  onDateChange,
  groupSize,
  onGroupSizeChange,
  noResults,
  setNoResults,
  handleSearch,
  showModal,
  onModal,
  setShowModal,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  const handleSearchForm = () => {
    setShowForm(!showForm);
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        {/* left */}
        <div className="navbar-container">
          <img
            src={logo}
            alt="Logo"
            className="navbar-logo"
            onClick={onIconClick}
          />
          {/* middle */}
          <div className="navbar-links">
            <button className="button-text" onClick={handleSearchForm}>
              Anywhere
            </button>
            <button className="button-text" onClick={handleSearchForm}>
              Any Week
            </button>
            <button className="button-text" onClick={handleSearchForm}>
              Add guests
            </button>
            <span className="search-icon">
              <BiSearchAlt />
            </span>
          </div>
          <div className="profile">
            <p>
              {" "}
              {localStorage.getItem("username") != null
                ? "Hi, " + localStorage.getItem("username")
                : " "}{" "}
            </p>
            <button onClick={handleLogout}>
              {localStorage.getItem("username") ? "Logout" : <TbWorld />}
            </button>
            <div className="profile-item">
              <button
                className="relative flex items-center"
                onClick={handleButtonClick}
              >
                <MdMenuOpen className="mr-2" />
                <BsPersonCircle />
              </button>

              {open && (
                <DropDownLogin
                  theme={theme}
                  toggleTheme={toggleTheme}
                  onHandleButtonClick={handleButtonClick}
                  onAbout={onAbout}
                />
              )}
            </div>
          </div>
        </div>
        {/*right*/}
        {showForm && (
          <Search
            onSearchSuccess={onSearchSuccess}
            location={location}
            onLocationChange={onLocationChange}
            date={date}
            onDateChange={onDateChange}
            groupSize={groupSize}
            onGroupSizeChange={onGroupSizeChange}
            noResults={noResults}
            setNoResults={setNoResults}
            handleSearch={handleSearch}
            showModal={showModal}
            onModal={onModal}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;
