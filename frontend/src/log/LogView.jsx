import React, { Component } from 'react'
import TableView from '../table/TableView'
import {locale} from '../common/utils/textLocale'

class Log extends Component {

    render() {
        const logColumns = [
            { title: "ID", field: "id" },
            { title: locale[this.props.locale].log.tableColumns.author, field: "user_id" },
            { title: locale[this.props.locale].log.tableColumns.logType, field: "log_type" },
            { title: locale[this.props.locale].log.tableColumns.logAction, field: "log_action" },
            { title: locale[this.props.locale].log.tableColumns.message, field: "message" },
        ]
        
        return (
            <TableView localeEntity="log" locale={this.props.locale} model="Logs" columns={logColumns} showActions={false}/>
        )
    }
}

export default Log