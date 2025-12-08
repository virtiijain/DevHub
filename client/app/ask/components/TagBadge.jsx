export default function TagBadge({ tag }) {
  return (
    <span className="px-3 py-1 bg-gradient-to-tr from-[#0178FF] to-[#00CFFF] rounded-full text-xs font-medium text-white transition hover:scale-105">
      {tag}
    </span>
  );
}
