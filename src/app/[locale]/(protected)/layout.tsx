import Navbar from "@/components/Navbar";
import AuthenticationProvider from "@/providers/AuthenticationProvider";

export default function ProtectedLayout(props: { children: React.ReactNode }) {
  return (
    <AuthenticationProvider>
      <Navbar />
      <main className="pt-[calc(var(--height-nav)+16px)] px-2 md:px-5">{props.children}</main>
    </AuthenticationProvider>
  );
}
