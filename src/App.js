import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import { Button, Container, Form, Modal,Table} from 'react-bootstrap';
function App() {

  const[show,setShow]=useState(true);
  const[allData, setAllData]=useState([{}]);
  
 const getFormData = (e) => {
    e.preventDefault();
    let form=e.target;
    let formData= new FormData(form);
    // console.log(formData);
    console.log(formData.get("name"));
    console.log(formData.get("email"));
    console.log(formData.get("Profile"));
    console.log(formData.get("address"));
    console.log(formData.get("contact"));
  
  
     
    let temp={}

    for(let data of formData.entries())
    {
      let key = data[0];
      let value =data[1];

      if(typeof(value)=='object')
      {
        value=URL.createObjectURL(value)
      }

      temp[key] =value;

     
    }
    return(
      setAllData((old) => {
        return[...old,temp]
      }),
      setShow(false)
    )
  }

  function deleteUser(index){
    let tempdata = [...allData];
    tempdata.splice(index,1);
    return (
      setAllData(tempdata)
    )
  }

  function Tr({item}){
    return(
      <>
      <tr className='text-center'>
        <td>{item.index+1}</td>
        <td>{item.name}</td>
        <td><img src={item.Profile} width={50} height={50} className='rounded-circle'></img></td>
        <td>{item.email}</td>
        <td>{item.address}</td>
        <td>{item.contact}</td>
        <td>
          <Button className='me-2'><i className='fa fa-edit'></i></Button>
          <Button variant='danger' onClick={() =>deleteUser(item.index)}><i className='fa fa-trash'></i></Button>
        </td>
      </tr>
      </>
    )
  }
  
  return (
    <>
       <Container>
        <Button className='mt-4' onClick={() => setShow(true)}>Add User&nbsp;
          <i className='fa fa-plus'></i>
        </Button>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              <h2>User Registration</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={getFormData} >
              <Form.Group>
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter Your Name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter Your Email" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Make Password" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" placeholder="Enter Address" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Your Contact</Form.Label>
                <Form.Control type="tel" name="contact" placeholder="Enter Contact Number" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" name="Profile" placeholder="Enter Profile Photo" />
              </Form.Group>
              <div className='d-flex justify-content-between mt-3'>
              <Button type="submit" variant="primary">Submit</Button>
              <Button variant="danger" onClick={() => setShow(false)}>Cancel</Button>
              </div>
            </Form>

          </Modal.Body>
          <Modal.Footer>
          
          </Modal.Footer>
        </Modal>
       </Container>
       <Container>
       <Table striped bordered hover>
        <thead>
        <tr className='text-center'>
          <th>SNo.</th>
          <th>Full Name</th>
          <th>Profile</th>
          <th>Email</th>
          <th>Address</th>
          <th>Contact</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {
          allData.map((item,index)=>{
            item['index']=index;
            return <Tr item={item} key={index}/>
          })
         } 
        </tbody>
        </Table>
       </Container>
   </>
  )
}

export default App;