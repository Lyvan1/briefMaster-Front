import React from 'react'
import {Button, Col, Row} from 'antd'
import errorImg from './errorImg.png'

const Error404 = () => {
  {console.log('test')}
  return (
      <>
          <Row justify={'center'}>
              <Col span={14}>
                  <img src={errorImg} alt={'Page Introuvable'} />
              </Col>
          </Row>
          <Row justify={'center'} >
              <Col span={24}>
                  <h1 className={'text-center text-white text-8xl'}>Oups !</h1>
              </Col>
              <Col span={24} align={'center'} className={'mt-5'}>
                  <Button>Retournez en lieu sûr</Button>
              </Col>
          </Row>
      </>

  )
}

export default Error404