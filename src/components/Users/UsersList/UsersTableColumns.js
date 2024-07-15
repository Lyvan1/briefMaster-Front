import {Button, Input, Space, Tag, Tooltip} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useState} from "react";


const tagColor = (label, ) => {
    switch (label[0]) {
        case 'Oceads':
            return '#0D60FC';
        case 'Sales Manager':
            return '#FC970D';
        case 'Technique':
            return '#707070';
        case 'User':
            return '#05B112';
        case 'Finance':
            return '#F20519';
        case 'Commercial':
            return '#5F5BD9';
        default:
            return 'default'; // Ajoutez une couleur par défaut
    }
}

export const UsersTableColumns = [


    {
        title: 'ID',
        key: 'id',
        dataIndex: 'id',
        width: 80,
        responsive: ['md'],
        sorter: (a, b) => a.id - b.id,


    },

    {
        title: 'Company',
        key: 'company',
        dataIndex: 'company',
        width: 150,
        responsive: ['md']
    },
    {
        title: 'Firstname',
        key: 'firstname',
        dataIndex: 'firstname',
        width: 150,
        responsive: ['md']
    },
    {
        title: 'Lastname',
        key: 'lastname',
        dataIndex: 'lastname',
        width: 150,
        responsive: ['md']
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        ellipsis: {
            showTitle: false,
        },
        render: (email) => (
            <Tooltip color={'rgba(13,96,252,1)'} placement={'top'} title={email}>{email}</Tooltip>
        ),
        width: 180,
        responsive: ['md']
    },
    {
        title: 'Position',
        key: 'position',
        dataIndex: 'position',
        width: 150,
        render: (position) => (
            <Tag color={tagColor(position)}>{position}</Tag>
        ),
        responsive: ['md'],
    }
]