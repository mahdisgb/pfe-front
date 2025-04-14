import {  useMenu } from "@refinedev/core";
import { NavLink } from "react-router-dom";
//import { Resourcessvgs } from "@/resources/resourcesvg";

type SiderProps={
    showsider:boolean
}
const Sider = (SiderProps:SiderProps) => {
    const { selectedKey, menuItems } = useMenu();
 
    return (
        <div className={`h-full  bg-white max-w-[266px] ${SiderProps.showsider ? "w-full" : "hidesider"}  sider `}>
            <ul className="px-1 pt-5 *:font-normal">
                {menuItems.map((item) =>    
                    <li key={item.key} className={`${item.key === selectedKey ? "bg-[#91A19D] text-primary fillprimary " : "hover:bg-[#F0F0F0]"} relative text-sm flex gap-2 py-3 px-5 rounded-lg items-center `}>
                       {/*{Resourcessvgs.map((Resourcessvg,i)=> Resourcessvg.name == item.name ? (<span key= {i}><Resourcessvg.svg /></span>) : "")}*/}
                        <NavLink to={item.route ?? "/"} className="font-thin before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:z-10 text-nowrap">{item.label}</NavLink>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Sider;
