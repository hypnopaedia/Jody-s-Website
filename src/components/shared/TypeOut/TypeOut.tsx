import { useEffect, useMemo, useRef, useState } from "react"
import classes from './TypeOut.module.scss'
import clsx from "clsx";

type Props = {
    children: string[] | string,
    className?: string,
    delay?: number,
    speed?: number,
    blinkSpeed?: number,
    fontSize?: number,
    skip?: boolean,
}

export const TypeOut = ({ children, className, delay=750, speed=10, blinkSpeed=800, fontSize=12, skip=false }: Props) => {
    const text = useMemo(() => typeof children === 'string' ? children : children.join('\n'),[children]);

    const parRef = useRef<HTMLParagraphElement | null>(null);
    const cursorRef = useRef<HTMLSpanElement | null>(null);

    const [typedText,setTypedText] = useState<string>(skip ? text : '');
    const [blink,setBlink] = useState<boolean>(false);

    const isTyping = useMemo(() => text.length > typedText.length,[text.length,typedText.length]);

    useEffect(() => {
        if ( isTyping ) {
            setTimeout(() => {
                console.log(text[typedText.length])
                setTypedText(typedText + text[typedText.length]);
            }, !typedText.length ? delay : speed);
        }
    },[typedText]);

    useEffect(() => {
        if ( !isTyping ) {
            if ( !!cursorRef.current ) {
                setTimeout(() => {
                    setBlink(!blink);
                },blinkSpeed);
            }
        }
    },[blink,isTyping,cursorRef.current]);

    return (
        <p ref={parRef} className={clsx(classes.typeout, className)} style={{fontSize: fontSize + 'pt'}}>
            {typedText}
            <span 
                ref={cursorRef}
                className={clsx(classes.cursor, blink && classes.blink)}
                style={{
                    height: (fontSize+2) + 'pt',
                    marginBottom: '-' + (fontSize/4) + 'pt',
                    marginLeft: (fontSize/4) + 'pt'
                }}
            ></span>
        </p>
    )
}
