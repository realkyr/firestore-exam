import React, { useEffect, useState } from 'react'
import { Typography, Radio, Space, Button, Skeleton } from 'antd'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

import { getFirestoreInstance } from 'core/utils/firestore'

const { Title } = Typography

const Home = () => {
  const [answers, setAnswers] = useState({})
  const [questions, setQuestions] = useState(null)

  useEffect(() => {
    //  TODO: get initial data from firestore
    const didMount = async () => {
      const db = getFirestoreInstance()
      const querySnapshot = await getDocs(collection(db, 'questions'))
      const questions = []

      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        questions.push({
          id: doc.id,
          ...doc.data(),
        })
      })

      setQuestions(questions)
    }

    didMount()
  }, [])

  const onChange = (id, choice) => {
    // TODO: complete change value in state
    setAnswers({
      ...answers, // merge remaining answer
      [id]: choice, // add new key refering id
    })
  }

  const submit = async () => {
    // TODO: complete organize data in to correct format
    const db = getFirestoreInstance()
    const ids = Object.keys(answers)

    const parallelWork = ids.map(id => setDoc(doc(db, 'answers', id), { answer: answers[id] }))

    await Promise.all(parallelWork)
  }

  return (
    <div className="App">
      <Title level={1}>
        แบบทดสอบ จาก Yora <Link to="/edit">แก้ไข</Link>
      </Title>

      {questions === null && <Skeleton active />}

      {questions?.map((q, i) => (
        <div style={{ marginBottom: 20 }} key={q.question}>
          <Title level={2}>
            {i + 1}
            {'. '}
            {q.question}
          </Title>
          <Radio.Group onChange={e => onChange(q.id, e.target.value)} value={answers[q.id]}>
            <Space direction="vertical">
              {q.choices.map(c => (
                <Radio key={`${q.question} ${c}`} value={c}>
                  {c}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>
      ))}

      <Button style={{ marginTop: 20 }} onClick={submit}>
        ส่งคำตอบ
      </Button>
    </div>
  )
}

export default Home
