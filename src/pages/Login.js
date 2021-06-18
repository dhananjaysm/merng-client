import { gql , useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import {Form, Button} from 'semantic-ui-react'

import { AuthContext } from '../context/auth';

function Login(props) {
    const context = useContext(AuthContext)
    const [errors,setErrors] = useState({});
    const [values, setValues] = useState({
        username:'',
        email:'',
        password: '',
        confirmPassword:''
    })
    const [loginUser,{loading}] = useMutation(LOGIN_USER,{
        update(proxy,result){
            console.log(result)
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(err){
            console.log(errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors);

        },
        variables: values
    })
    const onChange=(event)=>{
        setValues({...values,[event.target.name]:event.target.value})
    }

    const onSubmit =(event)=>{
       event.preventDefault();
       loginUser();
    }

   

    return (
        <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading? 'loading':''}>
          <h1>Login</h1>
          <Form.Input 
          label="username"
          placeholder ="Username"
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username? true : false}
          />
         
           <Form.Input 
          label="password"
          placeholder ="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          error={errors.password? true : false}

          />
         
          <Button type = "submit " primary>Login</Button>

      </Form>
       {Object.keys(errors).length>0 && (

<div className="ui error message">
<ul className="list">
    {Object.values(errors).map(value=>(
        <li key={value}>{value}</li>
    ))}
</ul>
</div>

       )}
        </div>
    )
}

const LOGIN_USER = gql`
mutation login(
    $username:String!
    $password:String!
   
) {
    login(
        
            username: $username
            password: $password
           
        
    ){
        id
        email
        username
        createdAt
        token

    }
}
`
export default Login;
