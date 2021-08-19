import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebarData';
import { IconContext } from 'react-icons/lib';
import "./navbar.css";
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
const NavBar = () => {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    return(
        <React.Fragment>
            <IconContext.Provider value={{color: "#fff"}}>
            <div className="navbar">
                <Link className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                    <Link to="#" className="menu-bars">
                    <AiIcons.AiOutlineClose />
                    </Link>
                </li>
                {SidebarData.map((data, index) => {
                    return(
                        <li key={index} className={data.className}>
                            <Link to={data.path}>
                                {data.icon}
                                <span>{data.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            </nav>
            </IconContext.Provider>
        </React.Fragment>
    )
}

export default NavBar