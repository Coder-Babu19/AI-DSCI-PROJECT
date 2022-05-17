import { Component } from "react"
import {ListGroup, Tab , Col ,Container , Row , Card , InputGroup , Button , FormControl, ListGroupItem } from 'react-bootstrap';

class Word extends Component {
    
    state = {data : ["Hadith1","Hadith2","Hadith3","Hadith4","Hadith5","Hadith6","Hadith7","Hadith8","Hadith9"], usrInput : '',loading: false};
  render() {
    const {data,usrInput} = this.state;
    const { loading } = this.state;
    this.onInputchange = async (event)=>{
      await this.setState({usrInput : event.target.value});
      console.log(this.state.usrInput);
  };


      const addHadiths = (data) => {
      this.setState({data : data["Hadiths"]});
      Object.entries(this.state.data).map(item => {
        console.log(item[1])
      })
    };


   const handleClick = () => {
    this.setState({ loading: true });
    fetch('/api/post',{
      method: 'POST',
      body: JSON.stringify({
        message: this.state.usrInput
      })
      , headers: { 'Content-Type': 'application/json' }
    }).then(responce => responce.json())
    .then(message => console.log(message))

    fetch('/api/get2').then(responce =>{
      if(responce.ok){
        return responce.json()
      }
    }).then(data => {addHadiths(data)})
    
    setTimeout(() => {
      this.setState({ loading: false });
    }, 20000);

   
  }

   return (
    <Container fluid>
    <Row style={{color: 'green' , textAlign: 'center', padding:25}}>
    <h1 className='home_heading'> <span> Word Search </span> </h1>
    </Row>
  <Row style={{padding:0 ,  textAlign: 'center',margin:5}}>
  <InputGroup className="mb-3 input" style={{width:1420}} >
    <FormControl 
      placeholder="Enter words to search relevant hadith"
      aria-label="Enter words"
      aria-describedby="basic-addon2"
      value={this.state.usrInput}
      onChange={this.onInputchange}
    />

    <Button className="button" onClick={handleClick} disabled={loading}>
    {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {loading && <span>Loading</span>}
          {!loading && <span>Search</span>}
    </Button>
  
  </InputGroup>
  </Row>
  <Row style={{padding:15 , margin:3}}>
  <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
  <Row>
    <Col>
      <ListGroup>
      {data.slice(0,5).map((d)=> {
        return <ListGroup.Item> {d}</ListGroup.Item>
     })}
      </ListGroup>
      <Tab.Content>
        <Tab.Pane eventKey="#link2">
        {data.slice(5,data.length).map((d)=> {
        return <ListGroup.Item> {d}</ListGroup.Item>
     })}
        </Tab.Pane>
      </Tab.Content>
      <ListGroup>
      <ListGroup.Item action href="#link2"> ReadMore </ListGroup.Item>
      </ListGroup>
    </Col>
  </Row>
</Tab.Container>
  
  
  
  
  
  {/* <Card >
  <ListGroup variant="flush">
     {data.slice(0,3).map((d)=> {
        return <ListGroup.Item> {d}</ListGroup.Item>
     })}
  </ListGroup>
</Card> */}
  </Row>

  </Container>
   );
  }
}

export default Word;