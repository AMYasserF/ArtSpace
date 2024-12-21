import { useState ,useEffect} from 'react';
import '../../css/Auction&ExhibitionPreview.css';
import Card from './Card.jsx';
import { use } from 'react';
import axios from 'axios';

function AuctionsPreview() {
  const [auctions, setAuctions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/client/auctions/limit').then((response) => {
      setAuctions(response.data);
      console.log(response.data);
    }
    ).catch((err) => {
      console.error('Error fetching auctions', err);
    });
  }, []);

  return (
    <div className="auctions">
      <h2>Auctions</h2>
      {auctions.map(auction => (
        <Card key={auction.id} Image={auction.photo} title={auction.artname} description={`Status: ${auction.status}`} />
      ))}
    </div>
  );
}

export default AuctionsPreview;
