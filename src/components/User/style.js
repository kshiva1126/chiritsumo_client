import styled from '@emotion/styled'

const Container = styled.div`
  .user_container {
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;
  }

  .user_box1 {
    flex-grow: 3;
  }

  .user_name {
    font-size: 1.5rem;
  }

  .edit_profile,
  .follow {
    margin: 4rem 2rem 0 0;
    padding: 0.25rem;
    text-align: right;
    border: solid 2px #7fcfe2;
    border-radius: 1rem;
  }

  .follow {
    color: #4183c4;
    cursor: pointer;
  }

  .circular {
    border: solid 2px #696969;
  }

  .menu {
    display: flex;
  }

  .item {
    margin: 0 1rem 0 0;
  }
`

export default Container
