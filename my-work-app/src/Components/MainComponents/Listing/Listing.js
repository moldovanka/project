import React, { useState } from "react";
import "./Listing.css";
import { Container, Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import NotFoundItem from './../../NotFoundItem';
import Preloader from './../../../Preloader';
import ListingCardContainer from "../Home/Components/ListingCard/ListingCardContainer";

const Listing = props => {
    const caregoryList = ["All Categories","places", "events", "estate", "vehicles", "electronics", "others"];
    const [toggleCategories, SetToggleCategories] = useState(false);

    let ToggleCategories = (e) => {
        SetToggleCategories(!toggleCategories);
    }
    let OnSelect = (e, setField) => {
        let value = e.currentTarget.innerText;
        value = value === "All Categories" ? "" : value;
        SetToggleCategories(!toggleCategories);
        setField("section", value);
        
    }
    return (
        <section>
            <Container>
                <Row>
                    <Col lg={4}>
                    <Formik
                        initialValues={{
                            name: "",
                            section: "",
                            tags: ""
                        }}
                        onSubmit={values => {
                            props.options(values)
                            props.search(true);
                        }}
                        render={({values,handleSubmit,handleReset,handleChange,setFieldValue}) => (
                            <form onSubmit={handleSubmit}>
                            <div className="listing_search_filter_box">
                                <div className="listing_search_filter_box_header">
                                    <h4>Filters</h4>
                                    <span onClick={handleReset}>Reset Filters</span>
                                </div>
                                <div className="listing_search_filter_box_body">
                                    <div className="listing_search_filter_box_body_item">
                                        <input 
                                            className="listing_search_filter_box_body_input" 
                                            type="text" 
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            placeholder="Listing's name">
                                        </input>
                                    </div>
                                    <div className="listing_search_filter_box_body_item">
                                        <input
                                            readOnly
                                            className="listing_search_filter_box_body_input" 
                                            type="text" 
                                            name="section"
                                            placeholder="All Categories"
                                            value={values.section}
                                            onClick={ToggleCategories}
                                            >
                                        </input>
                                        {toggleCategories ?  
                                            <ArrowDropUpIcon className="listing_search_filter_box_body_icon" /> : 
                                            <ArrowDropDownIcon className="listing_search_filter_box_body_icon" />
                                        }
                                        {toggleCategories && 
                                            <div className="listing_search_filter_box_body_category">
                                                {caregoryList.map((item, index) => {
                                                    return <p key={index} onClick={e => OnSelect(e,setFieldValue)}>{item}</p>
                                                })}
                                            </div>
                                        }
                                    </div>
                                    <input 
                                            className="listing_search_filter_box_body_input" 
                                            type="text" 
                                            name="tags"
                                            value={values.tags}
                                            onChange={handleChange}
                                            placeholder="Tags">
                                    </input>
                                </div>
                            </div>
                            <button className="listing_search_filter_box_btn" type="submit">Search</button>
                            </form>
                        )}
                    />
                       
                    </Col>
                    <Col lg={8}>
                        <Row>
                            <Col md={12}>
                                <h5 className="listing_search_title">Search Results</h5>
                            </Col>
                            {!props.listings || props.isSearch ? (
                                <Preloader />
                            ) : (
                                props.listings.length === 0 ? (
                                    <NotFoundItem />
                                ) : (
                                    <ListingCardContainer
                                        listings={props.listings} 
                                        size={4}
                                        size_lg={6}
                                        size_md={6}
                                    />
                                )
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default Listing;