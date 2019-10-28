import React, {useState} from "react";
import "./AddListingsComponents.css";
import { Row, Col } from 'reactstrap';
import AddListingsHeader from './AddListingsHeader';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { withStyles } from '@material-ui/core';
import { Checkbox } from '@material-ui/core/';
import { FormControlLabel } from '@material-ui/core';

const RedCheckbox = withStyles({
    root: {
      color: "#fa2276",
      '&$checked': {
        color: "#fa2276",
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);
const CheckBoxes = props => {
    return (
        <FormControlLabel
            className="add_listings_schedule"
            control={
                <RedCheckbox
                    name="day"
                    value={props.value.toLowerCase()}
                    onChange={props.chooseDay}
                    disabled={props.disabled.includes(props.value.toLowerCase())}
                />
            }
            label={props.value}
        />
    )
}
const AddListingsSchedule = props => {
    const [open, setOpen] = useState("");
    const [close, setClose] = useState("");
    const [days, setDays] = useState([]);
    const [error, setError] = useState({field1: false, field2: false});
    const [disabledDays, setDisabledDays] = useState([]);
    let daySelect = e => {
        let value = e.currentTarget.value;
        if(days.includes(value)){
            let delDays = days.filter(day => day !== value);
            setDays(delDays);
        } else {
            let addDays = [...days, value];
            setDays(addDays);
        }
    }
    let addHours = e => {
        if(open !== "" && close !== "") {
            days.forEach(item => {
                props.days[item].open = open;
                props.days[item].close = close;
            })
            let setDisabled = [...disabledDays, ...days];
            setDisabledDays(setDisabled);
            setOpen("");
            setClose("");
            setDays([]);
            setError({field1: false, field2: false})
        } else {
            if(open === "" && close === "") {
                setError({field1: true, field2: true})
            }
            else if(open === "") {
                setError({field1: true, field2: false})
            }
            else if(close === "") {
                setError({field1: false, field2: true})
            }
        }
    }
    return (
        <Col md={10} className="block_center">
            <div className="add_listings_box">
                <AddListingsHeader 
                    icon={<ScheduleIcon />}
                    title="Open and Close Timing"
                />
                <div className="add_listings_box_content">
                    <Row>
                        <Col md={12}>
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((item, index) => {
                                return (
                                    <CheckBoxes
                                        key={index} 
                                        value={item}
                                        chooseDay={daySelect}
                                        disabled={disabledDays}
                                    />
                                )
                            })}
                            
                        </Col>
                        <Col md={6}>
                            <input 
                                type="text"
                                name="open"
                                placeholder="08:00 AM"
                                className={`add_listings_box_content_input ${error.field1 ? "error": ""}`}
                                value={open}
                                onChange={e => setOpen(e.currentTarget.value)}
                                maxLength="8"
                            />
                        </Col>
                        <Col md={6}>
                            <input 
                                type="text"
                                name="close"
                                placeholder="08:00 PM"
                                className={`add_listings_box_content_input ${error.field2 ? "error": ""}`}
                                value={close}
                                onChange={e => setClose(e.currentTarget.value)}
                                maxLength="8"
                            />
                        </Col>
                    </Row>
                </div>
                <div className="add_listings_btn">
                    <button type="button" onClick={addHours}>Add Hours</button>
                </div>
            </div>
        </Col>
    )
}

export default AddListingsSchedule;
