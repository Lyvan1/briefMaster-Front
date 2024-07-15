import React from "react";
import {FaTrashCan, FaPen, FaUserPlus, FaBuilding} from "react-icons/fa6";

export const items = [
    {
        key: '1',
        label: 'Edit',
        icon: <FaPen/>,

    },
    {
        key: '2',
        label: 'Add user',
        icon: <FaUserPlus/>
    },
    {
        key: '3',
        label: 'Delete',
        icon: <FaTrashCan/>,
        danger: true,
    },
];