import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import IssueSearchBar from "../components/IssueSearchBar";

import { defaultIssue, defaultLabels } from "../helpers/defaultData";

const Home = () => {
  return (
    <div>
      <main>
        <section>
          <div>
            <IssueSearchBar />
            <IssuesList issues={[defaultIssue]} />
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
