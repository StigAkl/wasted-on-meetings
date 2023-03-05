import Container from "./Container/Container"

const Loader = () => {
  return (
    <Container variant='gradient'>
      <div className="load-wrapp">
        <div className="load-1">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </Container>
  )
}

export default Loader; 