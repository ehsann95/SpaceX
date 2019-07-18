import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  return (
    <>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      <Query query={LAUNCHES_QUERY}>
        {({ error, loading, data }) => {
          if (loading)
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  
                }}
              >
                <div
                  class="spinner-grow text-info"
                  style={{ width: "8rem", height: "8rem" }}
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            );
          if (error) console.log(error);

          return (
            <>
              {data.launches.map(launch => (
                <LaunchItem key={launch.flight_number} launch={launch} />
              ))}
            </>
          );
        }}
      </Query>
    </>
  );
};

export default Launches;
