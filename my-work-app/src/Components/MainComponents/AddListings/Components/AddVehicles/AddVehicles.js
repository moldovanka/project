import React, {useEffect} from "react";
import { Container, Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import AddListingsName from './../AddListingsComponents/AddListingsName';
import AddListingCategory from '../AddListingsComponents/AddListingsCategory';
import AddListingsDescription from './../AddListingsComponents/AddListingsDescription';
import AddListingsImages from './../AddListingsComponents/AddListingsImages';
import AddListingsContact from './../AddListingsComponents/AddListingsContact';
import AddListingsDetails from './../AddListingsComponents/AddListingsDetails';
import AddListingsPrice from './../AddListingsComponents/AddListingsPrice';
import AddListingsSocial from './../AddListingsComponents/AddListingsSocials';
import AddListingsPlace from './../AddListingsComponents/AddListingsPlace';
import AddListingsTags from './../AddListingsComponents/AddListingsTags';
import AddListingsSendBtn from './../AddListingsComponents/AddListingsSendBtn';
import { vehiclesList } from "../AddListingsComponents/CategoryList";

const AddVehicles = props => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    const categoryList = vehiclesList;
    return(
        <section> 
            <Container>
                <Row>
                    <Col md={12}>
                        <Formik
                            initialValues={{
                                section: "vehicles",
                                rating: "5",
                                name: "",
                                description: "",
                                category: "",
                                images: {
                                    logo: null,
                                    coverImage: null,
                                    galleryImages: []
                                },
                                email: "",
                                phone: "",
                                price: "",
                                socials: [{category: "", url: ""}],
                                place: "",
                                tags: "",
                                details: {
                                    weight: "",
                                    year: "",
                                    color: "",
                                    transmission: "",
                                    fuel: "",
                                    mileage: "",
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
                                    <AddListingCategory
                                        handleChange={props.handleChange}
                                        value={props.values.category}
                                        setField={props.setFieldValue}
                                        categoryList={categoryList}
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
                                        items={["weight", "year", "color", "transmission", "fuel", "mileage"]}
                                        details={props.values.details}
                                    />
                                    <AddListingsPrice 
                                        handleChange={props.handleChange}
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

export default AddVehicles;