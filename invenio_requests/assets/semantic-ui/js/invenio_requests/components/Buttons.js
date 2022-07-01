// This file is part of InvenioRequests
// Copyright (C) 2022 CERN.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.
import { i18next } from "@translations/invenio_requests/i18next";

import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";

export const SaveButton = (props) => (
  <Button
    icon="save"
    positive
    size="mini"
    content={i18next.t("Save")}
    {...props}
  />
);

export const RequestDeclineButton = ({
  onClick,
  loading,
  ariaAttributes,
  size,
  className,
}) => {
  return (
    <Button
      icon="cancel"
      content={i18next.t("Decline")}
      onClick={onClick}
      loading={loading}
      disabled={loading}
      negative
      size={size}
      className={className}
      {...ariaAttributes}
    />
  );
};

export const RequestAcceptButton = ({
  onClick,
  requestType,
  loading,
  ariaAttributes,
  size,
  className,
}) => {
  const requestIsCommunitySubmission = requestType === "community-submission";
  const buttonText = requestIsCommunitySubmission
    ? i18next.t("Accept and publish")
    : i18next.t("Accept");
  return (
    <Button
      icon="checkmark"
      content={buttonText}
      onClick={onClick}
      positive
      loading={loading}
      disabled={loading}
      size={size}
      className={className}
      {...ariaAttributes}
    />
  );
};

/* Cancel Buttons */
export const CancelButton = React.forwardRef((props, ref) => {
  useEffect(() => {
    ref?.current?.focus();
  }, []);

  return (
    <Button
      ref={ref}
      icon="cancel"
      content={i18next.t("Cancel")}
      size="mini"
      {...props}
    />
  );
});

export const RequestCancelButton = ({
  onClick,
  loading,
  ariaAttributes,
  size,
  className,
  content = i18next.t("Cancel"),
}) => {
  return (
    <Button
      icon="cancel"
      content={content}
      onClick={onClick}
      loading={loading}
      disabled={loading}
      size={size}
      className={className}
      {...ariaAttributes}
    />
  );
};

export const RequestCancelButtonModal = ({
  onClick,
  loading,
  ariaAttributes,
  size,
}) => (
  <RequestCancelButton
    onClick={onClick}
    loading={loading}
    size={size}
    content={i18next.t("Cancel request")}
    className="negative"
    {...ariaAttributes}
  />
);
