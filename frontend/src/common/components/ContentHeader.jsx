import React from 'react'

export default function ContentHeader(props) {
    return (
        <section className='content-header' style={{paddingLeft: '6vh'}}>
            <h1>{props.title}</h1>
        </section >
    );
}