import Link from "next/link";
import { useState } from "react";

type NavbarT = { path: string };

const Navbar = ({ path }: NavbarT) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((curr) => !curr);
  };

  return (
    <nav className="navbar sticky top-0 z-20">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="m-2 flex items-center text-white">
          <span className="text-md font-semibold tracking-tight">
            LivingTheCode.Life
          </span>
        </div>

        <div className="inline-flex justify-end md:hidden">
          <button
            className="m-2 rounded bg-indigo-500 p-1"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="w-full flex-grow md:w-auto">
          <input
            type="radio"
            value="home"
            id="home"
            name="nav-link"
            checked={path === "/"}
          />
          <input
            type="radio"
            value="projects"
            id="projects"
            name="nav-link"
            checked={path === "/projects"}
          />
          <input
            type="radio"
            value="projects"
            id="about"
            name="nav-link"
            checked={path === "/about"}
          />

          <div className={menuOpen ? "nav-wrapper open" : "nav-wrapper"}>
            <div className="nav-item">
              <Link href="/">
                <label htmlFor="home">Home</label>
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/projects">
                <label htmlFor="projects">Projects</label>
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/about">
                <label htmlFor="about">About</label>
              </Link>
            </div>
            <div className="nav-slider"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
