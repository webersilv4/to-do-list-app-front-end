import React from 'react';
import { TbClipboardList } from 'react-icons/tb';

const Header = () => {
    return (
        <ul className="nav justify-content-center bg-dft-2 p-3">
            <li className="nav-item">
                <a className="nav-link active" href="#"><TbClipboardList /></a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled" href="#">...</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled" href="#">...</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled">...</a>
            </li>
        </ul>
    );
};


export default Header;