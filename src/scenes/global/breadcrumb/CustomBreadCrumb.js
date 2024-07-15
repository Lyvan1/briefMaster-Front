import React, {useEffect} from 'react';
import './CustomBreadCrumb.css';
import { FaUser, FaHouse, FaBuilding } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, Row } from 'antd';

const breadcrumbNameMap = {
    '/': { name: 'Home', icon: <FaHouse /> },
    '/users': { name: 'Users', icon: <FaUser /> },
    '/users/add': { name: 'Add', icon: <FaUser /> },
    '/companies': { name: 'Companies', icon: <FaBuilding /> },
    '/companies/add': { name: 'Add', icon: <FaUser /> },
};

const CustomBreadCrumb = () => {
    // Obtenir l'URL actuelle
    const location = useLocation();

    // Découper le chemin en segments et filtrer les chaînes vides
    const pathSnippets = location.pathname.split('/').filter(i => i);

    // Générer les éléments de breadcrumb supplémentaires
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {

        // Construire le chemin complet pour chaque segment
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        // Trouver le breadcrumb correspondant dans le tableau
        const breadcrumb = breadcrumbNameMap[url];

        // Si le breadcrumb existe, ajouter un objet au tableau
        return breadcrumb ? {

            title: (
                <Link to={url} className={index === pathSnippets.length -1 ? 'underline' : ''}>{breadcrumb.name}</Link>
            ),
            key: url,
            icon: breadcrumb.icon,
        } : null;
    }).filter(item => item !== null); // Filtrer les éléments null


    // Ajouter le breadcrumb de la page d'accueil
    const breadcrumbItems = [
        {
            title: (
                <Row justify='center' align='middle' width='100%' >
                    <FaHouse className='mr-1' />
                    <Link to="/">Home</Link>
                </Row>
            ),
            key: '/',
        },
        ...extraBreadcrumbItems
    ];
    const breadCrumbArrayKeys = Object.keys(breadcrumbItems);
    const lastKey = breadCrumbArrayKeys[breadCrumbArrayKeys.length - 1];
    const lastValue = breadcrumbItems[lastKey];

    // Rendre le composant Breadcrumb avec les éléments
    return (
        <Breadcrumb style={{ margin: '16px 0' }} className="custom-breadcrumb" items={breadcrumbItems} />
    );
};

export default CustomBreadCrumb;
