import React, { useContext} from 'react';
import { AppContext } from '../App';

const Footer = () => {
    const {setRoute} = useContext(AppContext);
    return (
        <footer>
        <div className='footer-container'>
            <div>
                <h3 onClick={() => setRoute("home")}>Home</h3>
            </div>
            <div>
                <h4 onClick={() => setRoute("shopping")}>Cart</h4>
            </div>
            <div>
                <h4 onClick={() => setRoute("tasklist")}>Task List</h4>
            </div>
        </div>
    </footer>
    );
}

export default Footer;
