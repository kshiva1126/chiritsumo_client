import styled from '@emotion/styled'

const Container = styled.div`
  .header {
    margin-top: 1rem;
    color: blue;
  }

  .title {
    text-align: left;
    font-size: 4rem;
  }

  .nav {
    text-align: right;
  }

  .nav ul {
    padding: 0rem;
    margin: 0rem;
  }

  .nav ul li {
    display: inline;
    margin-right: 0.5rem;
  }

  .nav ul li a {
    text-decoration: none;
  }

  .link {
    color: #4183c4;
    cursor: pointer;
  }

  .menu-wrap {
    text-align: right;
  }

  @media screen and (max-width: 600px) {
    .title {
      text-align: center;
      font-size: 2rem;
    }

    .link {
      color: initial;
    }
  }
`

export default Container
