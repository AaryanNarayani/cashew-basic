import { Link } from "react-router-dom";
import githubLogo from "../assets/github.svg";
import ThemeToggler from "./ThemeToggler";
const Navbar = () => {
  return (
    <div>
      <header className="fixed hover:shadow-primary/60 dark:bg-primary-700  bg-background text-foreground inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
              <a aria-current="page" className="flex items-center" href="https://github.com/AaryanNarayani">
                <img
                  className="h-8 w-auto"
                  src={githubLogo}
                  alt="Aaryan Narayani"
                />
                <p className="sr-only">Cashew</p>
              </a>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center">
              <a
                className="inline-block ml-16 rounded-lg px-2 py-1 text-sm font-medium text-foreground transition-all duration-200 hover:bg-foreground hover:text-gray-900"
                href="#"
              >
                Cashew-basic 
              </a>
            </div>
            <div className="flex items-center justify-end gap-3">
                <ThemeToggler></ThemeToggler>
              <Link to={'/signup'}>
              <button
                className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                >
                Sign up
              </button>
              </Link>
              <Link to={'/signin'}>
              <button
                className="inline-flex items-center justify-center rounded-xl bg-primary-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                Login
              </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Navbar;

