import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t mt-16">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between">
        <h2 className="text-lg font-semibold">DevHub</h2>

        <div className="flex gap-6 mt-4 sm:mt-0 text-sm opacity-80">
          <Link href="/">Home</Link>
          <Link href="/build-in-public">Build in Public</Link>
          <Link href="/ask">Ask a Dev</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </div>

      <p className="text-center text-xs mt-6 opacity-50">
        {new Date().getFullYear()} DevHub. Built by devs, for devs.
      </p>
    </footer>
  );
}
