function ArtistHome() {
    const { artistusername } = useParams();
  
    return (
      <div>
        <h1>Welcome, Artist {artistusername}!</h1>
        {/* Additional artist-specific content */}
      </div>
    );
  }
  
  export default ArtistHome;
  