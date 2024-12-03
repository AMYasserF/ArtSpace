import '../../css/CardComp.css';

function Card(props) {
  return (
    <div className="card">
        <img src={props.Image} alt="Card Image"></img>
        <div className="card-content">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      </div>
    </div>
  );
}

export default Card;
