import React, { useState } from "react";

const IssueSearchBar = () => {
  const [query, setQuery] = useState();

  const handleChange = (e) => setQuery(e.currentTarget.value);

  return (
    <form>
      <label htmlFor="search">Search Issues</label>
      <input
        type="search"
        id="search"
        name="search"
        value={query}
        placeholder="Search"
        onChange={handleChange}
      />
    </form>
  );
};

export default IssueSearchBar;
