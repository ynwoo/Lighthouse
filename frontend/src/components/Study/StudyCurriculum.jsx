import React, { useState } from 'react'
import { Tree, Button, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { studyAction } from '../../store/study'

const { DirectoryTree } = Tree

export default function StudyCurriculum({ study }) {
  const dispatch = useDispatch()
  const [treeData, setTreeData] = useState([
    {
      title: 'parent 0',
      key: '0-0',
      children: [
        {
          title: 'leaf 0-0',
          key: '0-0-0',
          isLeaf: true,
        },
        {
          title: 'leaf 0-1',
          key: '0-0-1',
          isLeaf: true,
        },
      ],
    },
    {
      title: 'parent 1',
      key: '0-1',
      children: [
        {
          title: 'leaf 1-0',
          key: '0-1-0',
          isLeaf: true,
        },
        {
          title: 'leaf 1-1',
          key: '0-1-1',
          isLeaf: true,
        },
      ],
    },
  ])
  const [text, setText] = useState('')

  // const onSelect = (keys, info) => {
  //   console.log('Trigger Select', keys, info)
  // }

  const onExpand = (keys, info) => {
    console.log('Trigger Expand', keys, info)
  }

  const handleAddParent = () => {
    const newNodeKey = `${treeData.length}`
    const newNode = {
      title: 'new parent',
      key: newNodeKey,
      children: [],
    }
    setTreeData([...treeData, newNode])
  }
  const [selectedParentKey, setSelectedParentKey] = useState(null)

  const handleSelect = selectedKeys => {
    setSelectedParentKey(selectedKeys[0])
  }
  const handleAddLeaf = () => {
    if (selectedParentKey === null) {
      return
    }

    const updatedTreeData = treeData.map(item => {
      if (item.key === selectedParentKey) {
        const newNodeKey = `${selectedParentKey}-${item.children.length}`
        const newNode = {
          title: 'new leaf',
          key: newNodeKey,
          isLeaf: true,
        }
        return {
          ...item,
          children: [...(item.children || []), newNode],
        }
      }
      return item
    })
    setTreeData(updatedTreeData)
  }

  const handleDeleteNode = key => {
    const updatedTreeData = treeData
      .map(item => {
        if (item.key === key) {
          return null
        }
        if (item.children) {
          const updatedChildren = item.children.filter(
            child => child.key !== key,
          )
          return {
            ...item,
            children: updatedChildren,
          }
        }
        return item
      })
      .filter(item => item !== null)
    setTreeData(updatedTreeData)
  }

  const handleEditNodeTitle = (key, newTitle) => {
    const updatedTreeData = treeData.map(item => {
      if (item.key === key) {
        return {
          ...item,
          title: newTitle,
        }
      }
      if (item.children) {
        const updatedChildren = item.children.map(child => {
          if (child.key === key) {
            return {
              ...child,
              title: newTitle,
            }
          }
          return child
        })
        return {
          ...item,
          children: updatedChildren,
        }
      }
      return item
    })
    setTreeData(updatedTreeData)
  }

  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <Button
        onClick={() => {
          const data = {
            studyId: study.id,
            title: text,
          }
          dispatch(studyAction.addCurr(data))
        }}
      >
        add Cur
      </Button>
      <Button onClick={handleAddParent}>Add Parent</Button>
      <Button onClick={() => handleAddLeaf('0-0')}>Add Leaf</Button>
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={handleSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
      {/* <Button onClick={handleAddLeaf}>Add Leaf</Button> */}
      <div>
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
      </div>
    </div>
  )
}
