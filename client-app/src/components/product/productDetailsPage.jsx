import React, { Component } from "react";

export class ProductPage extends Component {
  render() {
    return <h3>This is the product with id: {this.props.match.params.id}</h3>;
  }
}

export default ProductPage;
