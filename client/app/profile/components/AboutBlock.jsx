import InfoBlock from "./InfoBlock";

export default function AboutBlock({ user, setUser, token }) {
  const updateField = async (field, value) => {
    try {
      const res = await fetch("http://localhost:8080/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });
      const data = await res.json();
      setUser((prev) => ({ ...prev, [field]: data[field] }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white/10 border border-white/20 p-8 rounded-2xl space-y-4">
      <h2 className="text-2xl font-semibold">About You</h2>
      <div className="space-y-4">
        <InfoBlock
          label="Name"
          value={user.name}
          onSave={(v) => updateField("name", v)}
        />
        <InfoBlock
          label="Username"
          value={user.username}
          onSave={(v) => updateField("username", v)}
        />
        <InfoBlock
          label="Bio"
          value={user.bio}
          textarea
          onSave={(v) => updateField("bio", v)}
        />
      </div>
    </div>
  );
}
