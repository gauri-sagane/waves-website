import React from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
// import { useSelector } from 'react-redux';


const Footer = () => {
    return(
        <footer>
            <div className='bck_b_dark'>
                <div className='container'>
                    <div className='logo'>
                        WAVES
                    </div>
                    <div className='wrapper'>
                        <div className='left'>
                            <h2>Contact Information</h2>
                            <div className='business_nfo'>
                                <div className='tag'>
                                    <ContactsIcon />
                                    <div className='nfo'>
                                        <div>Address</div>
                                        <div>8585 George Bush Rd, CA</div>
                                    </div>
                                </div>
                                <div className='tag'>
                                    <TimelapseIcon />
                                    <div className='nfo'>
                                        <div>Phone</div>
                                        <div>12353-83691</div>
                                    </div>                                   
                                </div>
                                <div className='tag'>
                                    <PhoneIcon />
                                    <div className='nfo'>
                                        <div>Working Hours</div>
                                        <div>from 10AM - 5PM</div>
                                    </div>                                   
                                </div>
                                <div className='tag'>
                                    <EmailIcon />
                                    <div className='nfo'>
                                        <div>Email</div>
                                        <div>waves@gmail.com</div>
                                    </div>                                   
                                </div>
                            </div>
                        </div>
                        <div className='left'>
                            <h2>Be the first to know!</h2>
                            <div>
                                <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;