import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Moment from "react-moment";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = props => {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);
  return (
    <>
      <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <div
                  class="spinner-grow text-info my-3"
                  style={{ width: "6rem", height: "6rem" }}
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            );
          if (error) console.log(error);

          const {
            flight_number,
            mission_name,
            launch_year,
            launch_date_local,
            launch_success,
            rocket: { rocket_id, rocket_name, rocket_type }
          } = data.launch;
          console.log(data);
          return (
            <div>
              <h1 className="display-4 my-3">
                <span className="text-light">Mission: </span> {mission_name}
              </h1>
              <h4 className="mb-3">Launch Details</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  Flight Number: {flight_number}
                </li>
                <li className="list-group-item">Launch Year: {launch_year}</li>
                <li className="list-group-item">
                  Launch Success:{" "}
                  <span
                    className={classNames({
                      "text-sucess": launch_success,
                      "text-danger": !launch_success
                    })}
                  >
                    {launch_success ? "Yes" : "No"}
                  </span>
                </li>
                <li className="list-group-item">
                  Launch Date:{" "}
                  <Moment format="DD-MM-YYYY HH-mm">{launch_date_local}</Moment>
                </li>
              </ul>

              <h4 className="mb-3">Rocket Details</h4>
              <ul className="list-group">
                <li className="list-group-item">Rocket ID: {rocket_id}</li>
                <li className="list-group-item">Rocket Name: {rocket_name}</li>
                <li className="list-group-item">Rocket Type: {rocket_type}</li>
              </ul>
              <hr />
              <Link to="/" className="btn btn-secondary ">
                Back
              </Link>
            </div>
          );
        }}
      </Query>
    </>
  );
};
export default Launch;
