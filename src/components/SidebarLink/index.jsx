import { Link } from 'react-router-dom';

export default function SidebarLink({
  active = false,
  children,
  ...props
}) {
  return (
    <>
      {active ? (
        <span
          className="absolute inset-y-2 right-0 w-1 h-8 bg-[#9575DE] rounded-full"
          aria-hidden="true"
        ></span>
      ) : (
        ""
      )}
      <Link
        {...props}
        className={
          active
            ? "inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 dark:text-[#9575DE]"
            : "inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 dark:text-white"
        }
      >
        {children}
      </Link>
    </>
  );
}
