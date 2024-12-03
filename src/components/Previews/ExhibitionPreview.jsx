import '../../css/Auction&ExhibitionPreview.css';
import Card from './Card';

function ExhibitionsPreview() {
  const exhibitions = [
    { id: 1, Image:"./src/assets/testImages/download (1).jpg",name: "Impressionist Showcase", status: "Running" },
    { id: 2, Image:"./src/assets/testImages/download (1).jpg" , name: "Abstract Expressions", status: "Upcoming" },
  ];

  return (
    <div className="exhibitions">
      <h2>Exhibitions</h2>
      {exhibitions.map(exhibition => (
        <Card key= {exhibition.id} Image={exhibition.Image} title={exhibition.name} description={`Status: ${exhibition.status}`} />
      ))}
    </div>
  );
}

export default ExhibitionsPreview;
