import { useParams } from 'react-router-dom';
import GallaryPreview from '../components/Previews/GallaryPreview';
import WelcomeComp from '../components/Previews/WelcomeComp';
import AuctionsPreview from '../components/Previews/AuctionPreview';
import ExhibitionsPreview from '../components/Previews/ExhibitionPreview';

function ClientHome(props) {
  //const { clientusername } = useParams();
  let clientusername = "mohamed";
  return (
    <div>
      <WelcomeComp  name= {props.name}/> 
      <GallaryPreview/> 
      <AuctionsPreview/>
      <ExhibitionsPreview/> 
    </div>
  );
}

export default ClientHome;