import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-6 px-6 border-t mt-13">
      <div className="max-w-6xl mx-auto flex flex-row justify-between items-center">
        <h2 className="text-lg font-semibold">DevHub</h2>
        <p className="text-xs opacity-50">
          {new Date().getFullYear()} DevHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
