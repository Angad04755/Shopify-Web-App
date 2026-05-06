import React from "react";

const Footer = () => {
  return (
    <footer className="pt-20 pb-12 bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-300">
      
      {/* Top Section */}
      <div className="container w-11/12 md:w-4/5 border-b border-white/10 pb-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand / Info */}
        <div>
          <h1 className="text-2xl uppercase font-semibold text-white mb-4 tracking-wide">
            Shopify
          </h1>

          <p className="text-sm text-gray-400 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat inventore
            consectetur laboriosam totam ut officia quibusdam unde fugit optio a,
            minima mollitia voluptatum, facilis, odit atque.
          </p>

          <p className="text-sm mt-6 text-gray-400">
            (+000) 1234 5678 90
            <br />
            info@example.com
          </p>
        </div>

        {/* Links Section */}
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Information */}
            <div>
              <h1 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Information
              </h1>
              <ul className="space-y-3">
                {[
                  "About us",
                  "Privacy Policy",
                  "Return Policy",
                  "Shipping Policy",
                  "Dropshipping",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div>
              <h1 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Account
              </h1>
              <ul className="space-y-3">
                {[
                  "Dashboard",
                  "My Orders",
                  "Account Details",
                  "Track My Orders",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop */}
            <div>
              <h1 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Shop
              </h1>
              <ul className="space-y-3">
                {[
                  "Affiliate",
                  "Best Sellers",
                  "Latest Products",
                  "Sale Products",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} Shopify. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
