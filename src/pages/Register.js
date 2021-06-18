import { gql , useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import {Form, Button} from 'semantic-ui-react'
import { AuthContext } from '../context/auth';
function Register(props) {
    const context = useContext(AuthContext)
    const [errors,setErrors] = useState({});
    const [values, setValues] = useState({
        username:'',
        email:'',
        password: '',
        confirmPassword:''
    })
    const [addUser,{loading}] = useMutation(REGISTER_USER,{
        update(proxy,result){
            console.log(result)
            context.login(result.data.register)
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
       addUser();
    }

   

    return (
        <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading? 'loading':''}>
          <h1>Register</h1>
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
          label="email"
          placeholder ="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          error={errors.email? true : false}

          />
           <Form.Input 
          label="password"
          placeholder ="Password"
          name="password"
          type="password"
          onChange={onChange}
          error={errors.password? true : false}

          />
           <Form.Input 
          label="confirmPassword"
          placeholder ="ConfirmPassword"
          name="confirmPassword"
          type="password"
          onChange={onChange}
          error={errors.confirmPassword? true : false}

          />
          <Button type = "submit " primary>Register</Button>

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

const REGISTER_USER = gql`
mutation register(
    $username:String!
    $email:String!
    $password:String!
    $confirmPassword:String!
) {
    register(
        registerInput:{
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword

            
        }
    ){
        id
        email
        username
        createdAt
        token

    }
}
`
export default Register;
