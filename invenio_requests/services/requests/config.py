# -*- coding: utf-8 -*-
#
# Copyright (C) 2021 CERN.
# Copyright (C) 2021 Northwestern University.
# Copyright (C) 2021 TU Wien.
#
# Invenio-Requests is free software; you can redistribute it and/or
# modify it under the terms of the MIT License; see LICENSE file for more
# details.

"""Requests service configuration."""

from invenio_records_resources.services import RecordServiceConfig
from invenio_records_resources.services.records.components import DataComponent
from invenio_records_resources.services.records.links import pagination_links

from ...records.api import Request
from ..permissions import PermissionPolicy
from .components import IdentifierComponent
from .customization import RequestsConfigMixin
from .links import RequestLink
from .results import RequestItem, RequestList


class RequestsServiceConfig(RecordServiceConfig, RequestsConfigMixin):
    """Requests service configuration."""

    # common configuration
    permission_policy_cls = PermissionPolicy
    result_item_cls = RequestItem
    result_list_cls = RequestList

    # request-specific configuration
    record_cls = Request  # needed for model queries
    schema = None  # stored in the API classes, for customization
    index_dumper = None

    # links configuration
    links_item = {"self": RequestLink("{+api}/requests/{id}")}
    links_search = pagination_links("{+api}/requests{?args*}")

    components = [
        # Order of components are important!
        DataComponent,
        IdentifierComponent,
    ]