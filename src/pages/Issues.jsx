import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";

import { defaultIssue, defaultLabels } from "../helpers/defaultData";


const Issues = () => {
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList issues={[defaultIssue]}/>
        </section>
        <aside>
          <LabelList labels={defaultLabels}/>
        </aside>
      </main>
    </div>
  );
}

export default Issues;
