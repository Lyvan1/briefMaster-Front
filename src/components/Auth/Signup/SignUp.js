import React from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { FaUser, FaLock, FaHashtag, FaBuilding, FaLocationDot } from 'react-icons/fa6'
const SignUp = () => {
  return (
    <Row justify={'center'} align={'middle'} className={'bg-white'}>
      <Col md={{ flex: '50%', order: '1' }} xs={{ flex: '100%', order: '2' }}
           sm={{ flex: '100%', order: '2' }}>
        <div className={'justify-center'}>
          <div>
            <h1
              className={'text-5xl font-extrabold text-center mb-12'}>SignUp</h1>
          </div>
        </div>
        <Form
          name="signUp"
          //onFinish={} // Appel de la fonction de rappel lors de la soumission du formulaire
          initialValues={{ remember: true }}
          autoComplete="on"
          preserve
        >
          <div className={'px-5'}>
            <Form.Item
              name="companyName"
              wrapperCol={{ span: 24 }}
              hasFeedback
              //validateStatus={errors.name ? 'error' : ''} // Statut de validation du champ
              //help={errors.email} // Message d'erreur affiché à côté du champ en cas d'erreur
            >
              <Input prefix={<FaBuilding/>}
                     placeholder="Company Name"
                     size="large"
                //onChange={}
              />
            </Form.Item>
          </div>

          <div className={'px-5'}>

            <Form.Item
              name="companyRegistrationNumber"
              wrapperCol={{ span: 24 }}
              hasFeedback
              //validateStatus={errors.name ? 'error' : ''} // Statut de validation du champ
              //help={errors.email} // Message d'erreur affiché à côté du champ en cas d'erreur
            >
              <Input prefix={<FaHashtag/>}
                     placeholder="Company Registration Number"
                     size="large"
                //onChange={}
              />
            </Form.Item>
          </div>
          <div className={'px-5'}>
            <Form.Item
              name="vatNumber"
              wrapperCol={{ span: 24 }}
              hasFeedback
              //validateStatus={errors.name ? 'error' : ''} // Statut de validation du champ
              //help={errors.email} // Message d'erreur affiché à côté du champ en cas d'erreur
            >
              <Input prefix={<FaHashtag/>}
                     placeholder="VAT Number"
                     size="large"
                //onChange={}
              />
            </Form.Item>
          </div>
          <div className={'px-5'}>
            <Form.Item
              name="country"
              wrapperCol={{ span: 24 }}
              hasFeedback
              //validateStatus={errors.name ? 'error' : ''} // Statut de validation du champ
              //help={errors.email} // Message d'erreur affiché à côté du champ en cas d'erreur
            >
              <Input prefix={<FaLocationDot/>}
                     placeholder="Country"
                     size="large"
                //onChange={}
              />
            </Form.Item>
          </div>
          <div className={'px-5'}>
            <Form.Item
              name="address"
              wrapperCol={{ span: 24 }}
              hasFeedback
              //validateStatus={errors.name ? 'error' : ''} // Statut de validation du champ
              //help={errors.email} // Message d'erreur affiché à côté du champ en cas d'erreur
            >
              <Input prefix={<FaLocationDot/>}
                     placeholder="Address"
                     size="large"
                //onChange={}
              />
            </Form.Item>
          </div>
          <div className="flex md:flex-row sm:flex-row flex-col px-5 ">
            <div className="md:w-1/2 sm:w-full w-full mr-1">
              <Form.Item
                name="zipCode"
                wrapperCol={{ span: 24 }}
                hasFeedback
                //validateStatus={errors.name ? 'error' : ''} // Statut de validation du champ
                //help={errors.email} // Message d'erreur affiché à côté du champ en cas d'erreur
              >
                <Input prefix={<FaLocationDot/>}
                       placeholder="Zip Code"
                       size="large"
                  //onChange={}
                />
              </Form.Item>
            </div>
            <div className="md:w-1/2 sm:w-full w-full ml-1">
              <Form.Item
                name="city"
                wrapperCol={{ span: 24 }}
                hasFeedback
                //validateStatus={errors.name ? 'error' : ''} // Statut de validation du champ
                //help={errors.email} // Message d'erreur affiché à côté du champ en cas d'erreur
              >
                <Input prefix={<FaLocationDot/>}
                       placeholder="City"
                       size="large"
                  //onChange={}
                />
              </Form.Item>
            </div>
          </div>
          <div>
            <div className={'text-right'}>
              <Form.Item className={'px-5'}>
                <Button type="primary" htmlType="submit" className="signUp-form-button">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>

      </Col>

      <Col md={{ flex: '50%', order: '1' }} xs={{ flex: '100%', order: '2' }}
           sm={{ flex: '100%', order: '2' }}>
        <div
          className="h-96 bg-cover bg-center bg-no-repeat "
          style={{
            backgroundImage: 'url("https://cdn.pixabay.com/photo/2020/02/11/10/24/sea-4839056_1280.jpg")',
            height: '600px',
          }}
        ></div>
      </Col>

    </Row>
  )
}

export default SignUp