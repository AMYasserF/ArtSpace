import '../../css/Auction&ExhibitionPreview.css';
import Card from './Card.jsx';

function AuctionsPreview() {
  const auctions = [
    { id: 1, Image:"./src/assets/testImages/download.jpg" ,title: "Modern Art Auction", status: "Running" },
    { id: 2, Image:"./src/assets/testImages/download.jpg", title: "Vintage Collectibles", status: "Upcoming" },
  ];

  return (
    <div className="auctions">
      <h2>Auctions</h2>
      {auctions.map(auction => (
        <Card key={auction.id} Image={auction.Image} title={auction.title} description={`Status: ${auction.status}`} />
      ))}
    </div>
  );
}

export default AuctionsPreview;
