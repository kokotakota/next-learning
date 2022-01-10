import { Grid, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import { CountContext } from 'contexts/count'
import Child from 'components/hook/child'

export default function Page () {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    // 初回レンダー時と更新のたびに呼ばれる
    console.log('test1')
  })

  useEffect(() => {
    // 初回レンダー時とcountが更新されるたびに呼ばれる
    console.log('test2')
  }, [count])

  useEffect(() => {
    // 初回レンダー時のみに呼ばれる
    console.log('test3')
  }, [])

  return (
    <>
      <Grid container spacing={2} sx={{ pt: 2, px: 4 }}>
        <Grid container justifyContent="center" alignItems="center" item>
          counst: {count}
          <Button
            variant="contained"
            size="small"
            /* ボタンのテキストがデフォルトではuppercaseになるため、textTransform: 'none'  */
            sx={{ ml: 2, textTransform: 'none' }}
            onClick={() => setCount(count+1)}
          >
              Count up!
          </Button>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" item>
          <CountContext.Provider value={count}>
            <Child />
          </CountContext.Provider>
        </Grid>
      </Grid>
    </>
  )
}