import React, { useState, useCallback } from "react";
import { useQuery } from "react-query";
import Fuse from "fuse.js";

import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import IssueSearchBar from "../components/IssueSearchBar";

// =============================================================================
// Constants
// =============================================================================

const API_URI = "/api/issues";

// =============================================================================
// Hooks
// =============================================================================

const useHomeProps = () => {
  const [query, setQuery] = useState("");
  const [labelFilter, setLabelFilter] = useState("");

  // fetch issues
  const issuesQuery = useQuery(
    ["issues"],
    async () => await (await fetch(API_URI)).json()
  );
  const { isLoading, isFetching, error } = issuesQuery;
  const issues = issuesQuery.data ?? [];
  const loading = isLoading || isFetching;

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
  const filteredResult = labelFilter
    ? result.filter((i) => i.labels.includes(labelFilter))
    : result;

  const handleSearch = useCallback(
    (e) => {
      if (labelFilter) setLabelFilter("");
      setQuery(e.currentTarget.value);
    },
    [labelFilter, setLabelFilter, setQuery]
  );

  return {
    loading,
    error,
    data: filteredResult,
    query,
    setLabelFilter,
    handleSearch,
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
        <LabelList setLabelFilter={props.setLabelFilter} />
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
