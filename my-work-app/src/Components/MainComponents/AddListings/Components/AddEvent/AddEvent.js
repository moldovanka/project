import React, {useEffect} from "react";
import { Container, Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import AddListingsName from './../AddListingsComponents/AddListingsName';
import AddListingsDescription from './../AddListingsComponents/AddListingsDescription';
import AddListingsImages from './../AddListingsComponents/AddListingsImages';
import AddListingsContact from './../AddListingsComponents/AddListingsContact';
import AddListingsSocial from './../AddListingsComponents/AddListingsSocials';
import AddListingsPlace from './../AddListingsComponents/AddListingsPlace';
import AddListingsTags from './../AddListingsComponents/AddListingsTags';
import AddListingsSendBtn from './../AddListingsComponents/AddListingsSendBtn';
import AddListingsDetails from './../AddListingsComponents/AddListingsDetails';

const AddEvent = props => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    return(
        <section> 
            <Container>
                <Row>
                    <Col md={12}>
                        <Formik
                            initialValues={{
                                section: "events",
                                rating: "5",
                                name: "",
                                description: "",
                                images: {
                                    logo: null,
                                    coverImage: null,
                                    galleryImages: []
                                },
                                email: "",
                                phone: "",
                                socials: [{category: "", url: ""}],
                                place: "",
                                tags: "",
                                details: {
                                    year: "",
                                    month: "",
                                    day: "",
                                    time: ""
                                }
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
                                    <AddListingsDetails 
                                        items={["year", "month", "day", "time"]}
                                        details={props.values.details}
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

export default AddEvent;