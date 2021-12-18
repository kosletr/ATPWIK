import React, { Component } from "react";
import _ from "lodash";
import "./cards.css"

export class ListCards extends Component {
  render() {
    const { data, Component, cardDetails, extraProps } = this.props;
    if (!data || data.length === 0) return null;

    return (
      <div className="my-card-list">
        {data.map((entry) => {
          const properties = _.pick(entry, cardDetails);
          return (
            <div key={data.indexOf(entry)}>
              <Component {...properties} {...extraProps} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ListCards;
