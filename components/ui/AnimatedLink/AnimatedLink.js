import React from 'react';
import Link from "next/link";
import st from './AnimatedLink.module.css';

const AnimatedLink = ({ path, text, ...props}) => {
    return (
        <div className={st.animatedLink} {...props}>
            <Link href={path} >{text}</Link>
            <div className={st.underline}></div>
        </div>
    );
}

export default AnimatedLink;
