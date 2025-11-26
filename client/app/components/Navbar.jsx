import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-8 px-8">
      <h1 className="text-2xl uppercase tracking-wide font-bold">DevHub</h1>
      <div className="flex space-x-6 text-base">
        <Link href="/">Home</Link>
        <Link href="/build-in-public">Build in Public</Link> 
        <Link href="/ask">Ask a Dev</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </nav>
  );
}