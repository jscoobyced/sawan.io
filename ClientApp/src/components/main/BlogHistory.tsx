import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { MenuContent } from '../../services/Models';

export interface BlogHistoryProps {
    menu: MenuContent;
}

const BlogHistory: React.FC<BlogHistoryProps> = (props: BlogHistoryProps) => {

    const historyLength = props.menu.links.length;
    const [elementIndex, setStartElement] = React.useState(0);
    const [showHistoryDetails, setShowHistoryDetails] = React.useState(-1);

    const onClick = (key: number) => {
        if (showHistoryDetails === key) {
            setShowHistoryDetails(-1);
        } else {
            setShowHistoryDetails(key);
        }
    };

    const viewEarlier = (event: React.MouseEvent<HTMLElement>) => {
        if (elementIndex < historyLength - 3) {
            setStartElement(elementIndex + 1);
            checkSublistDisplay();
        }
    };

    const viewLater = (event: React.MouseEvent<HTMLElement>) => {
        if (elementIndex > 0) {
            setStartElement(elementIndex - 1);
            checkSublistDisplay();
        }
    };

    const checkSublistDisplay = () => {
        if (showHistoryDetails < elementIndex || showHistoryDetails >= elementIndex + 3) {
            setShowHistoryDetails(-1);
        }
    };

    if (historyLength > 0) {
        const startElement = elementIndex;
        const endElement = Math.min(startElement + 3, historyLength);
        const contentList = props.menu.links.slice(startElement, endElement).map((link, key) => {
            const lkey = key + startElement;
            const contentDetails = link.entries.map((entry, ekey) => (
                <li key={ekey}>
                    <NavLink to={'/blog/view/' + entry.url} >{entry.text}</NavLink>
                </li>
            ));
            return (
                <li key={lkey} >
                    <div className='link' onClick={event => onClick(lkey)} data-test={'link-' + lkey}>{link.name}</div>
                    {showHistoryDetails === lkey ? <ul>{contentDetails}</ul> : <></>}
                </li>);
        });
        if (historyLength > 3 && endElement < historyLength) {
            contentList.push(
                <li key='history-ve-1'>
                    <div onClick={viewEarlier} className='link' title='View earlier' data-test={'link-ve'}>
                        <i className='far fa-arrow-down' />
                    </div>
                </li>);
        }
        if (startElement > 0) {
            contentList.unshift(
                <li key='history-vl-1'>
                    <div onClick={viewLater} className='link' title='View Later' data-test={'link-vl'}>
                        <i className='far fa-arrow-up' />
                    </div>
                </li>);
        }
        return (
            <>
                <h1>{props.menu.title}</h1>
                <ul>{contentList}</ul>
            </>);
    }
    return <></>;
};

export default BlogHistory;
