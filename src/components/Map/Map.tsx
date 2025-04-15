import Map, { NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const mapUrls = [
  "https://tile.openstreetmap.org.ua/styles/dark-matter-gl-style/style.json",
  "https://tile.openstreetmap.org.ua/styles/osm-bright/style.json",
  "https://tile.openstreetmap.org.ua/styles/positron-gl-style/style.json",
];

async function getStyleName(
  styleUrl: string
): Promise<{ name: string; url: string }> {
  try {
    const response = await fetch(styleUrl);
    const styleData = (await response.json()) as { name: string };
    return {
      url: styleUrl,
      name: styleData.name,
    };
  } catch (error) {
    console.error(`Ошибка при получении стиля ${styleUrl}:`, error);
    // In case of error, return the name extracted from the URL
    return {
      url: styleUrl,
      name: styleUrl.split("/").pop()!,
    };
  }
}

const MapComponent = () => {
  const [mapStyles, setMapStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(mapUrls[0]);

  useEffect(() => {
    const fetchStylesNames = async () => {
      const styles = await Promise.all(mapUrls.map(getStyleName));
      setMapStyles(styles);
      //   console.log(styles);
    };
    fetchStylesNames();
  }, []);

  return (
    <>
      <Popup trigger={<button className="button">Theme</button>}>
        {mapStyles.map((t) => (
          <button
            className="button"
            onClick={() => setSelectedStyle(t)}
            key={t.name}
          >
            {t.name}
          </button>
        ))}
      </Popup>
      <Map
        initialViewState={{
          longitude: 34.98,
          latitude: 48.45,
          zoom: 12,
        }}
        style={{ width: "99dvw", height: "90dvh" }}
        mapStyle={selectedStyle}
      >
        <NavigationControl position="top-right" />
      </Map>
    </>
  );
};

export default MapComponent;
