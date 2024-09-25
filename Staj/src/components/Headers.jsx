import React from "react";
import logo from "../assets/Images/Logo.png";

import { RiLandscapeLine } from "react-icons/ri";
import { PiPlant } from "react-icons/pi";
import { GiPlantWatering, GiFarmer } from "react-icons/gi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { HiDotsVertical } from "react-icons/hi";

import HeaderItem from "./HeaderItem.jsx";
import ProfilePic from "../assets/Images/ProfilePic.png";
import { useState } from "react";

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
        <div className="flex md:hidden gap-5">
          {menu.map(
            (item, index) =>
              index < 3 && (
                <HeaderItem
                  key={index}
                  name={""}
                  Icon={item.icon}
                  link={item.link}
                />
              )
          )}
        </div>
        <div className="md:hidden" onClick={() => setToggle(!toggle)}>
          <HeaderItem name={""} Icon={HiDotsVertical} />
          {toggle ? (
            <div className="absolute mt-3 bg-[#c7b798] border-[4px] border-[#C8B28D] px-5 p-3">
              {menu.map(
                (item, index) =>
                  index >= 3 && (
                    <HeaderItem
                      key={index}
                      name={item.name}
                      Icon={item.icon}
                      link={item.link}
                    />
                  )
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Sample ID Input alanı */}
    </div>
  );
}

export default Headers;
