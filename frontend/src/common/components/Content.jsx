import React from 'react'

export default function Content(props){
    return(
        <section className='content' style={{paddingLeft: '6vh', paddingRight: '3vh'}}>{props.children}</section>
    );
}