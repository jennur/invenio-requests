// This file is part of InvenioRequests
// Copyright (C) 2022 CERN.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { Component } from "react";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import { Icon } from "semantic-ui-react";

class RequestStatusIcon extends Component {
  render() {
    const { status } = this.props;
    return (
      <Overridable id={`RequestStatusIcon.layout.${status}`} status={status}>
        <Icon name="bars" />
      </Overridable>
    );
  }
}

RequestStatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Overridable.component(
  "InvenioRequests.RequestStatusIcon",
  RequestStatusIcon
);
