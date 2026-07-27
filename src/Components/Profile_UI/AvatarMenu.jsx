import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Edit2, X, Check, Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, fetchProfile } from "../../Redux/Features/authSlice";
import { updateProfile } from "../../Utils/authApi";
import toast from "react-hot-toast";

export default function AvatarMenu() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Sync state with user data
  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || "",
        bio: "",
      });
    }
  }, [user]);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setIsEditing(false); // reset edit mode
        setAvatarFile(null);
        setAvatarPreview(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logout());
      if (logout.fulfilled.match(resultAction)) {
         toast.success("Logged out successfully");
         navigate("/login");
      } else {
         toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      // Bio is not sent since backend doesn't support it (per instructions)
      
      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile);
      }

      await updateProfile(formDataToSend);
      await dispatch(fetchProfile());
      toast.success("Profile updated successfully");
      
      setIsEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    }
  };

  const currentAvatar = user?.avatar || "/assets/Avatar/avatar.jpg";
  const displayAvatar = avatarPreview || currentAvatar;

  return (
    <div className="relative" ref={ref}>
      
      {/* Small Navbar Avatar with neumorphic click effect */}
      <div
        onClick={() => {
          setOpen(!open);
          if (open) {
            setIsEditing(false);
            setAvatarFile(null);
            setAvatarPreview(null);
          }
        }}
        className={`
          p-1 rounded-full cursor-pointer transition-all duration-300
          ${open
            ? "shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] scale-95"
            : "shadow-none hover:scale-105"
          }
        `}
      >
        <img
          src={currentAvatar}
          alt="avatar"
          className="w-9 h-9 rounded-full border border-neutral-700 object-cover"
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 8 }}
            exit={{ opacity: 0, scale: 0.85, y: -5 }}
            transition={{ duration: 0.2 }}
            className="
              absolute 
              right-0 
              top-full 
              mt-3 
              w-80 
              origin-top-right
              rounded-xl 
              border border-neutral-800 
              bg-[#111] 
              z-50
              shadow-2xl
            "
          >
            <div className="flex flex-col p-4 gap-4 text-white">
              
              {/* Profile Header */}
              <div className="flex items-center gap-4 border-b border-neutral-800 pb-4 relative">
                
                <div className="relative group cursor-pointer" onClick={() => isEditing && fileInputRef.current.click()}>
                  <img
                    src={displayAvatar}
                    alt="avatar"
                    className={`w-14 h-14 rounded-full border border-neutral-700 object-cover transition-all ${isEditing ? 'opacity-50 group-hover:opacity-40' : ''}`}
                  />
                  {isEditing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-80 pointer-events-none">
                      <Camera size={20} className="text-white drop-shadow-md" />
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="flex-1 overflow-hidden">
                  <h3 className="font-bold text-lg truncate">{user?.username || "Username"}</h3>
                  <p className="text-xs text-neutral-400 truncate">India • English</p>
                </div>
                
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-white">
                    <Edit2 size={16} />
                  </button>
                )}
              </div>

              {/* Profile Details */}
              <div className="flex flex-col gap-3 text-sm">
                
                <div className="flex flex-col gap-1">
                  <label className="text-neutral-500 text-[11px] font-bold uppercase tracking-wider">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                  ) : (
                    <p className="font-medium text-[15px]">{user?.username || "Not set"}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-neutral-500 text-[11px] font-bold uppercase tracking-wider">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.fullname}
                      onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                      className="bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                  ) : (
                    <p className="font-medium text-[15px]">{user?.fullname || "Not set"}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-neutral-500 text-[11px] font-bold uppercase tracking-wider">Email (Private)</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-neutral-500 transition-colors"
                    />
                  ) : (
                    <p className="font-medium text-[15px]">{user?.email || "Not set"}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-neutral-500 text-[11px] font-bold uppercase tracking-wider">Bio (Optional)</label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      className="bg-neutral-900 border border-neutral-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-neutral-500 transition-colors resize-none h-16"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="font-medium text-[14px] italic text-neutral-400">Not set</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-1 bg-neutral-900/50 p-3 rounded-lg border border-neutral-800/50">
                  <div className="flex flex-col gap-1">
                    <label className="text-neutral-500 text-[11px] font-bold uppercase tracking-wider">Country</label>
                    <p className="font-medium text-neutral-300">India</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-neutral-500 text-[11px] font-bold uppercase tracking-wider">Language</label>
                    <p className="font-medium text-neutral-300">English</p>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="border-t border-neutral-800 pt-4 mt-2 flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-bold bg-white text-black hover:bg-neutral-200 transition-all"
                    >
                      <Check size={16} /> Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setAvatarFile(null);
                        setAvatarPreview(null);
                        // Reset form to current user values
                        setFormData({
                          fullname: user?.fullname || "",
                          username: user?.username || "",
                          email: user?.email || "",
                          bio: "",
                        });
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-white border border-neutral-700 hover:bg-neutral-800 transition-all"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-[14px] font-bold text-red-500 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}