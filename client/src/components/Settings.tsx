import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { closeSettings } from "../redux/modalSlice";
import { IoCloseSharp } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
import { toggleTheme } from "../redux/themeSlice";
const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();

  function closeModal() {
    dispatch(closeSettings());
  }

  const isDarkMode = useSelector((storeState: RootState) => storeState.theme.isDarkMode);

  return (
    <div className="settings p-3">
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">Settings</p>
        <button onClick={closeModal}>
          <IoCloseSharp className="text-2xl" />
        </button>
      </div>

      <div className="pt-3 flex flex-col gap-5">
        <div className="flex items-center gap-3 text-lg">
          <RxAvatar className="text-3xl" />
          <p>My Profile</p>
        </div>

        <div
          className="flex items-center gap-3 text-lg"
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {isDarkMode ? <CiLight className="text-3xl" /> : <MdOutlineDarkMode className="text-3xl" />}

          <p>Theme </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
