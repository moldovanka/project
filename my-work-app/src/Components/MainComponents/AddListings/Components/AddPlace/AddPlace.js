import React, {useEffect} from "react";
import { Container, Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import AddListingsName from './../AddListingsComponents/AddListingsName';
import AddListingCategory from '../AddListingsComponents/AddListingsCategory';
import AddListingsDescription from '../AddListingsComponents/AddListingsDescription';
import AddListingsImages from './../AddListingsComponents/AddListingsImages';
import AddListingsContact from './../AddListingsComponents/AddListingsContact';
import AddListingsSchedule from './../AddListingsComponents/AddListingsSchedule';
import AddListingsSocial from './../AddListingsComponents/AddListingsSocials';
import AddListingsPlace from './../AddListingsComponents/AddListingsPlace';
import AddListingsTags from './../AddListingsComponents/AddListingsTags';
import AddListingsSendBtn from './../AddListingsComponents/AddListingsSendBtn';
import { placeList } from './../AddListingsComponents/CategoryList';

const AddPlace = props => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    const categoryList = placeList;
    return(
        <section> 
            <Container>
                <Row>
                    <Col md={12}>
                        <Formik
                        initialValues={{
                            section: "places",
                            rating: "5",
                            name: "",
                            category: "",
                            description: "",
                            images: {
                                logo: null,
                                coverImage: null,
                                galleryImages: []
                            },
                            email: "",
                            phone: "",
                            schedule: {
                                monday: {open: null, close: null},
                                tuesday: {open: null, close: null},
                                wednesday: {open: null, close: null},
                                thursday: {open: null, close: null},
                                friday: {open: null, close: null},
                                saturday: {open: null, close: null},
                                sunday: {open: null, close: null},
                            },
                            socials: [{category: "", url: ""}],
                            place: "",
                            tags: "",
                        }}
                        onSubmit={values => {
                            props.addListing(values);
                        }}
                        render={props => (
                            <form onSubmit={props.handleSubmit}>
                                <AddListingsName 
                                    handleChange={props.handleChange}
                                    value={props.values.name}
                                />
                                <AddListingCategory 
                                    handleChange={props.handleChange}
                                    value={props.values.category}
                                    categoryList={categoryList}
                                    setField={props.setFieldValue}
                                />
                                <AddListingsDescription
                                    handleChange={props.handleChange}
                                    value={props.values.description}
                                />
                                <AddListingsImages
                                    image={props.values.images} 
                                    setField={props.setFieldValue}
                                />
                                <AddListingsContact
                                    handleChange={props.handleChange}
                                />
                                <AddListingsSchedule
                                    days={props.values.schedule}
                                />
                                <AddListingsSocial
                                    socials={props.values.socials}
                                    setField={props.setFieldValue}
                                />
                                <AddListingsPlace
                                    handleChange={props.handleChange}
                                />
                                <AddListingsTags 
                                    handleChange={props.handleChange}
                                />
                                <AddListingsSendBtn />
                            </form>
                        )}
                    >
                        
                    </Formik>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AddPlace;