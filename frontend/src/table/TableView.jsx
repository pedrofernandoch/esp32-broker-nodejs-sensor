import React, { Component } from "react";
import Content from "../common/components/Content";
import ContentHeader from "../common/components/ContentHeader";
import axios from "axios";
import MaterialTable from "@material-table/core";
import { toastr } from "react-redux-toastr";
import { baseApiUrl } from "../common/utils/systemConstants";
import {
    tableIcons,
    addIcon,
    editIcon,
    //deleteIcon,
    refreshIcon,
    localization,
    options,
    fileName,
} from "./materialTable";
import {locale} from '../common/utils/textLocale'
import { ExportCsv } from "@material-table/exporters";

class TableView extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    getData() {
        axios
            .get(`${baseApiUrl}/${this.props.model.toLowerCase()}`)
            .then((result) => {
                let tableData = [];
                if (result.data && Array.isArray(result.data)) {
                    tableData = result.data;
                }
                this.setState({ data: tableData });
            })
            .catch((e) => {
                if (e && e.response && e.response.data) {
                    toastr.error("Error", e.response.data);
                } else if (typeof e === "string") {
                    toastr.error("Error", e);
                } else {
                    toastr.error("Error", "Oops.. Something went wrong.");
                }
                this.setState({ data: [] });
            });
    }

    componentDidMount() {
        this.getData();
    }

    onAddClick = () => {
        this.props.functions.setModalVisibility(
            true,
            `Add ${locale[this.props.locale][this.props.localeEntity].pageTitle.substring(
                0,
                locale[this.props.locale][this.props.localeEntity].pageTitle.length -1
            )}`,
            "create",
            this.props.model
        );
    };

    onEditClick = (event, rowData) => {
        this.props.functions.setStateValue(rowData);
        this.props.functions.setModalVisibility(
            true,
            `Edit ${locale[this.props.locale][this.props.localeEntity].pageTitle.substring(
                0,
                locale[this.props.locale][this.props.localeEntity].pageTitle.length -1
            )}`,
            "edit",
            this.props.model,
            rowData.id
        );
    };

    onDeleteClick = (event, rowData) => {
        this.props.functions.setModalVisibility(
            true,
            `Remove ${locale[this.props.locale][this.props.localeEntity].pageTitle.substring(
                0,
                locale[this.props.locale][this.props.localeEntity].pageTitle.length -1
            )} "${rowData[this.props.field]}"`,
            "delete",
            rowData.id
        );
    };

    onRefreshClick = () => this.getData();

    render() {
        const actions = [
            {
                icon: refreshIcon,
                tooltip: "Refresh",
                isFreeAction: true,
                onClick: this.onRefreshClick,
            },
            {
                icon: addIcon,
                tooltip: `Add ${locale[this.props.locale][this.props.localeEntity].pageTitle.substring(
                    0,
                    locale[this.props.locale][this.props.localeEntity].pageTitle.length -1
                )}`,
                isFreeAction: true,
                onClick: this.onAddClick,
            },
            {
                icon: editIcon,
                tooltip: `Edit ${locale[this.props.locale][this.props.localeEntity].pageTitle.substring(
                    0,
                    locale[this.props.locale][this.props.localeEntity].pageTitle.length -1
                )}`,
                onClick: this.onEditClick,
            },
            // {
            //     icon: deleteIcon,
            //     tooltip: `Remover ${locale[this.props.locale][this.props.localeEntity].pageTitle.substring(
            //    0,
            //    locale[this.props.locale][this.props.localeEntity].pageTitle.length -1
            //)}`,
            //     onClick: this.onDeleteClick,
            // },
        ];
        return (
            <div>
                <ContentHeader title={locale[this.props.locale][this.props.localeEntity].pageTitle} />
                <Content>
                    <div>
                        <MaterialTable
                            detailPanel={this.props.detailPanel}
                            title=""
                            columns={this.props.columns}
                            icons={tableIcons}
                            data={this.state.data}
                            actions={
                                this.props.showActions
                                    ? actions
                                    : [
                                          {
                                              icon: refreshIcon,
                                              tooltip: "Refresh",
                                              isFreeAction: true,
                                              onClick: this.onRefreshClick,
                                          },
                                      ]
                            }
                            options={{
                                ...options,
                                exportMenu: [
                                    {
                                        label: "Export CSV",
                                        exportFunc: (cols, data) =>
                                            ExportCsv(
                                                cols,
                                                data,
                                                fileName +
                                                    "_" +
                                                    this.props.model
                                            ),
                                    },
                                ],
                            }}
                            localization={localization[this.props.locale]}
                        />
                    </div>
                </Content>
            </div>
        );
    }
}

export default TableView;
