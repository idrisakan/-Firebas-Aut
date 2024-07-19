import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth, emailVerification } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import UptadeteProfile from "../components/UptadeteProfile";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };
  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="max-w-2xl mx-auto py-5">
        <h1 className="flex items-center  gap-x-4">
          {user.photoURL && <img src={user.photoURL} className='w-7 h-7 rounded-full' />}
          Oturumun açık ({user.email})
          <button
            onClick={handleLogout}
            className="h-8 rounded px-4 bg-indigo-700 text-sm text-white "
          >
            Çıkış Yap
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="h-8 rounded px-4 bg-indigo-700 text-sm text-white "
            >
              E-posta onayla
            </button>
          )}
        </h1>
        <UptadeteProfile />
      </div>
    );
  }

  return (
    <div>
      <Link to="/register">Kayıt ol</Link>
      <Link to="/login">Giriş yap</Link>
    </div>
  );
}
