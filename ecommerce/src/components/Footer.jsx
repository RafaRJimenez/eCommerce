import React, { useContext} from 'react';
import { AppContext } from '../App';

const Footer = () => {
    const {setRoute} = useContext(AppContext);
    return (
        <div className='footer'>
            <h3 onClick={() => setRoute("home")}>home</h3>
            <h4 onClick={() => setRoute("shopping")}>cart</h4>
            <h4 onClick={() => setRoute("tasklist")}>Task List</h4>
        </div>
    );
}

export default Footer;
