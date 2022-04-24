import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import Fuse from "fuse.js";

import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import IssueSearchBar from "../components/IssueSearchBar";
import StatusSelect from "../components/StatusSelect";

// =============================================================================
// Hooks
// =============================================================================

const useHomeProps = () => {
  const [query, setQuery] = useState("");
  /**
   * { type: "label" | "status", value?: string }
   * @dev: if we wanted to we could easily filter by multiple filters. too lazy atm tho
   */
  const [filterConfig, setFilterConfig] = useState(undefined);

  // fetch issues
  const issuesQuery = useQuery(
    ["issues"],
    async () => await (await fetch("/api/issues")).json()
  );
  const issues = issuesQuery.data ?? [];

  const fuse = new Fuse(issues, {
    keys: [
      {
        name: "title",
        weight: 0.5,
      },
      {
        name: "labels",
        weight: 0.3,
      },
      {
        name: "status",
        weight: 0.2,
      },
    ],
  });
  const result = query ? fuse.search(query).map((issue) => issue.item) : issues;
  const filteredResult = filterConfig
    ? result.filter((item) => {
        switch (filterConfig.type) {
          case "label":
            return item.labels?.includes(filterConfig.value);
          case "status":
            const val = filterConfig.value === "";
            return item.status?.includes(filterConfig.value);
        }
      })
    : result;

  const handleSearch = useCallback(
    (e) => {
      if (filterConfig) setFilterConfig(undefined);
      setQuery(e.currentTarget.value);
    },
    [filterConfig, setFilterConfig, setQuery]
  );

  const handleStatusSelection = useCallback(
    (e) => {
      const { id, value } = e.currentTarget;
      const val = value.toLowerCase();
      // we could handle split statues better but meh
      const formattedVal = val === "in progress" ? "inProgress" : val;
      setFilterConfig({ type: id, value: formattedVal });
    },
    [setFilterConfig]
  );

  return {
    loading: !issuesQuery.isFetched,
    error: issuesQuery.error,
    data: filteredResult,
    query,
    setFilterConfig,
    handleSearch,
    handleStatusSelection,
  };
};

// =============================================================================
// Stateless Home
// =============================================================================

const StatelessHome = (props) => (
  <div>
    <main>
      <section>
        <div>
          <IssueSearchBar search={props.query} onSearch={props.handleSearch} />
          <IssuesList
            data={props.data}
            loading={props.loading}
            error={props.error}
          />
        </div>
      </section>
      <aside>
        <LabelList setFilterConfig={props.setFilterConfig} />
        <StatusSelect handleStatusSelection={props.handleStatusSelection} />
        <hr />
      </aside>
    </main>
  </div>
);

// =============================================================================
// Home
// =============================================================================

const Home = () => {
  const props = useHomeProps();
  return <StatelessHome {...props} />;
};

export default Home;
