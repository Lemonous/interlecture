import React from 'react';
import {Button,Form,FormControl,InputGroup} from 'react-bootstrap';
import InputForm from '../questions/inputForm';

const MainPanel = () => (
  <div
    style={{
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '50px',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '6px',
      paddingTop: '10px',
      backgroundColor: '#fff',
      fontSize: '25px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <a href="/">Interlecture </a>
    </div>
    
    <div>
      {window.django2react.classroom.name}
      [{window.django2react.classroom.lecturer}]
    </div>
    
    <div style={{width: '300px'}}>
      <InputForm
        onSubmit={(event)=>{window.location.href=window.location.origin+'/course/'+event.value;}}
        id={'gotoCourse'}
        placeholder={'Course name'}
        submitButtonText={'Goto'}
      />
    </div>
    
    
    <div style={{float: 'right',display: 'flex'}}>
      <div style={{paddingRight: '20px'}}>{window.django2react.my_uname}</div>
      <Button href="/logout">Logout</Button>
    </div>
  </div>);


export default MainPanel;
