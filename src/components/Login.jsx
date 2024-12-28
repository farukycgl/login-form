
import { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label, Button, Card, CardBody, CardHeader, FormFeedback } from "reactstrap";

const initialValues = {
    email: "",
    password: "",
}
const errorMessages = {
    email: "Geçerli bir email adresi giriniz.",
    password: "En az 8 karakter, en az 1 büyük harf, en az 1 küçük harf, en az bir sembol ve en az 1 rakam içermelidir."
};

export default function Login() {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const [isValid, setIsValid] = useState(false);

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

      let regex = 
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

useEffect(()=> {

if(validateEmail(formData.email) && regex.test(formData.password)) {
    setIsValid(true)
} else {
    setIsValid(false);
}
}, [formData])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
        if(name=="email") {
            if(validateEmail(value)){
                setErrors({...errors, [name]: false})
            }else{
                setErrors({...errors, [name]: true})
            }
        }
        if(name=="password") {
            if(regex.test(value)){
                setErrors({...errors, [name]: false})
            }else{
                setErrors({...errors, [name]: true})
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!isValid) return; 
    }

    return <Card>
        <CardHeader>
            Kayıt Ol
        </CardHeader>
        <CardBody>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="Email adresinizi giriniz"
                        type="email"
                        onChange={handleChange}
                        value={formData.email}
                        invalid={errors.email}
                    />
                    {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
                </FormGroup>
                <FormGroup>
                    <Label for="password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Şifrenizi giriniz"
                        type="password"
                        onChange={handleChange}
                        value={formData.password}
                        invalid={errors.password}
                    />
                    {errors.password && <FormFeedback>{errorMessages.password}</FormFeedback>}
                </FormGroup>
                <FormGroup check>
                    <Input type="checkbox" />
                    <Label check>
                        Şartları kabul ediyorum
                    </Label>
                </FormGroup>
                <Button disabled={!isValid}>
                    Kayıt Ol
                </Button>
            </Form>
        </CardBody>
    </Card>
}