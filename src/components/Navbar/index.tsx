"use client";
import { Menu, X } from "lucide-react";
import { useSidebarHandler } from "@/providers/SidebarProvider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { useAuth } from "@/providers/AuthenticationProvider";
import BaseUrl from "@/constants/urls";
import Sidebar from "../Sidebar";
import useResponsive from "@/hooks/useResponsive";
import Logo from "../Logo";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18nNavigation";

export const navLinks = [
  {
    label: "Homepage",
    href: BaseUrl.Homepage,
    isExternal: false,
  },
];

export default function Navbar() {
  const t = useTranslations();
  const { auth, logout } = useAuth();

  const { isOpen, toggle } = useSidebarHandler();
  const { isMobile, isTablet } = useResponsive();

  const [openPopover, setPopover] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 h-[var(--height-nav)] w-full">
      <div
        className="flex h-full w-full items-center justify-between bg-white/80 px-3 py-2 shadow-md dark:bg-background/80 md:justify-between md:px-10"
        style={{
          backdropFilter: "blur(12px)",
        }}
      >
        {(isMobile || isTablet) && (
          <Popover open={isOpen} onOpenChange={toggle}>
            <PopoverTrigger asChild>
              {isOpen ? (
                <X className="hover:cursor-pointer hover:bg-gray-100 md:hidden" />
              ) : (
                <Menu className="hover:cursor-pointer hover:bg-gray-100 md:hidden" />
              )}
            </PopoverTrigger>
            <PopoverContent className="mt-[10px] w-auto border-0 p-0">
              <Sidebar forMobile />
            </PopoverContent>
          </Popover>
        )}

        <div className="nav__logo hidden h-full w-[180px] items-center md:flex">
          <Link href={BaseUrl.Homepage}>
            <Logo />
          </Link>
        </div>

        <div className="nav__link hidden gap-8 md:flex">
          {navLinks.map((el, index) => {
            const isActive = pathname === el.href;

            if (el.isExternal) {
              return (
                <a
                  key={el.href}
                  href={el.href}
                  className={cn(
                    "is-hover rounded-md p-2 px-4",
                    isActive && "bg-primary-hover text-white"
                  )}
                >
                  {el.label}
                </a>
              );
            }

            return (
              <Link
                key={`${el.href}-${index}`}
                href={el.href}
                target={el.isExternal ? "_self" : undefined}
                className={cn(
                  "is-hover rounded-md p-2 px-4",
                  isActive && "bg-primary-hover text-white"
                )}
              >
                {el.label}
              </Link>
            );
          })}
        </div>

        <div className="nav__user flex gap-2">
          <Popover open={openPopover} onOpenChange={setPopover}>
            <PopoverTrigger asChild>
              <div className="navbar__avatar flex items-center gap-3 rounded-md hover:cursor-pointer">
                {/* <Avatar className="border">
              <AvatarImage src={"/favicon.png"} />
              <AvatarFallback> {upperCase(user?.username?.[0])}</AvatarFallback>
            </Avatar> */}
                <div>
                  <p className="mb-1 text-sm font-medium leading-none">{auth?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">email@gmail.com</p>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="mr-2 flex max-w-[200px] flex-col p-2">
              {[
                {
                  label: t("Shared.settings"),
                  href: BaseUrl.Settings,
                  function: () => {
                    setPopover(false);
                  },
                },
                {
                  label: t("Shared.logout"),
                  function: () => {
                    setPopover(false);
                    logout();
                  },
                },
              ].map((f) => {
                if (f.href) {
                  return (
                    <Link
                      key={f.label}
                      href={f.href}
                      className="navbar__each__menu is-hover p-1 px-2 text-sm"
                      onClick={f.function}
                    >
                      {f.label}
                    </Link>
                  );
                }

                return (
                  <p
                    onClick={f.function}
                    className="navbar__each__menu is-hover p-1 px-2 text-sm"
                    key={f.label}
                  >
                    {f.label}
                  </p>
                );
              })}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
