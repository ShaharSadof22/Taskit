import React from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FaUserCircle } from "react-icons/fa";
import { Avatar } from '@material-ui/core';


export function MembersChart({memberNumber}) {

    const allMembers = [
        {
            _id: "5f6f020e486616919e1f0de3",
            userName: "Arik Einav",
            imgUrl: "https://res.cloudinary.com/cloudinary-img/image/upload/v1600864700/Taskit/erik_lnajh5.png"
        }, {
            _id: "5f6f0220486616919e1f13c2",
            userName: "Shlomi Koplianski",
            imgUrl: "https://res.cloudinary.com/cloudinary-img/image/upload/v1600864700/Taskit/shlomi_rujmqc.png"
        }, {
            _id: "5f6f01f9486616919e1f0682",
            userName: "Shahar Sadof",
            imgUrl: "https://res.cloudinary.com/cloudinary-img/image/upload/v1600864700/Taskit/shahar_wyjntk.png"
        }, {
            _id: "5f6f374f81cc744a0002589c",
            userName: "Meital Lazarovich",
            imgUrl: "https://res.cloudinary.com/cloudinary-img/image/upload/v1601122561/Taskit/meital_xr42uc.png"
        }, {
            _id: "5f6f37c181cc744a0002589d",
            userName: "Yaron Biton",
            imgUrl: "https://res.cloudinary.com/cloudinary-img/image/upload/v1601123470/Taskit/Yaron_z1uuw2.png"
        },
    ]

    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const onSelectMember = (userName) => {
        handleClose()
        var userToShow;
        switch (userName) {
            case 'Arik Einav':
                userToShow = {num: 0, userName: 'Arik Einav'}
                break;
            case 'Shlomi Koplianski':
                userToShow = {num: 1, userName: 'Shlomi Koplianski'}
                break;
            case 'Shahar Sadof':
                userToShow = {num: 2, userName: 'Shahar Sadof'}
                break;
            case 'Meital Lazarovich':
                userToShow = {num: 3, userName: 'Meital Lazarovich'}
                break;
            case 'Yaron Biton':
                userToShow = {num: 4, userName: 'Yaron Biton'}
                break;
        
            default:
                break;
        }
        memberNumber(userToShow)
    }


    return (
        <div className="members-chart">
            <button className="choose-member-btn" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                <FaUserCircle style={{ margin: "0px 5px -2px" }} />Member
            </button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {allMembers &&
                    allMembers.map(member =>
                        <MenuItem key={member._id} className="user-in-list">
                            <div className="members flex" onClick={() => onSelectMember(member.userName)}>
                                <Avatar src={member.imgUrl} alt="img" className="user-img" />
                                <p className="user-name">{member.userName}</p>
                            </div>
                        </MenuItem>)
                }
            </Menu>
        </div>
    )
}