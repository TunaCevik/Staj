import React from "react";
import { Link } from "react-router-dom";

function HeaderItem({ name, Icon, link }) {
  return (
    <Link to={link}>
      <div className="text-white flex items-center gap-3 text-[10px] font-semibold cursor-pointer hover:underline underline-offset-6 mb-3">
        <Icon size={28} />
        <h2>{name}</h2>
      </div>
    </Link>
  );
}

export default HeaderItem;
