import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";

import "./editor-styles/Editor.scss";

const Editor = ({ currentNote, updateNote }) => {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="content-desktop pane editor">
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={180}
        heightUnits="vh"
      />
    </section>
  );
};
export default Editor;
