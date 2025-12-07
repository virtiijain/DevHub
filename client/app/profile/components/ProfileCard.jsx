export default function ProfileCard({ user }) {
  return (
    <div className="bg-white/10 border border-white/20 p-6 rounded-2xl flex flex-col items-center">
      <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold text-white">
        {user.username[0]?.toUpperCase() || ""}
      </div>
      <h2 className="mt-4 font-semibold text-lg">
        {user.name || user.username}
      </h2>
      <p className="text-white/80 text-sm text-center mt-1">
        {user.bio || "No bio added yet."}
      </p>
    </div>
  );
}
