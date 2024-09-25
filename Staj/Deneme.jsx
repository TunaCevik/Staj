import React, { useState } from "react";
import logo from "../assets/Images/Logo.png";
import { RiLandscapeLine } from "react-icons/ri";
import { PiPlant } from "react-icons/pi";
import { GiPlantWatering, GiFarmer } from "react-icons/gi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { HiDotsVertical } from "react-icons/hi";

import HeaderItem from "./HeaderItem.jsx";
import ProfilePic from "../assets/Images/ProfilePic.png";

function Headers() {
  const [toggle, setToggle] = useState(false);
  const menu = [
    { name: `Toprak Gözlemi`, icon: RiLandscapeLine, link: "/toprak-gozlemi" },
    { name: `Bitki Gözlemi`, icon: PiPlant, link: "/bitki-gozlemi" },
    { name: `Hava Gözlemi`, icon: TiWeatherPartlySunny, link: "/hava-gozlemi" },
    {
      name: `Sulama ve Bitki Besleme Gözlemi`,
      icon: GiPlantWatering,
      link: "/sulama-gozlemi",
    },
    {
      name: `Tarımsal Savaşım Gözlemi`,
      icon: GiFarmer,
      link: "/savasim-gozlemi",
    },
  ];

  return (
    <div className="flex items-center justify-between bg-red-400 p-5">
      <div className="flex gap-8 text-white items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-[80px] md:w-[115px] object-cover"
        />

        {/* Büyük ekranlar için menü */}
        <div className="hidden md:flex gap-8">
          {menu.map((item, index) => (
            <HeaderItem
              key={index}
              name={item.name}
              Icon={item.icon}
              link={item.link}
            />
          ))}
        </div>

        <div className="relative md:hidden">
          <div onClick={() => setToggle(!toggle)}>
            <div className="text-white flex items-center gap-3 text-[10px] font-semibold cursor-pointer hover:underline underline-offset-6 mb-3">
              <HiDotsVertical size={28} />
            </div>
          </div>
          {toggle && (
            <div className="absolute right-0 top-12 w-48 bg-[#c7b798] border-[4px] border-[#C8B28D] px-5 py-3 rounded-lg shadow-lg z-10">
              {menu.map((item, index) => (
                <HeaderItem
                  key={index}
                  name={item.name}
                  Icon={item.icon}
                  link={item.link}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sağ üst köşedeki profil resmi ve yüzde çubuğu */}
      <div className="flex items-center gap-4">
        <div className="w-10 bg-gray-600 rounded-full h-4 relative">
          <div className="bg-green-500 h-4 rounded-full"></div>
        </div>
        <img
          src={ProfilePic}
          alt="Profile Pic"
          className="w-[40px] rounded-full"
        />
      </div>
    </div>
  );
}

export default Headers;
