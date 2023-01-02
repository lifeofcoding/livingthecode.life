import Link from "next/link";

type NavbarT = { path: string };

const Navbar = ({ path }: NavbarT) => {
  return (
    <nav className="navbar sticky top-0 z-20">
      <div className="container m-auto">
        <div className="flex w-full">
          <div className="m-2 flex items-center text-white">
            <span>LivingTheCode.Life</span>
          </div>
          <div className="desktop-menu hidden w-full md:block">
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

            <div className="nav-wrapper">
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
          <div className="mobile-menu flex w-full justify-end md:hidden">
            <button className="m-2 rounded">Menu</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
