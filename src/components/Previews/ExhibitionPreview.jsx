import '../../css/Auction&ExhibitionPreview.css';
import Card from './Card';
import { useState, useEffect } from 'react';
import axios from 'axios';
function ExhibitionsPreview() {
  const [exhibitions, setExhibitions] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/exhibition').then((response) => {
      setExhibitions(response.data);
      console.log(response.data);
    }
    ).catch((err) => {
      console.error('Error fetching exhibitions', err);
    });
  }, []);

  return (
    <div className="exhibitions">
      <h2>Exhibitions</h2>
      {exhibitions.map(exhibition => (
        <Card key= {exhibition.id} Image={exhibition.artworks[0].photo||null} title={exhibition.theme} description={`Status: running`} />
      ))}
    </div>
  );
}

export default ExhibitionsPreview;
