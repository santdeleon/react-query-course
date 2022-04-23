import React, { useState } from "react";
import { useQuery } from "react-query";
import Fuse from "fuse.js";

import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import IssueSearchBar from "../components/IssueSearchBar";

import { defaultLabels } from "../helpers/defaultData";

const API_URI = "/api/issues";

const Home = () => {
  const [query, setQuery] = useState("");

  // fetch issues
  const fetchIssues = async () => await (await fetch(API_URI)).json();
  const issuesQuery = useQuery(["issues"], fetchIssues);
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

  const handleSearch = (e) => setQuery(e.currentTarget.value);

  return (
    <div>
      <main>
        <section>
          <div>
            <IssueSearchBar search={query} onSearch={handleSearch} />
            <IssuesList data={result} loading={loading} error={error} />
          </div>
        </section>
        <aside>
          <LabelList labels={defaultLabels} />
        </aside>
      </main>
    </div>
  );
};

export default Home;
