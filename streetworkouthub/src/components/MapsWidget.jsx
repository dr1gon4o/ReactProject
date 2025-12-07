export default function MapsWidget() {
  return (
    <div className="rgb text-center fs-6" style={{ width: "300%" }}>
      <iframe
        title="map"
        width="100%"
        height="400"
        style={{ border: 0 }}
        src="https://www.openstreetmap.org/export/embed.html?bbox=23.31,42.69,23.33,42.71&layer=mapnik"
      ></iframe>
    </div>
  );
}