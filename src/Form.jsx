 import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yop from 'yup' 

const MyTextInput = ({label, ...props}) => {
    const [ field, meta ] = useField(props)

    return (
    <>
        <label htmlFor={props.name}>{label}</label>
        <input {...props} {...field}  />
        {meta.touched && meta.error ? (<div className='error'>{meta.error}</div>)
        : null}
    </>
    )
}

const MyCheckBox = ({children, ...props}) => {
    const [ field, meta ] = useField({...props, type: 'checkbox'})

    return (
    <>
        <label className="checkbox">
            <input type="checkbox" {...props} {...field} />
            {children}
        </label>

        {meta.touched && meta.error ? (<div className='error'>{meta.error}</div>)
        : null}
    </>
    )
}

const CustomForm = () => {
    return (
        <Formik
            initialValues = {{
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false,
            }}
            validationSchema = { Yop.object({
                name: Yop.string()
                        .min(3, 'Минимум 3 символа!')
                        .required('Обязательное поле!'),
                email: Yop.string()
                        .email('Неравильный email адрес!')
                        .required('Обязательное поле!'),
                amount: Yop.number()
                        .min(5, 'Не меннее 5')
                        .required('Обязательное поле!'),
                currency: Yop.string()
                        .required('Выберете валюту'),
                text:   Yop.string()
                        .min(10,'НЕ менее 10 символов'),
                terms:  Yop.boolean()
                        .required('Необходимо согласие!')
                        .oneOf([true], 'Необходимо согласие!')
            })}
            onSubmit = { values => console.log( JSON.stringify(values, null, 2) ) }
        >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextInput 
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"
                />
                <MyTextInput
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"
                />
                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage name='amount' component='div' className='error'/>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select"
                >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage name='currency' component='div' className='error'/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage name='text' component='div' className='error'/>

                <MyCheckBox
                    name="terms">
                    Соглашаетесь с политикой конфиденциальности?
                </MyCheckBox>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;