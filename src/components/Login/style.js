import styled from '@emotion/styled'

const Container = styled.div`
  .form {
    background: rgba($form-bg, 0.9);
    padding: 40px;
    max-width: 600px;
    margin: 40px auto;
    border-radius: $br;
    box-shadow: 0 4px 10px 4px rgba($form-bg, 0.3);
  }

  .field-wrap {
    position: relative;
    margin-bottom: 40px;
  }

  .ui.input,
  input {
    font-size: 22px;
    display: block;
    width: 100%;
    height: 100%;
  }

  button {
    border: 0;
    outline: none;
    border-radius: 0;
    padding: 15px 0;
    font-size: 2rem;
    width: 100%;
  }

  .err-msg {
    color: red;
  }
`

export default Container
