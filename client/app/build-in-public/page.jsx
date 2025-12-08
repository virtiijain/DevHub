// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import io from "socket.io-client";
// import { FaRegHeart, FaHeart, FaComment } from "react-icons/fa";
// import { toast } from "react-toastify";

// let socket;

// export default function BuildInPublic() {
//   const [posts, setPosts] = useState([]);
//   const [filterTag, setFilterTag] = useState("all");
//   const [filterType, setFilterType] = useState("all");
//   const [isComposeOpen, setIsComposeOpen] = useState(false);
//   const [composeText, setComposeText] = useState("");
//   const [composeProject, setComposeProject] = useState("");
//   const [composeType, setComposeType] = useState("update");
//   const [composeTags, setComposeTags] = useState("");
//   const [commentInput, setCommentInput] = useState({});
//   const [openComments, setOpenComments] = useState({});
//   const [token, setToken] = useState(null);

//   function timeAgo(date) {
//     const now = new Date();
//     const past = new Date(date);
//     const diff = now - past;

//     const seconds = Math.floor(diff / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const months = Math.floor(days / 30);
//     const years = Math.floor(days / 365);

//     if (seconds < 60) return `${seconds} sec ago`;
//     if (minutes < 60) return `${minutes} min ago`;
//     if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//     if (days === 1) return "yesterday";
//     if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
//     if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
//     return `${years} year${years > 1 ? "s" : ""} ago`;
//   }

//   function normalizeComment(c) {
//     if (!c)
//       return {
//         _id: Math.random().toString(36).slice(2),
//         text: "",
//         user: { username: "User" },
//       };

//     if (c.user && typeof c.user === "object" && c.user.username) return c;
//     if (c.user && typeof c.user === "string")
//       return { ...c, user: { username: c.user } };
//     if (c.username && typeof c.username === "string")
//       return { ...c, user: { username: c.username } };

//     return { ...c, user: { username: "User" } };
//   }

//   function normalizePost(p) {
//     if (!p) return null;
//     const safeTags = Array.isArray(p.tags) ? p.tags : [];
//     const safeComments = Array.isArray(p.comments)
//       ? p.comments.map(normalizeComment)
//       : [];

//     let postUser = { username: "Unknown User" };
//     if (p.user && typeof p.user === "object" && p.user.username)
//       postUser = p.user;
//     else if (p.user && typeof p.user === "string")
//       postUser = { username: p.user };
//     else if (p.username) postUser = { username: p.username };

//     const likes = Array.isArray(p.likes) ? p.likes : [];

//     return {
//       ...p,
//       user: postUser,
//       tags: safeTags,
//       comments: safeComments,
//       likes,
//     };
//   }

//   function normalizePostsArray(arr) {
//     if (!Array.isArray(arr)) return [];
//     return arr.map(normalizePost).filter(Boolean);
//   }

//   useEffect(() => {
//     if (typeof window !== "undefined") setToken(localStorage.getItem("token"));
//   }, []);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     socket = io("http://localhost:8080");

//     socket.on("newPost", (post) =>
//       setPosts((prev) => [normalizePost(post), ...prev])
//     );
//     socket.on("updatePost", (updatedPost) => {
//       const up = normalizePost(updatedPost);
//       setPosts((prev) => prev.map((p) => (p._id === up._id ? up : p)));
//     });

//     socket.on("newComment", ({ postId, comment }) => {
//       const nc = normalizeComment(comment);
//       setPosts((prev) =>
//         prev.map((p) =>
//           p._id === postId ? { ...p, comments: [...p.comments, nc] } : p
//         )
//       );
//     });

//     socket.on("updateLike", ({ postId, likes }) => {
//       setPosts((prev) =>
//         prev.map((p) =>
//           p._id === postId
//             ? { ...p, likes: Array.isArray(likes) ? likes : [] }
//             : p
//         )
//       );
//     });

//     return () => socket.disconnect();
//   }, []);

//   useEffect(() => {
//     async function fetchPosts() {
//       try {
//         const { data } = await axios.get("http://localhost:8080/api/posts");
//         setPosts(normalizePostsArray(data));
//       } catch (err) {
//         console.error("fetchPosts error:", err);
//       }
//     }
//     fetchPosts();
//   }, []);

//   const tags = useMemo(() => {
//     const s = new Set();
//     posts.forEach((p) =>
//       Array.isArray(p.tags) ? p.tags.forEach((t) => s.add(t)) : null
//     );
//     return ["all", ...Array.from(s)];
//   }, [posts]);

//   const filtered = posts.filter((p) => {
//     if (!p) return false;
//     if (filterTag !== "all" && !p.tags.includes(filterTag)) return false;
//     if (filterType !== "all" && p.type !== filterType) return false;
//     return true;
//   });

//   async function handleLike(postId) {
//     if (!token) return toast.error("You must be logged in to like a post!");
//     try {
//       await axios.post(
//         `http://localhost:8080/api/posts/${postId}/like`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to like the post.");
//     }
//   }

//   async function handleComment(postId) {
//     if (!token) return toast.error("You must be logged in to comment!");
//     const text = commentInput[postId];
//     if (!text?.trim()) return toast.warn("Comment cannot be empty!");

//     try {
//       const { data } = await axios.post(
//         `http://localhost:8080/api/posts/${postId}/comment`,
//         { text },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const normalized = normalizeComment(data);
//       socket.emit("newComment", { postId, comment: normalized });

//       setPosts((prev) =>
//         prev.map((p) =>
//           p._id === postId ? { ...p, comments: [...p.comments, normalized] } : p
//         )
//       );
//       setCommentInput((prev) => ({ ...prev, [postId]: "" }));
//       toast.success("Comment added!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to add comment.");
//     }
//   }

//   async function handleComposeSubmit() {
//     if (!token) return toast.error("You must be logged in to post!");
//     if (!composeText.trim()) return toast.warn("Post text cannot be empty!");
//     try {
//       await axios.post(
//         "http://localhost:8080/api/posts",
//         {
//           text: composeText,
//           project: composeProject,
//           type: composeType,
//           tags: composeTags
//             .split(",")
//             .map((t) => t.trim())
//             .filter(Boolean),
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setComposeText("");
//       setComposeProject("");
//       setComposeType("update");
//       setComposeTags("");
//       setIsComposeOpen(false);
//       toast.success("Post created successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to create post.");
//     }
//   }

//   return (
//     <div className="min-h-screen p-6 md:p-10">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <aside className="lg:col-span-1">
//           <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
//             <h2 className="font-semibold text-lg">Build in Public</h2>
//             <p className="text-sm text-white/80 mt-1">
//               Live feed — share micro-updates, wins, and blockers.
//             </p>

//             <div className="mt-4 space-y-3">
//               <div>
//                 <label className="text-xs text-white/80">Filter by tag</label>
//                 <select
//                   value={filterTag}
//                   onChange={(e) => setFilterTag(e.target.value)}
//                   className="w-full mt-2 p-2 rounded-lg bg-white/5 border border-white/10 text-white"
//                 >
//                   {tags.map((t) => (
//                     <option key={t} value={t} className="text-black">
//                       {t}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="text-xs text-white/80">Type</label>
//                 <div className="mt-2 flex gap-2">
//                   {[
//                     { key: "all", label: "All" },
//                     { key: "update", label: "Update" },
//                     { key: "win", label: "Win" },
//                     { key: "challenge", label: "Challenge" },
//                   ].map((t) => (
//                     <button
//                       key={t.key}
//                       onClick={() => setFilterType(t.key)}
//                       className={`px-3 py-1 rounded-xl text-sm ${
//                         filterType === t.key
//                           ? "bg-white text-black"
//                           : "bg-white/5"
//                       }`}
//                     >
//                       {t.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={() => setIsComposeOpen(true)}
//                 className="w-full mt-2 px-4 py-2 rounded-xl bg-white text-black font-semibold"
//               >
//                 + Post an update
//               </button>
//             </div>
//           </div>
//         </aside>

//         <main className="lg:col-span-2 space-y-4">
//           <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 flex justify-between">
//             <h2 className="font-semibold text-lg">Global Feed</h2>
//             <div className="text-sm text-white/80">{posts.length} updates</div>
//           </div>

//           <div className="space-y-4">
//             <AnimatePresence initial={false}>
//               {filtered.map((p) => (
//                 <motion.article
//                   key={p._id}
//                   layout
//                   initial={{ opacity: 0, y: 12 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 8 }}
//                   transition={{ duration: 0.18 }}
//                   className="relative overflow-hidden rounded-2xl p-5 bg-white/10 border border-white/20"
//                 >
//                   <header className="flex items-start justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">
//                         {p?.user?.username?.[0] || "U"}
//                       </div>
//                       <div>
//                         <div className="font-semibold">
//                           {p?.user?.username || "Unknown User"}
//                         </div>
//                         <div className="flex flex-wrap items-center gap-2 text-xs text-white/70 mt-1">
//                           {p?.createdAt && (
//                             <span className="after:content-['•'] after:mx-1">
//                               {timeAgo(p.createdAt)}
//                             </span>
//                           )}
//                           <span>
//                             Project:
//                             {p?.project ? (
//                               <a
//                                 href={p.project}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="ml-1 underline text-white/80 hover:text-white transition-colors"
//                               >
//                                 {p.project}
//                               </a>
//                             ) : (
//                               <span className="ml-1 text-white/50">
//                                 No project
//                               </span>
//                             )}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => handleLike(p._id)}
//                         className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm flex items-center gap-1"
//                       >
//                         {p.likes?.includes(token) ? (
//                           <FaHeart className="text-red-500" />
//                         ) : (
//                           <FaRegHeart />
//                         )}
//                         {p.likes?.length || 0}
//                       </button>

//                       <button
//                         onClick={() =>
//                           setOpenComments((prev) => ({
//                             ...prev,
//                             [p._id]: !prev[p._id],
//                           }))
//                         }
//                         className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm flex items-center gap-1"
//                       >
//                         <FaComment /> {p.comments?.length || 0}
//                       </button>
//                     </div>
//                   </header>

//                   <p className="mt-3 text-sm leading-relaxed">{p?.text}</p>

//                   <div className="mt-4 flex items-center gap-2 flex-wrap">
//                     {p.tags?.map((t) => (
//                       <span
//                         key={t}
//                         className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10"
//                       >
//                         #{t}
//                       </span>
//                     ))}
//                   </div>

//                   {openComments[p._id] && (
//                     <div className="mt-3">
//                       <input
//                         type="text"
//                         value={commentInput[p._id] || ""}
//                         onChange={(e) =>
//                           setCommentInput((prev) => ({
//                             ...prev,
//                             [p._id]: e.target.value,
//                           }))
//                         }
//                         placeholder="Add a comment..."
//                         className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/60"
//                       />
//                       <button
//                         onClick={() => handleComment(p._id)}
//                         className="mt-1 px-3 py-1 rounded-xl bg-white text-black text-sm"
//                       >
//                         Comment
//                       </button>

//                       <div className="mt-4 pt-4 border-t border-white/20">
//                         {p.comments.map((c) => (
//                           <div
//                             key={c._id || Math.random()}
//                             className="flex items-start gap-3 mt-3"
//                           >
//                             {/* Avatar */}
//                             <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-semibold text-sm">
//                               {c?.user?.username?.[0] || "U"}
//                             </div>

//                             {/* Comment Content */}
//                             <div className="flex-1">
//                               <div className="flex items-center justify-between">
//                                 <span className="text-xs font-semibold text-white">
//                                   {c?.user?.username || "User"}
//                                 </span>
//                                 <span className="text-[10px] text-white/60">
//                                   {c?.createdAt ? timeAgo(c.createdAt) : ""}
//                                 </span>
//                               </div>
//                               <p className="text-sm text-white/90 mt-1">
//                                 {c?.text}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </motion.article>
//               ))}
//             </AnimatePresence>

//             {filtered.length === 0 && (
//               <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-white/80">
//                 No updates match this filter.
//               </div>
//             )}
//           </div>
//         </main>
//       </div>

//       <AnimatePresence>
//         {isComposeOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-6"
//           >
//             <div
//               className="absolute inset-0 bg-black/50"
//               onClick={() => setIsComposeOpen(false)}
//             />
//             <motion.div
//               initial={{ y: 20, scale: 0.98 }}
//               animate={{ y: 0, scale: 1 }}
//               exit={{ y: 8, scale: 0.98 }}
//               className="relative max-w-2xl w-full bg-white/10 border border-white/20 backdrop-blur rounded-2xl p-6 z-10"
//             >
//               <h3 className="font-semibold text-lg">Post an update</h3>
//               <textarea
//                 value={composeText}
//                 onChange={(e) => setComposeText(e.target.value)}
//                 rows={4}
//                 placeholder="What did you do today? Keep it short and useful."
//                 className="w-full mt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/60"
//               />
//               <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <input
//                   value={composeProject}
//                   onChange={(e) => setComposeProject(e.target.value)}
//                   placeholder="Repo or project link"
//                   className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
//                 />
//                 <select
//                   value={composeType}
//                   onChange={(e) => setComposeType(e.target.value)}
//                   className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
//                 >
//                   <option value="update">Update</option>
//                   <option value="win">Win</option>
//                   <option value="challenge">Challenge</option>
//                 </select>
//               </div>
//               <input
//                 value={composeTags}
//                 onChange={(e) => setComposeTags(e.target.value)}
//                 placeholder="Tags (comma separated)"
//                 className="w-full mt-3 p-2 rounded-lg bg-white/5 border border-white/10 text-white"
//               />
//               <div className="mt-4 flex items-center justify-end gap-3">
//                 <button
//                   onClick={() => setIsComposeOpen(false)}
//                   className="px-4 py-2 rounded-xl bg-transparent border border-white/10"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleComposeSubmit}
//                   className="px-4 py-2 rounded-xl bg-white text-black font-semibold"
//                 >
//                   Post
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import io from "socket.io-client";
import { FaRegHeart, FaHeart, FaComment } from "react-icons/fa";
import { toast } from "react-toastify";

let socket;

export default function BuildInPublic() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE; // ← Use this for production
  const [posts, setPosts] = useState([]);
  const [filterTag, setFilterTag] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeText, setComposeText] = useState("");
  const [composeProject, setComposeProject] = useState("");
  const [composeType, setComposeType] = useState("update");
  const [composeTags, setComposeTags] = useState("");
  const [commentInput, setCommentInput] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [token, setToken] = useState(null);

  // ------------------- Helper functions -------------------
  function timeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diff = now - past;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `${seconds} sec ago`;
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days === 1) return "yesterday";
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

  function normalizeComment(c) {
    if (!c) return { _id: Math.random().toString(36).slice(2), text: "", user: { username: "User" } };
    if (c.user && typeof c.user === "object" && c.user.username) return c;
    if (c.user && typeof c.user === "string") return { ...c, user: { username: c.user } };
    if (c.username && typeof c.username === "string") return { ...c, user: { username: c.username } };
    return { ...c, user: { username: "User" } };
  }

  function normalizePost(p) {
    if (!p) return null;
    const safeTags = Array.isArray(p.tags) ? p.tags : [];
    const safeComments = Array.isArray(p.comments) ? p.comments.map(normalizeComment) : [];

    let postUser = { username: "Unknown User" };
    if (p.user && typeof p.user === "object" && p.user.username) postUser = p.user;
    else if (p.user && typeof p.user === "string") postUser = { username: p.user };
    else if (p.username) postUser = { username: p.username };

    const likes = Array.isArray(p.likes) ? p.likes : [];

    return { ...p, user: postUser, tags: safeTags, comments: safeComments, likes };
  }

  function normalizePostsArray(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map(normalizePost).filter(Boolean);
  }

  // ------------------- Token -------------------
  useEffect(() => {
    if (typeof window !== "undefined") setToken(localStorage.getItem("token"));
  }, []);

  // ------------------- Socket.io -------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    socket = io(API_BASE);

    socket.on("newPost", (post) => setPosts((prev) => [normalizePost(post), ...prev]));
    socket.on("updatePost", (updatedPost) => {
      const up = normalizePost(updatedPost);
      setPosts((prev) => prev.map((p) => (p._id === up._id ? up : p)));
    });

    socket.on("newComment", ({ postId, comment }) => {
      const nc = normalizeComment(comment);
      setPosts((prev) => prev.map((p) => (p._id === postId ? { ...p, comments: [...p.comments, nc] } : p)));
    });

    socket.on("updateLike", ({ postId, likes }) => {
      setPosts((prev) => prev.map((p) => (p._id === postId ? { ...p, likes: Array.isArray(likes) ? likes : [] } : p)));
    });

    return () => socket.disconnect();
  }, [API_BASE]);

  // ------------------- Fetch Posts -------------------
  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get(`${API_BASE}/api/posts`);
        setPosts(normalizePostsArray(data));
      } catch (err) {
        console.error("fetchPosts error:", err);
        toast.error("Failed to fetch posts!");
      }
    }
    fetchPosts();
  }, [API_BASE]);

  // ------------------- Filters -------------------
  const tags = useMemo(() => {
    const s = new Set();
    posts.forEach((p) => Array.isArray(p.tags) && p.tags.forEach((t) => s.add(t)));
    return ["all", ...Array.from(s)];
  }, [posts]);

  const filtered = posts.filter((p) => {
    if (!p) return false;
    if (filterTag !== "all" && !p.tags.includes(filterTag)) return false;
    if (filterType !== "all" && p.type !== filterType) return false;
    return true;
  });

  // ------------------- Handlers -------------------
  async function handleLike(postId) {
    if (!token) return toast.error("You must be logged in to like a post!");
    try {
      await axios.post(`${API_BASE}/api/posts/${postId}/like`, {}, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) {
      console.error(err);
      toast.error("Failed to like the post.");
    }
  }

  async function handleComment(postId) {
    if (!token) return toast.error("You must be logged in to comment!");
    const text = commentInput[postId];
    if (!text?.trim()) return toast.warn("Comment cannot be empty!");

    try {
      const { data } = await axios.post(`${API_BASE}/api/posts/${postId}/comment`, { text }, { headers: { Authorization: `Bearer ${token}` } });
      const normalized = normalizeComment(data);
      socket.emit("newComment", { postId, comment: normalized });

      setPosts((prev) => prev.map((p) => (p._id === postId ? { ...p, comments: [...p.comments, normalized] } : p)));
      setCommentInput((prev) => ({ ...prev, [postId]: "" }));
      toast.success("Comment added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment.");
    }
  }

  async function handleComposeSubmit() {
    if (!token) return toast.error("You must be logged in to post!");
    if (!composeText.trim()) return toast.warn("Post text cannot be empty!");

    try {
      await axios.post(
        `${API_BASE}/api/posts`,
        {
          text: composeText,
          project: composeProject,
          type: composeType,
          tags: composeTags.split(",").map((t) => t.trim()).filter(Boolean),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComposeText("");
      setComposeProject("");
      setComposeType("update");
      setComposeTags("");
      setIsComposeOpen(false);
      toast.success("Post created successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post.");
    }
  }

  // ------------------- Render -------------------
  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
            <h2 className="font-semibold text-lg">Build in Public</h2>
            <p className="text-sm text-white/80 mt-1">Live feed — share micro-updates, wins, and blockers.</p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-white/80">Filter by tag</label>
                <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="w-full mt-2 p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                  {tags.map((t) => <option key={t} value={t} className="text-black">{t}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs text-white/80">Type</label>
                <div className="mt-2 flex gap-2">
                  {["all", "update", "win", "challenge"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-3 py-1 rounded-xl text-sm ${filterType === type ? "bg-white text-black" : "bg-white/5"}`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => setIsComposeOpen(true)} className="w-full mt-2 px-4 py-2 rounded-xl bg-white text-black font-semibold">
                + Post an update
              </button>
            </div>
          </div>
        </aside>

        {/* Main feed */}
        <main className="lg:col-span-2 space-y-4">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 flex justify-between">
            <h2 className="font-semibold text-lg">Global Feed</h2>
            <div className="text-sm text-white/80">{posts.length} updates</div>
          </div>

          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {filtered.map((p) => (
                <motion.article key={p._id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }} className="relative overflow-hidden rounded-2xl p-5 bg-white/10 border border-white/20">
                  {/* Header */}
                  <header className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">{p?.user?.username?.[0] || "U"}</div>
                      <div>
                        <div className="font-semibold">{p?.user?.username || "Unknown User"}</div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-white/70 mt-1">
                          {p?.createdAt && <span className="after:content-['•'] after:mx-1">{timeAgo(p.createdAt)}</span>}
                          <span>
                            Project: {p?.project ? <a href={p.project} target="_blank" rel="noopener noreferrer" className="ml-1 underline text-white/80 hover:text-white transition-colors">{p.project}</a> : <span className="ml-1 text-white/50">No project</span>}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => handleLike(p._id)} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm flex items-center gap-1">
                        {p.likes?.includes(token) ? <FaHeart className="text-red-500" /> : <FaRegHeart />} {p.likes?.length || 0}
                      </button>

                      <button onClick={() => setOpenComments((prev) => ({ ...prev, [p._id]: !prev[p._id] }))} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm flex items-center gap-1">
                        <FaComment /> {p.comments?.length || 0}
                      </button>
                    </div>
                  </header>

                  <p className="mt-3 text-sm leading-relaxed">{p?.text}</p>
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    {p.tags?.map((t) => <span key={t} className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10">#{t}</span>)}
                  </div>

                  {openComments[p._id] && (
                    <div className="mt-3">
                      <input type="text" value={commentInput[p._id] || ""} onChange={(e) => setCommentInput((prev) => ({ ...prev, [p._id]: e.target.value }))} placeholder="Add a comment..." className="w-full p-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/60" />
                      <button onClick={() => handleComment(p._id)} className="mt-1 px-3 py-1 rounded-xl bg-white text-black text-sm">Comment</button>
                      <div className="mt-4 pt-4 border-t border-white/20">
                        {p.comments.map((c) => (
                          <div key={c._id || Math.random()} className="flex items-start gap-3 mt-3">
                            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center font-semibold text-sm">{c?.user?.username?.[0] || "U"}</div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-white">{c?.user?.username || "User"}</span>
                                <span className="text-[10px] text-white/60">{c?.createdAt ? timeAgo(c.createdAt) : ""}</span>
                              </div>
                              <p className="text-sm text-white/90 mt-1">{c?.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.article>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center text-white/80">No updates match this filter.</div>}
          </div>
        </main>
      </div>

      {/* Compose Modal */}
      <AnimatePresence>
        {isComposeOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsComposeOpen(false)} />
            <motion.div initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 8, scale: 0.98 }} className="relative max-w-2xl w-full bg-white/10 border border-white/20 backdrop-blur rounded-2xl p-6 z-10">
              <h3 className="font-semibold text-lg">Post an update</h3>
              <textarea value={composeText} onChange={(e) => setComposeText(e.target.value)} rows={4} placeholder="What did you do today? Keep it short and useful." className="w-full mt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/60" />
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input value={composeProject} onChange={(e) => setComposeProject(e.target.value)} placeholder="Repo or project link" className="p-2 rounded-lg bg-white/5 border border-white/10 text-white" />
                <select value={composeType} onChange={(e) => setComposeType(e.target.value)} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                  <option value="update">Update</option>
                  <option value="win">Win</option>
                  <option value="challenge">Challenge</option>
                </select>
              </div>
              <input value={composeTags} onChange={(e) => setComposeTags(e.target.value)} placeholder="Tags (comma separated)" className="w-full mt-3 p-2 rounded-lg bg-white/5 border border-white/10 text-white" />
              <div className="mt-4 flex items-center justify-end gap-3">
                <button onClick={() => setIsComposeOpen(false)} className="px-4 py-2 rounded-xl bg-transparent border border-white/10">Cancel</button>
                <button onClick={handleComposeSubmit} className="px-4 py-2 rounded-xl bg-white text-black font-semibold">Post</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
