import React from 'react'
import './scroll-view.css'

export default function ScrollView(props) {

    const scrollY = !props.scrollX;

    const height = !props.height ? 360 : props.height;

    return (
        <div className={`scroll-view ${scrollY ? 'scroll-y' : 'scroll-x'}`} style={{height: height}}>
            {props.children}
        </div>
    );

}