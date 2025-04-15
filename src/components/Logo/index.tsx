import ShopWithMeLogo from "@/assets/logo.png";

const Logo = ({ className }: { className?: string }) => {
  return <img src={ShopWithMeLogo as unknown as string} alt="logo" className={className} />;
};

export default Logo;
