import Map, { NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  const [mapStyles, setMapStyles] = useState<{ name: string; url: string }[]>(
    []
  );
  const [selectedStyle, setSelectedStyle] = useState(mapUrls[0]);

  useEffect(() => {
    const fetchStylesNames = async () => {
      const styles = await Promise.all(mapUrls.map(getStyleName));
      setMapStyles(styles);
    };
    fetchStylesNames();
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          longitude: 34.98,
          latitude: 48.45,
          zoom: 12,
        }}
        style={{ width: "100%", height: "85vh" }}
        mapStyle={selectedStyle}
      >
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          size="small"
        >
          <InputLabel id="demo-simple-select-label">Theme</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            defaultValue={selectedStyle}
          >
            {mapStyles.map((t: { name: string; url: string }) => (
              <MenuItem
                value={t.url}
                className="button"
                onClick={() => setSelectedStyle(t.url)}
                key={t.name}
              >
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <NavigationControl position="top-right" />
      </Map>
    </>
  );
};

export default MapComponent;
