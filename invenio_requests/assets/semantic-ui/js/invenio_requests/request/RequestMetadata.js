// This file is part of InvenioRequests
// Copyright (C) 2022 CERN.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import { i18next } from "@translations/invenio_requests/i18next";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Image } from "react-invenio-forms";
import Overridable from "react-overridable";
import { Divider, Header, Label } from "semantic-ui-react";
import { timestampToRelativeTime } from "../utils";
import RequestStatusIcon from "./RequestStatusIcon";

const User = ({ user }) => (
  <>
    <Image src={user.links.avatar} avatar rounded />
    <span>{user.profile?.full_name || user.username}</span>
  </>
);
const Community = ({ community }) => (
  <>
    <Image src={community.links.logo} wrapped size="mini" className="mr-5" />
    <a href={`/communities/${community.slug}`}>{community.metadata.title}</a>
  </>
);

const UserOrCommunity = ({ userData, details }) => {
  const isUser = "user" in userData;
  const isCommunity = "community" in userData;

  if (isUser) {
    return <User user={details} />;

  } else if (isCommunity) {
    return <Community community={details} />;

  } else {
    // default unknown created_by
    return (
      <>
        <Image src="/static/images/square-placeholder.png" avatar rounded />
        <span>{userData.user?.id || userData.community?.id}</span>
      </>
    );
  }
};

class RequestMetadata extends Component {
  render() {
    const { request } = this.props;

    return (
      <Overridable id="InvenioRequest.RequestMetadata.Layout" request={request}>
        <>
          <Header as="h3" size="tiny">{i18next.t("Requestor")}</Header>
          <UserOrCommunity userData={request.created_by} details={request.expanded?.created_by}/>
          <Divider />

          <Header as="h3" size="tiny">{i18next.t("Receiver")}</Header>
          <UserOrCommunity userData={request.receiver} details={request.expanded?.receiver}/>
          <Divider />

          <Header as="h3" size="tiny">{i18next.t("Request type")}</Header>
          <Label>{request.type}</Label>
          <Divider />

          <Header as="h3" size="tiny">{i18next.t("Status")}</Header>
          <RequestStatusIcon status={request.status} />
          {request.status}
          <Divider/>

          <Header as="h3" size="tiny">{i18next.t("Created")}</Header>
          {timestampToRelativeTime(request.created)}

          {request.expires_at && (
            <>
              <Divider />
              <Header as="h3" size="tiny">
                {i18next.t("Expires")}
              </Header>
              {timestampToRelativeTime(request.expires_at)}
            </>
          )}
          <Divider hidden />
        </>
      </Overridable>
    );
  }
}

RequestMetadata.propTypes = {
  request: PropTypes.object.isRequired,
};

export default Overridable.component(
  "InvenioRequests.RequestMetadata",
  RequestMetadata
);
