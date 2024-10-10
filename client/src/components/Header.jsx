import {
  Navbar,
  TextInput,
  Button,
  Dropdown,
  Avatar,
  DropdownDivider,
} from "flowbite-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import HealthMate from "../assets/images/HealthMate.png";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [isHovered, setIsHovered] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/medicines?search=${searchTerm}`); 
  };

  const [searchVisible, setSearchVisible] = useState(false);

  const handleButtonClick = () => {
    setSearchVisible(true);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };


  return (
    <Navbar className="border-b-2 top-0 py-4">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <div className="flex card">
          <img src={HealthMate} alt="" srcset="" className="w-16 ml-3"/>
          <h2 className="hidden lg:block mt-1">HealthMate</h2>
        </div>
      </Link>
      <form onSubmit={handleSearch}>
        <TextInput
          placeholder="Search"
          type="text"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <div
        className=""
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isHovered ? (
          <Button className="w-10 h-9 lg:hidden" color="gray" pill>
            <AiOutlineSearch />
          </Button>
        ) : (
            <form onSubmit={handleSearch}>
              <TextInput
                placeholder="Search"
                type="text"
                rightIcon={AiOutlineSearch}
                className=""
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
        )}
      </div>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User Avatar"
                img={currentUser.profilePicture}
                rounded 
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username} </span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}{" "}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"} >
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <DropdownDivider />
            <Link to={"/dashboard?tab=MyMedicine"} >
              <Dropdown.Item>MyMedicine</Dropdown.Item>
            </Link>
            <Dropdown.Item onClick={handleSignout} >Sign Out</Dropdown.Item>
            <DropdownDivider />
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/medicines"} as={"div"}>
          <Link to="/medicines">Medicines</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}




