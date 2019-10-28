import React, {useState} from "react";
import { Container } from 'reactstrap';
import NotFoundItem from './../../NotFoundItem';
import HomeBanner from "./Components/HomeBanner/HomeBanner";
import HomePanel from './Components/HomePanel/HomePanel';
import AllListingsContainer from './Components/HomeContent/Components/AllListings/AllListingsContainer';
import PlacesContainer from "./Components/HomeContent/Components/Places/PlacesContainer";
import EventsContainer from "./Components/HomeContent/Components/Events/EventsContainer";
import EstateContainer from "./Components/HomeContent/Components/Estate/EstateContainer";
import VehiclesContainer from "./Components/HomeContent/Components/Vehicles/VehiclesContainer";
import ElectronicsContainer from "./Components/HomeContent/Components/Electronics/ElectronicsContainer";
import OthersContainer from "./Components/HomeContent/Components/Others/OthersContainer";




const Home = props => {
    const [panel, setPanel] = useState(0);
    let panelContent;
    switch(panel) {
        case 0: 
            panelContent = <AllListingsContainer />
            break;
        case 1:
            panelContent = <PlacesContainer />
            break;
        case 2:
            panelContent = <EventsContainer />
            break;
        case 3:
            panelContent = <EstateContainer />
            break;
        case 4:
            panelContent = <VehiclesContainer />
            break;
        case 5:
            panelContent = <ElectronicsContainer />
            break;
        case 6:
            panelContent = <OthersContainer />
            break;
        default:
            panelContent = <NotFoundItem />
    } 
    return (
        <section>
            <Container>
                <HomeBanner />
                <HomePanel
                    panel={panel} 
                    setPanel={setPanel}
                />
                {panelContent}
            </Container>
        </section>
    )
}
export default Home;