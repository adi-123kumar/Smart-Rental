import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import { motion } from "framer-motion";

import {
  FaHeart,
  FaMousePointer,
  FaPlus,
  FaUserEdit,
  FaLock,
  FaHome,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

function Dashboard() {
  const { user, favorites, logout } =
    useAuth();

  const interactions =
    JSON.parse(
      localStorage.getItem(
        "interactions"
      )
    ) || [];

  const stats = [
    {
      title:
        "Favorite Properties",
      value: favorites.length,
      icon: <FaHeart />,
      color:
        "from-pink-500 to-red-500",
    },

    {
      title:
        "Interactions",
      value:
        interactions.length,
      icon: <FaMousePointer />,
      color:
        "from-blue-500 to-cyan-500",
    },
  ];

  const actions = [
    {
      title:
        "Favorites",
      icon: <FaHeart />,
      link: "/favorites",
      color:
        "from-pink-500 to-red-500",
    },

    {
      title:
        "Browse",
      icon: <FaHome />,
      link: "/",
      color:
        "from-blue-500 to-indigo-500",
    },

    {
      title:
        "Add Property",
      icon: <FaPlus />,
      link: "/add-property",
      color:
        "from-green-500 to-emerald-500",
    },

    {
      title:
        "Profile",
      icon: <FaUserCircle />,
      link: "/profile",
      color:
        "from-purple-500 to-fuchsia-500",
    },

    {
      title:
        "Edit Profile",
      icon: <FaUserEdit />,
      link: "/edit-profile",
      color:
        "from-cyan-500 to-blue-500",
    },

    {
      title:
        "Change Password",
      icon: <FaLock />,
      link: "/change-password",
      color:
        "from-orange-500 to-amber-500",
    },
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        min-h-screen
        bg-slate-100
        relative
        overflow-hidden
        p-6
      "
    >
      {/* Background Effects */}

      <div
        className="
          absolute
          top-0
          left-0
          w-96
          h-96
          bg-blue-500/10
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-96
          h-96
          bg-purple-500/10
          rounded-full
          blur-3xl
        "
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HERO */}

        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          className="
            bg-gradient-to-r
            from-blue-600
            via-indigo-600
            to-purple-600
            text-white
            rounded-3xl
            p-8
            shadow-2xl
            mb-8
          "
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <div>

              <h1 className="text-4xl font-bold mb-2">
                Welcome Back,
                {" "}
                {user?.name}
                👋
              </h1>

              <p className="text-blue-100">
                Manage properties,
                bookings and
                favorites from
                one place.
              </p>

            </div>

            <img
              src={
                user?.profileImage ||
                `https://ui-avatars.com/api/?name=${user?.name}`
              }
              alt=""
              className="
                w-24
                h-24
                rounded-full
                object-cover
                border-4
                border-white
                shadow-xl
              "
            />

          </div>
        </motion.div>

        {/* PROFILE */}

        <motion.div
          whileHover={{
            y: -5,
          }}
          className="
            bg-white/70
            backdrop-blur-xl
            rounded-3xl
            p-6
            shadow-xl
            mb-8
          "
        >
          <h2 className="text-2xl font-bold mb-4">
            Profile Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <p className="text-gray-500">
                Full Name
              </p>

              <p className="font-semibold text-lg">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Email
              </p>

              <p className="font-semibold text-lg">
                {user?.email}
              </p>
            </div>

          </div>
        </motion.div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {stats.map(
            (
              stat,
              index
            ) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className={`
                  bg-gradient-to-r
                  ${stat.color}
                  text-white
                  rounded-3xl
                  p-6
                  shadow-xl
                `}
              >
                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-white/80">
                      {stat.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {stat.value}
                    </h2>

                  </div>

                  <div className="text-5xl opacity-80">
                    {stat.icon}
                  </div>

                </div>
              </motion.div>
            )
          )}

        </div>

        {/* QUICK ACTIONS */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {actions.map(
              (
                action,
                index
              ) => (
                <Link
                  key={index}
                  to={
                    action.link
                  }
                >
                  <motion.div
                    whileHover={{
                      y: -8,
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className={`
                      bg-gradient-to-r
                      ${action.color}
                      text-white
                      rounded-3xl
                      p-6
                      shadow-xl
                      cursor-pointer
                    `}
                  >
                    <div className="text-4xl mb-4">
                      {
                        action.icon
                      }
                    </div>

                    <h3 className="text-xl font-bold">
                      {
                        action.title
                      }
                    </h3>

                  </motion.div>
                </Link>
              )
            )}

          </div>

        </div>

        {/* ACTIVITY */}

        <motion.div
          whileHover={{
            y: -5,
          }}
          className="
            bg-white
            rounded-3xl
            shadow-xl
            p-6
            mb-8
          "
        >
          <h2 className="text-2xl font-bold mb-5">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="flex gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500 mt-2" />
              <p>
                Viewed
                {" "}
                {
                  interactions.length
                }
                {" "}
                properties recently.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="w-3 h-3 rounded-full bg-pink-500 mt-2" />
              <p>
                Saved
                {" "}
                {
                  favorites.length
                }
                {" "}
                favorite properties.
              </p>
            </div>

          </div>
        </motion.div>

        {/* LOGOUT */}

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={logout}
          className="
            flex
            items-center
            gap-3
            bg-red-600
            hover:bg-red-700
            text-white
            px-8
            py-4
            rounded-2xl
            shadow-xl
          "
        >
          <FaSignOutAlt />
          Logout
        </motion.button>

      </div>
    </motion.div>
  );
}

export default Dashboard;