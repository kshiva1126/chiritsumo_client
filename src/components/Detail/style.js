import styled from '@emotion/styled'

const Container = styled.div`
  h1.ui.header {
    font-size: 3rem;
  }

  button.ui.mini.button {
    margin-right: 10px;
    font-size: 0.7rem;
  }

  .ui.container {
    margin: 3rem 0 3rem 0;
  }

  .page-header {
    color: #fff;
    background: #191818;
    margin: 0;
    padding: 10px 20px;
  }

  .editor-pane {
    position: fixed;
    top: 57px;
    left: 0;
    bottom: 0;
    width: 50%;
    height: auto;
    overflow: auto;
    box-shadow: -10px 2px 6px 10px rgba(0, 0, 0, 0.4);
  }

  .result-pane > div {
    position: fixed;
    top: 57px;
    right: 0;
    left: 50%;
    bottom: 0;
    overflow: auto;
    padding: 10px;
    padding-left: 20px;
    color: #444;
    font-family: Georgia, Palatino, 'Palatino Linotype', Times,
      'Times New Roman', serif;
    font-size: 16px;
    line-height: 1.5em;
  }

  .editor textarea {
    padding: 20px;
  }

  .editor-pane textarea {
    min-height: 500px;
  }

  .markdown-controls {
    position: relative;
    z-index: 5;
    text-align: right;
    color: #fff;
    float: right;
  }

  .markdown-controls form {
    background-color: rgba(39, 40, 34, 0.5);
    margin-right: 20px;
  }

  .markdown-controls legend {
    border-bottom: 0;
    color: #fff;
    font-size: 1.25em;
    margin: 0;
    padding: 10px 0 0 0;
  }

  .CodeMirror {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    height: auto;
    font-size: 16px;
  }

  pre {
    border: 1px solid #ccc;
    background-color: black !important;
  }

  blockquote {
    color: #666;
    margin: 0;
    padding-left: 3em;
    border-left: 0.5em #eee solid;
  }

  tr {
    border-top: 1px solid #c6cbd1;
    background: #fff;
  }

  th,
  td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  table tr:nth-child(2n) {
    background: #f6f8fa;
  }

  .menu {
    margin-top: 3rem;
    display: flex;
  }

  .wrap_menu {
    margin-right: 1rem;
  }

  .edit {
    margin-left: auto;
    color: #4183c4;
    cursor: pointer;
    padding: 0 0.25rem 0 0.25rem;
    border: solid 2px #7fcfe2;
    border-radius: 1rem;
  }

  @media screen and (max-width: 600px) {
    h1.ui.header {
      font-size: 2rem;
    }

    h1 {
      font-size: 1.75rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1.25rem;
    }

    h4 {
      font-size: 1rem;
    }

    .menu {
      margin-top: 3rem;
      display: flex;
      font-size: 0.5rem;
    }

    .wrap_menu {
      margin-right: 0.75rem;
    }
  }
`

export default Container
