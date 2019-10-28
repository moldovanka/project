import React, {useEffect} from "react";
import "./AddListingsComponents.css";
import ImageIcon from '@material-ui/icons/Image';
import { Col, Row } from 'reactstrap';
import AddListingsHeader from "./AddListingsHeader";
import ClearIcon from '@material-ui/icons/Clear';
import { imageAPI } from "../../../../../api/api";

const AddListingsImages = props => {
    const [image, setImage] = React.useState({});
    useEffect(() => {
        if(image.name) {
            let imgUrl = "";
            imageAPI.uploadImage(image.file)
                .then(response => {
                    imgUrl = response.data.data.url;
                    if(image.name === "galleryImages") {
                        props.setField("images."+image.name, [...props.image.galleryImages, imgUrl])
                    } else {
                        props.setField("images."+image.name, imgUrl)
                    }
                })
                .catch(err => {
                    imgUrl = null;  
                })
        }
        
    }, [image.file])
    const imageUpload = e => {
        let name = e.currentTarget.name;
        let file = e.currentTarget.files[0];
        setImage({name, file});
    }
    const removeImage = id => {
        let images = props.image.galleryImages.filter((img, index) => index !== id);
        props.setField("images.galleryImages", images);
    }
    return (
        <Col md={10} className="block_center">
            <div className="add_listings_box">
                <AddListingsHeader 
                    icon={<ImageIcon />}
                    title="Images" 
                />
                <div className="add_listings_box_content">
                    <p className="add_listings_title">Logo</p>
                    <div className="add_listings_image">
                        <img src={props.image.logo ? props.image.logo : "https://dummyimage.com/120x120/9c09eb/fff.jpg"} alt="image"/>
                    </div>
                    <div className="add_listings_image_upload">
                        <input 
                            type="file"
                            id="file1"
                            name="logo"
                            onChange={imageUpload}
                            accept=".jpg, .jpeg"
                        />
                        <label htmlFor="file1">Choose file</label>
                    </div>
                    <p className="add_listings_title">Cover Image</p>
                    <div className="add_listings_image_cover">
                        <img src={props.image.coverImage ? props.image.coverImage : "https://dummyimage.com/1100x350/9c09eb/fff"} alt="image"></img>
                    </div>
                    <div className="add_listings_image_upload">
                        <input 
                            type="file"
                            id="file2"
                            name="coverImage"
                            onChange={imageUpload}
                            accept=".jpg, .jpeg"
                        />
                        <label htmlFor="file2">Choose file</label>
                    </div>
                    <p className="add_listings_title">Gallery Images</p>
                    <div className="add_listings_image">
                        <Row>
                            {props.image.galleryImages.length == 0 ? (
                                <Col md={12}>
                                    <img src="https://dummyimage.com/120x120/9c09eb/fff.jpg" alt="image"></img>
                                </Col>
                            ) : (
                                props.image.galleryImages.map((image, i) => {
                                    return (
                                        <Col sm={4} lg={3} key={i}>
                                            <div className="add_listings_image_gallery">
                                                <img src={image} alt="image"></img>
                                                <ClearIcon className="add_listings_remove_gallery_icon"
                                                    onClick={() => removeImage(i)}
                                                />
                                            </div>
                                        </Col>
                                    )
                                })
                            )}
                        </Row>
                        
                    </div>
                    <div className="add_listings_image_upload">
                        <input 
                            type="file"
                            id="file3"
                            name="galleryImages"
                            onChange={imageUpload}
                            accept=".jpg, .jpeg"
                        />
                        <label htmlFor="file3">Choose file</label>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default AddListingsImages;
