import { createServer } from 'http';
import Pool from 'pg'
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'leaflet_2020',
  password: '1234',
});

createServer((req, res) => {
  res.write('Hello World!');
  res.end();
}).listen(process.env.PORT);


app.get('/api_province', (req, res) => {
  sql = 'select  pv_th,count(*) ,ST_AsGeoJSON(b.geom) AS geojson \
  from modis_join a  \
  inner join province b on a.pv_th = b.pv_tn \
  group by pv_th ,b.geom order by count desc limit 100 ';
   let jsonFeatures = [];
  db.query(sql).then((data) => {
      var rows = data.rows;
      rows.forEach((e) => {
          let feature = {
              type: 'Feature',
              geometry: JSON.parse(e.geojson),
              properties: e
          };
          jsonFeatures.push(feature);
      });
      let geoJson = {
          type: 'FeatureCollection',
          features: jsonFeatures
      };
      res.status(200).json(geoJson);
  });

});
