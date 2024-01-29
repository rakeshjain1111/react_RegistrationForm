import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import { Button, Container, Form, Modal,Table} from 'react-bootstrap';
function App() {

  const[show,setShow]=useState("");
  const[allData, setAllData]=useState([{}]);
  const[input, setInput]=useState({name:"",email:"",address:"",contact:""});
  const[btnState, setBtnState]=useState(true);
  const[index,setIndex]=useState(0);
  
  function getInputData(e){
    let target=e.target;
    let value=target.value;
    let key= target.name;
    // console.log(key," ",value);
    return(
      setInput((old) =>{
        return{
          ...old,
          [key]:value
        }
      })
    )
  }

  let temp={}

 const getFormData = (e) => {
    e.preventDefault();
    let form=e.target;
    let formData= new FormData(form);
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
   
  }

  function deleteUser(index){
    let tempdata = [...allData];
    tempdata.splice(index,1);
    return (
      setAllData(tempdata)
    )
  }

  function editData(item){

      //console.log(item);
      setBtnState(false);
      setShow(true);
      setInput(item);
      setIndex(item.index);
  }

  function insertData(e){
    e.preventDefault();
    getFormData(e);
    return(
      setAllData((old) => {
        return[...old,temp]
      }),
      setShow(false),
      setBtnState(true),
      setInput({
        name:"",
        email:"",
        address:"",
        contact:""
      })
    )

  }

  function updateData(e){
      e.preventDefault();
      getFormData(e);
      const tempData =[...allData];
      tempData[index]=temp;
      return(
        setShow(false),
        setAllData(tempData)
      )
  }

  function AddButton(){
    console.log(index);
    return(
      setShow(true),
      setInput({
        name:"",
        email:"",
        address:"",
        contact:""
      }),
      setBtnState(true)
    )
  }

  function Tr({item}){
    return(
      <>
      <tr className='text-center'>
        <td>{item.index+1}</td>
        <td>{item.name}</td>
        <td><img src={item.Profile} width={50} height={50} alt='' className='rounded-circle'></img></td>
        <td>{item.email}</td>
        <td>{item.address}</td>
        <td>{item.contact}</td>
        <td>
          <Button className='me-2' onClick={()=>editData(item)}><i className='fa fa-edit'></i></Button>
          <Button variant='danger' onClick={() =>deleteUser(item.index)}><i className='fa fa-trash'></i></Button>
        </td>
      </tr>
      </>
    )
  }
  
  return (
    <>
       <Container>
        <Button className='mt-4' onClick={AddButton}>Add User&nbsp;
          <i className='fa fa-plus'></i>
        </Button>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              <h2>User Registration</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={btnState ? insertData:updateData} >
              <Form.Group>
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter Your Name" onChange={getInputData} value={input.name}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter Your Email" onChange={getInputData} value={input.email} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Make Password" onChange={getInputData}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" placeholder="Enter Address" onChange={getInputData} value={input.address}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Your Contact</Form.Label>
                <Form.Control type="tel" name="contact" placeholder="Enter Contact Number" onChange={getInputData} value={input.contact}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" name="Profile" placeholder="Enter Profile Photo" />
              </Form.Group>
              <div className='d-flex justify-content-between mt-3'>
                {
                  btnState ? <Button type="submit" variant="primary">Submit</Button> :  <Button type="submit" variant="secondary">Update</Button>
                }
             
              <Button variant="danger" onClick={() => setShow(false)}>Cancel</Button>
              </div>
            </Form>

          </Modal.Body>
          <Modal.Footer>
          
          </Modal.Footer>
        </Modal>
       </Container>
       <Container>
        <h1 className='text-center'>Registration Details</h1>
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