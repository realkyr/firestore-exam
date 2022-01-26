import React, { useEffect, useState } from 'react'
import { Typography, Radio, Input, Space, Button, Skeleton } from 'antd'
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore'

import { getFirestoreInstance } from 'core/utils/firestore'

const { Title } = Typography

const Edit = () => {
  const [questions, setQuestions] = useState(null)

  const getData = async () => {
    //  TODO: get data from firestore
    const questions = []

    setQuestions(questions)
  }

  useEffect(() => {
    getData()
  }, [])

  const submit = async () => {
    // TODO: complete organize data in to correct format
    const db = getFirestoreInstance()

    const parallelWork = questions.map(question => {
      const id = question.id

      delete question.id

      // TODO: implement update

      return 1
    })

    setQuestions(null)
    await Promise.all(parallelWork)
    await getData()
  }

  const onInput = (index, value, type, choiceIndex) => {
    const tmpQuestions = [...questions]
    const thisQuestion = tmpQuestions[index]

    if (type === 'choices') thisQuestion[type][choiceIndex] = value
    else thisQuestion[type] = value

    setQuestions(tmpQuestions)
  }

  const addNewQuestion = () => {
    const tmp = [...questions, { choices: [] }]

    setQuestions(tmp)
  }

  const addNewChoice = index => {
    const tmpQuestions = [...questions]
    const thisQuestion = tmpQuestions[index]

    thisQuestion.choices = [...thisQuestion.choices, '']

    setQuestions(tmpQuestions)
  }

  const removeChoice = (index, choiceIndex) => {
    const tmpQuestions = [...questions]
    const thisQuestion = tmpQuestions[index]

    thisQuestion.choices.splice(choiceIndex, 1)

    setQuestions(tmpQuestions)
  }

  const removeQuestions = async id => {
    setQuestions(null)

    // TODO: impletement delete data
    const db = getFirestoreInstance()

    await getData()
  }

  return (
    <div className="App">
      <Title level={1}>แก้ไขแบบทดสอบ</Title>

      {questions === null && <Skeleton active />}

      {questions?.map((q, i) => (
        <div style={{ marginBottom: 20 }} key={i}>
          {i + 1}
          {'. '}
          <Input
            style={{ width: '70%' }}
            value={q.question}
            onChange={e => {
              onInput(i, e.target.value, 'question')
            }}
          />
          <Button onClick={() => removeQuestions(q.id)}>- ลบคำถาม</Button>

          <Radio.Group onChange={e => onInput(i, e.target.value, 'correct')} value={q.correct}>
            <Space style={{ marginTop: 5 }} direction="vertical">
              {q.choices.map((c, ci) => (
                <Radio key={`${i}-choices`} value={c}>
                  <Input style={{ width: '60%' }} onChange={e => onInput(i, e.target.value, 'choices', ci)} value={c} />
                  <Button onClick={() => removeChoice(i, ci)}>- ลบ</Button>
                </Radio>
              ))}

              <Button onClick={() => addNewChoice(i)}>+ เพิ่มตัวเลือก</Button>
            </Space>
          </Radio.Group>
        </div>
      ))}

      <Button style={{ marginTop: 20 }} onClick={addNewQuestion}>
        + เพิ่มคำถาม
      </Button>
      <Button style={{ marginTop: 20, display: 'block' }} onClick={submit}>
        บันทึก
      </Button>
    </div>
  )
}

export default Edit
