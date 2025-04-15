import { cn } from "@/lib/utils";
import { useSidebarHandler } from "@/providers/SidebarProvider";
import Logo from "../Logo";
import BaseUrl from "@/constants/urls";
import { navLinks } from "../Navbar";
import { Link, usePathname } from "@/lib/i18nNavigation";

const Sidebar = ({ forMobile }: { forMobile?: boolean }) => {
  const { isOpen, toggle } = useSidebarHandler();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "component:Sidebar",
        forMobile
          ? isOpen
            ? "block h-[100vh] w-[100vw] overflow-auto"
            : "hidden h-[100vh] w-[100vw] overflow-auto"
          : "sticky top-0 hidden h-[100vh] max-h-[100vh] w-[--sidebar-width] p-2 md:block"
      )}
    >
      <div className="flex h-full w-full flex-col rounded-md border bg-backgroundSidebar p-1 shadow-md">
        <div className="side-bar__logo px-2 pt-4">
          <Link href={BaseUrl.Homepage} className="flex justify-center">
            <Logo className="max-w-[50%]" />
          </Link>
        </div>

        <div className="side-bar__menu mt-5">
          {navLinks
            .filter((el) => !!el)
            .map((el) => {
              return (
                <Link
                  key={el.label}
                  href={el.href}
                  target={el.isExternal ? "_blank" : undefined}
                  className={cn(
                    "side-bar__menu__item text-md flex items-center gap-2 px-3 py-2",
                    pathname === el.href && "is-active"
                  )}
                  onClick={toggle}
                >
                  {el.label}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
