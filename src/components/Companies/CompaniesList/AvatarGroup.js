import React from 'react';
import {Avatar, Tooltip} from "antd";
import {AntDesignOutlined, UserOutlined} from "@ant-design/icons";

const AvatarGroup = ({company}) => {

    const {users} = company;

    const generateBackgroundColor = (userId) => {
        // Convertir l'identifiant de l'utilisateur en un nombre entier
        const userIdInt = parseInt(userId, 10);

        // Calculer la teinte basée sur l'identifiant de l'utilisateur
        const hue = (userIdInt * 137) % 360; // Utilisation d'un nombre premier arbitraire

        // Utiliser la teinte pour générer une couleur HSL
        const backgroundColor = `hsl(${hue}, 70%, 80%)`;

        // Retourner la couleur de fond générée
        return backgroundColor;
    };




    const displayCompanyUsers = users.length === 0 ? (
        <h1>no user</h1>
    ) : (
        users.map((user, index) => {
            const displayUserAvatar = user.avatarUrl === undefined ? (
                <Avatar key={user.id} style={{backgroundColor: generateBackgroundColor(user.id)}}> {user.firstname.slice(0, 1).toUpperCase()} </Avatar>
            ) : (
                <Avatar key={user.id} style={{backgroundColor: '#1677ff'}} src={`${process.env.REACT_APP_URL}${user.avatarUrl}`}/>
            )

            return displayUserAvatar
        })
    )

    return (
        <>
            <Avatar.Group maxCount={2} size='default' maxStyle={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
            }}>
                {
                    displayCompanyUsers
                }

            </Avatar.Group>
        </>
    );
};

export default AvatarGroup;