import { cloneElement, JSX, RefObject } from "react";

type Props = {
    children: JSX.Element;
    scrollToElement: RefObject<HTMLElement | null> | string;
}

export const ScrollTo = ({ children, scrollToElement }: Props) => {
    const childWithScrollOnClick = cloneElement(children, {
        onClick: handleClick,
        ...children.props
    });

    return (
        <>
            {childWithScrollOnClick}
        </>
    );

    function handleClick() {
        const node = typeof scrollToElement === "string" ? getNode(scrollToElement) : scrollToElement.current;
        if ( node === null || node === undefined ) return;
        node.scrollTo(0, 0);
    }

    function getNode(elementIdentifier: string) {
        if ( elementIdentifier.startsWith('#') ) return document.getElementById(elementIdentifier);
        if ( elementIdentifier.startsWith('.') ) return document.getElementsByClassName(elementIdentifier)?.[0];
        return document.getElementsByTagName(elementIdentifier)?.[0];
    }
}
