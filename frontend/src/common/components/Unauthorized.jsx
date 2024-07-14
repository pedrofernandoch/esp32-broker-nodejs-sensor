import Content from './Content'
import ContentHeader from './ContentHeader'
import React, { Component } from 'react'
import {locale} from '../utils/textLocale'

class Unauthorized extends Component {

    render() {
        return (
            <div>
                <ContentHeader title={locale[this.props.locale].unauthorized.title} />
                <Content>
                        <h1>{locale[this.props.locale].unauthorized.content}</h1>
                </Content>
            </div >
        )
    }
}

export default Unauthorized