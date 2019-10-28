import React, {useEffect} from "react";
import "./Help.css";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'reactstrap';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useHelpStyles = makeStyles(theme => ({
    panel_summary: {
        background: "#1b1b1b",
        color: "#fff",
        border: "1px solid transparent",
        borderBottom: "1px solid #000",
        "&:hover": {
            background: "#000",
            border: "1px solid #fa2276"
        }
    },
    panel_details: {
        background: "#1b1b1b",
        color: "#fff",
        padding: "20px"
    },
}));


const ExpandedPanel = props => {
    const classes = useHelpStyles();
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon style={{color: "#fff"}}/>}
                classes={{
                    root: classes.panel_summary
                }}
            >
            <Typography>FAQ</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
                classes={{
                    root: classes.panel_details
                }}
            >
            <Typography className="help_content_body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
            </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

const Help = props => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    return (
        <section>
            <Container>
                <Row>
                    <Col xl={12}>
                        <div className="hepl_header">
                            Help
                            <div className="deliver"></div>
                        </div>
                    </Col>
                    <Col xl={12}>
                        <div className="help_tabs_panel">
                            <p className="active">FAQ</p>
                        </div>
                    </Col>
                    <Col xl={12}>
                        <div className="help_content">
                            <ExpandedPanel />
                            <ExpandedPanel />
                            <ExpandedPanel />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Help;