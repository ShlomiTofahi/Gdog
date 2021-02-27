import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deleteCategory } from '../../actions/categoryActions';

import AddCategoryModal from './AddCategoryModal';
import ShowElements from './ShowElements';

class ShowCategories extends Component {

    static protoType = {
        category: PropTypes.object
    }

    onDeleteClick = (id) => {
        this.props.deleteCategory(id);
    }

    getStyle = () => {
        return {
            background: "#f4f4f4",
            padding: "10px",
            borderBottom: "1px #ccc dotted",
        };
    };

    render() {
        const { categories } = this.props.category;

        return (
            <Fragment >
                <div class="tabcontent2">
                    <AddCategoryModal />
                    <ShowElements elements={categories} onDeleteClick={this.onDeleteClick} />
                </div>

            </Fragment>
        );
    }
}
const btnRemoveStyle = {
    background: "#ff0000",
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
};

const btnEditStyle = {
    background: "orange",
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
};

const mapStateToProps = (state) => ({
    category: state.category,
});

export default connect(
    mapStateToProps,
    { deleteCategory }
)(ShowCategories);