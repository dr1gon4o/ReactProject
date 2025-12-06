export default function MapsWidget() {
  return (
    <div className="p-3 border border-primary rounded" style={{ width: "280px", height: "280px" }}>
      <h6 className="text-primary">Location Map</h6>
      <iframe
        title="map"
        width="100%"
        height="200"
        style={{ border: 0 }}
        src="https://www.openstreetmap.org/export/embed.html?bbox=23.31,42.69,23.33,42.71&layer=mapnik"
      ></iframe>
    </div>
  );
}