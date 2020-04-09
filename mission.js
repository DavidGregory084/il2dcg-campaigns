import outdent from 'outdent';

const makeChiefs = routes => {
  const chiefs = routes.map((route, idx) => {
    return `  ${idx}_Chief Vehicles.GermanyCarsColumnA 2`
  }).join("\n");

  return outdent`
    [Chiefs]
    ${chiefs}`;
};

const makeRoadRoutes = routes => {
  const roadRoutes = routes.map((route, idx) => {
    const waypoints = route.waypoints.map(waypoint => {
      return `  ${waypoint.join(" ")}`;
    }).join("\n");
  
    return outdent`
      [${idx}_Chief_Road]
      ${waypoints}`
  });

  return roadRoutes.join("\n");
};

export const makeMission = (mapName, routes) => {
  const chiefs = makeChiefs(routes);
  const roadRoutes = makeRoadRoutes(routes);

  return outdent`
    [MAIN]
      MAP ${mapName}/load.ini
      TIME 12.0
      CloudType 0
      CloudHeight 1000.0
      army 2
      playerNum 0
    ${chiefs}
    ${roadRoutes}
    [NStationary]
    [Buildings]
    [Bridge]
    [House]`;
};