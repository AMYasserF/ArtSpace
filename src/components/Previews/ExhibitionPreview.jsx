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
  let photo = null;
  if(exhibitions&&exhibitions.length>0&&exhibitions[0].artworks&&exhibitions[0].artworks.length>0){
    photo = exhibitions[0].artworks[0].photo;
  }

  return (
    <div className="exhibitions">
      <h2>Exhibitions</h2>
      {exhibitions.map(exhibition => (
        <Card key= {exhibition.id} Image={photo} title={exhibition.theme} description={`Status: running`} />
      ))}
    </div>
  );
}

export default ExhibitionsPreview;
