interface SidebarProps {
  links: { label: string; href: string }[];
}

export const Sidebar = ({ links }: SidebarProps) => {
  return (
    <aside className="w-64 h-full bg-deep-brown text-white shadow-lg">
      <div className="p-4 font-bold text-xl">My App</div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {links.length > 0 ? (
            links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block px-4 py-2 rounded-md hover:bg-warm-brown"
                >
                  {link.label}
                </a>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400">No options available</li>
          )}
        </ul>
      </nav>
    </aside>
  );
};
