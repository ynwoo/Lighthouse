import React from 'react'
import { Button, Input, Form, List, Divider } from 'antd'
import { useDispatch } from 'react-redux'
import { studyAction } from '../../store/study'

// const { DirectoryTree } = Tree

export default function StudyCurriculum({ study }) {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const sessions = study.sessions?.toSorted((a, b) => a.seqNum - b.seqNum)
  // const [treeData, setTreeData] = useState([
  //   {
  //     title: 'parent 0',
  //     key: '0-0',
  //     children: [
  //       {
  //         title: 'leaf 0-0',
  //         key: '0-0-0',
  //         isLeaf: true,
  //       },
  //       {
  //         title: 'leaf 0-1',
  //         key: '0-0-1',
  //         isLeaf: true,
  //       },
  //     ],
  //   },
  //   {
  //     title: 'parent 1',
  //     key: '0-1',
  //     children: [
  //       {
  //         title: 'leaf 1-0',
  //         key: '0-1-0',
  //         isLeaf: true,
  //       },
  //       {
  //         title: 'leaf 1-1',
  //         key: '0-1-1',
  //         isLeaf: true,
  //       },
  //     ],
  //   },
  // ])

  // const onSelect = (keys, info) => {
  //   console.log('Trigger Select', keys, info)
  // }

  // const onExpand = (keys, info) => {
  //   console.log('Trigger Expand', keys, info)
  // }

  // const handleAddParent = () => {
  //   const newNodeKey = `${treeData.length}`
  //   const newNode = {
  //     title: 'new parent',
  //     key: newNodeKey,
  //     children: [],
  //   }
  //   setTreeData([...treeData, newNode])
  // }
  // const [selectedParentKey, setSelectedParentKey] = useState(null)

  // const handleSelect = selectedKeys => {
  //   setSelectedParentKey(selectedKeys[0])
  // }
  // const handleAddLeaf = () => {
  //   if (selectedParentKey === null) {
  //     return
  //   }

  //   const updatedTreeData = treeData.map(item => {
  //     if (item.key === selectedParentKey) {
  //       const newNodeKey = `${selectedParentKey}-${item.children.length}`
  //       const newNode = {
  //         title: 'new leaf',
  //         key: newNodeKey,
  //         isLeaf: true,
  //       }
  //       return {
  //         ...item,
  //         children: [...(item.children || []), newNode],
  //       }
  //     }
  //     return item
  //   })
  //   setTreeData(updatedTreeData)
  // }

  // const handleDeleteNode = key => {
  //   const updatedTreeData = treeData
  //     .map(item => {
  //       if (item.key === key) {
  //         return null
  //       }
  //       if (item.children) {
  //         const updatedChildren = item.children.filter(
  //           child => child.key !== key,
  //         )
  //         return {
  //           ...item,
  //           children: updatedChildren,
  //         }
  //       }
  //       return item
  //     })
  //     .filter(item => item !== null)
  //   setTreeData(updatedTreeData)
  // }

  // const handleEditNodeTitle = (key, newTitle) => {
  //   const updatedTreeData = treeData.map(item => {
  //     if (item.key === key) {
  //       return {
  //         ...item,
  //         title: newTitle,
  //       }
  //     }
  //     if (item.children) {
  //       const updatedChildren = item.children.map(child => {
  //         if (child.key === key) {
  //           return {
  //             ...child,
  //             title: newTitle,
  //           }
  //         }
  //         return child
  //       })
  //       return {
  //         ...item,
  //         children: updatedChildren,
  //       }
  //     }
  //     return item
  //   })
  //   setTreeData(updatedTreeData)
  // }

  return (
    <div>
      <Form
        form={form}
        name="register"
        onFinish={values => {
          values.studyId = study.id
          values.status = 0
          values.seqNum = study.sessions?.length
          console.log(values)
          dispatch(studyAction.addCurr(values))
            .unwrap()
            .then(() => {
              alert('새로운 커리큘럼이 등록되었습니다!')
              dispatch(studyAction.studyDetail(study.id))
              form.setFieldsValue({
                title: '',
                description: '',
              })
            })
        }}
      >
        <Form.Item label="title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          add Cur
        </Button>
      </Form>
      <Divider />
      <List
        itemLayout="horizontal"
        dataSource={sessions}
        renderItem={session => (
          <List.Item>
            <List.Item.Meta
              title={session.title}
              description={
                <div>
                  <p style={{ fontSize: '12px' }}>{session.description}</p>
                </div>
              }
            />
            <Button
              onClick={() => {
                dispatch(studyAction.deleteCurr(session.id)).then(() => {
                  alert('커리큘럼이 삭제되었습니다!')
                  dispatch(studyAction.studyDetail(study.id))
                })
              }}
            >
              🗑
            </Button>
          </List.Item>
        )}
      />
      {/* <Button onClick={handleAddParent}>Add Parent</Button>
      <Button onClick={() => handleAddLeaf('0-0')}>Add Leaf</Button>
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={handleSelect}
        onExpand={onExpand}
        treeData={treeData}
      /> */}
      {/* <Button onClick={handleAddLeaf}>Add Leaf</Button> */}
      {/* <div>
        {treeData.map(item => (
          <div key={item.key}>
            <div style={{ display: 'flex' }}>
              {' '}
              <Input
                value={item.title}
                onChange={e => handleEditNodeTitle(item.key, e.target.value)}
              />
              <Button onClick={() => handleDeleteNode(item.key)}>Delete</Button>
            </div>

            {item.children &&
              item.children.map(child => (
                <div key={child.key}>
                  <div style={{ display: 'flex' }}>
                    <Input
                      value={child.title}
                      onChange={e =>
                        handleEditNodeTitle(child.key, e.target.value)
                      }
                    />
                    <Button onClick={() => handleDeleteNode(child.key)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div> */}
    </div>
  )
}
