import { useState } from 'react'
import Router from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form"
import { Box, Card, Stack, Typography, TextField, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { useDispatch } from 'react-redux'
import { userSlice } from 'store/user'

interface Inputs {
  code: string
}

interface Props {
  email: string
  password: string
}

export default function ConfirmEmail ({ email, password }: Props) {
  const [ loading, setLoading ] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors }, setError } = useForm<Inputs>()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)

    try {
      // メールアドレス認証処理
      const user = { id: '0123', name: 'テスト' }
      dispatch(userSlice.actions.setUser(user))
      Router.push('/')
    } catch (e: any) {
      // コードが間違っている場合
      if (e.code === 'CodeMismatchException') {
        setError('code', { type: "manual", message: '認証コードが正しくありません' })
      } else {
        throw e
      }
    } finally {
      setLoading(false)
    }
  }

  const resendConfirmCode = async () => {
    setLoading(true)
    // 認証コード再送信処理
    setLoading(false)
  }

  return (
    <Box
      pt={6}
      display= 'flex'
      justifyContent='center'
    >
    {/* 以下のようにも書ける
    <Box
      sx={{
        display: 'flex',
        justifyContent:'center'
      }}
    > */}
      <Card
        sx={{ width: 350, p: 3 }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Typography variant="h5" component="h2">
            メールアドレス認証
          </Typography>
          <Typography color="text.secondary">
            登録したメールアドレス宛に送信された認証コードを入力してください
          </Typography>
          <TextField
            fullWidth
            label="認証コード"
            defaultValue=""
            helperText={errors.code ? errors.code.message : '' }
            error={Boolean(errors.code)}
            inputProps={
              register("code", {
                required: '必須入力です'
              })
            }
          />
          <LoadingButton
            color="primary"
            loading={loading}
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            認証
          </LoadingButton>
          <LoadingButton
            color="primary"
            loading={loading}
            variant="outlined"
            size="large"
            fullWidth
            sx={{
              mt: 10
            }}
            onClick={resendConfirmCode}
          >
            再送信
          </LoadingButton>
        </Stack>
      </Card>
    </Box>
  )
}