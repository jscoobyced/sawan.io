import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuContent } from '../../services/Models';

export interface BlogHistoryProps {
    menu: MenuContent;
}

const BlogHistory: React.FC<BlogHistoryProps> = (props: BlogHistoryProps) => {

    const contentList = props.menu.links.map((link, key) => {
        return (
            <li key={key}>
                <NavLink to={'/blog/month/' + link.url} >{link.text}</NavLink>
            </li>);
    });
    return (
        <>
            <h1>{props.menu.title}</h1>
            <ul>{contentList}</ul>
        </>);
};

export default BlogHistory;
