import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../reducer/authSlice";
import bgimage from "../assests/memo-image.jpg";

export default function Navbar() {
  const auth = useSelector((state) => state.auth.auth);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="bg-[#2b2d42] py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link to="/">
            <span className="navbar-logo text-2xl font-bold text-white">
              Memoverse
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {/* <img className="w-10 h-10 rounded-full" src={bgimage} alt="" /> */}
              <span className="text-white text-lg"> {username}</span>
            </div>

            <div className="flex items-center space-x-8">
              {!auth ? (
                <Link to="/signin">
                  <button 
                  className="bg-primary border  border-blue-500 text-blue-500 hover:bg-blue-500  px-4 py-2 rounded-md text-sm hover:text-white transition">
                    Sign in
                  </button>
                </Link>
              ) : (
                <button
                  className="bg-primary border  border-blue-500 text-blue-500 hover:bg-blue-500 px-4 py-2 rounded-md text-sm hover:text-white transition"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
