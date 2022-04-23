import React from "react";

const IssueSearchBar = React.memo(({ search, onSearch }) => (
  <form>
    <label htmlFor="search">Search Issues</label>
    <input
      type="search"
      id="search"
      name="search"
      value={search}
      placeholder="Search"
      onChange={onSearch}
    />
  </form>
));

export default IssueSearchBar;
