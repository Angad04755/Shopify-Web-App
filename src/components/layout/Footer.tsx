import { useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();
  return (
    <footer className={`${location.pathname === "/sign-in" ? "hidden" : "block"} p-10 bg-black text-gray-300`}>
      
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Shopify. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
