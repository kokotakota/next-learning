import { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"
import { Box, Card, Stack, Typography, TextField, Button, Divider } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import ConfirmEmail from 'components/ConfirmEmail'

import { useDispatch } from 'react-redux'
import { userSlice } from 'store/user'

interface Inputs {
  email: string
  password: string
}

export default function SignIn () {
  const [ confirm, setConfirm ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<Inputs>()
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    try {
      // ログイン処理
      const user = { id: '0123', name: 'テスト' }
      dispatch(userSlice.actions.setUser(user))
      Router.push('/')
    } catch (e: any) {
      switch (e.code) {
        // メールアドレスが未認証の場合
        case 'UserNotConfirmedException':
          setConfirm(true)
          break
        // ログインエラー
        case 'NotAuthorizedException':
          alert('IDまたはパスワードが間違っています')
          break
        default:
          throw e
      }
    } finally {
      setLoading(false)
    }
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
    {confirm
        ? (
          <ConfirmEmail email={getValues('email')} password={getValues('password')} />
        )
        : (
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
                ログイン
              </Typography>
              <TextField
                fullWidth
                type="email"
                label="メールアドレス"
                defaultValue=""
                helperText={errors.email ? errors.email.message : '' }
                error={Boolean(errors.email)}
                inputProps={
                  register("email", {
                    required: '必須入力です',
                    pattern: {
                      value: /.+@.+\..+/,
                      message: '正しいメールアドレスを入力してください'
                    }
                  })
                }
              />
              <TextField
                fullWidth
                type="password"
                label="パスワード"
                defaultValue=""
                helperText={errors.password ? errors.password.message : '' }
                error={Boolean(errors.password)}
                inputProps={
                  register("password", {
                    required: '必須入力です',
                    minLength: {
                      value: 8,
                      message: '8文字以上入力してください'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
                      message: '半角英数字と記号のみを入力してください'
                    }
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
                ログイン
              </LoadingButton>
              {/* flexコンテナ内ではflexItemを設定する */}
              <Divider flexItem>
                または
              </Divider>
              <Link href="/auth/sign-up" passHref>
                <Button
                  color="primary"
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 10
                  }}
                >
                  会員登録
                </Button>
              </Link>
            </Stack>
          </Card>
        )
      }
    </Box>
  )
}