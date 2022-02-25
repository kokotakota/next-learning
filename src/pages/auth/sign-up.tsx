import { useState } from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"
import { Box, Card, Stack, Typography, TextField, Button, Divider } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import ConfirmEmail from 'components/ConfirmEmail'

interface Inputs {
  email: string
  password: string
  confirmPassword: string
}

export default function SignIn () {
  const [ confirm, setConfirm ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    try {
      // サインアップ処理
      setConfirm(true)
      setLoading(false)
    } catch (e: any) {
      // 登録済みの場合
      if (e.code === 'UsernameExistsException') {
        setError('email', { type: "manual", message: 'すでに登録されているメールアドレスです' })
        setLoading(false)
      } else {
        setLoading(false)
        throw e
      }
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
                会員登録
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
              <TextField
                fullWidth
                type="password"
                label="パスワード(確認)"
                defaultValue=""
                helperText={errors.confirmPassword ? errors.confirmPassword.message : '' }
                error={Boolean(errors.confirmPassword)}
                inputProps={
                  register("confirmPassword", {
                    required: '必須入力です',
                    validate: (v: string) => v === getValues('password') || 'パスワードと一致しません'
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
                会員登録
              </LoadingButton>
              {/* flexコンテナ内ではflexItemを設定する */}
              <Divider flexItem>
                または
              </Divider>
              <Link href="/auth/sign-in" passHref>
                <Button
                  color="primary"
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 10
                  }}
                >
                  ログイン
                </Button>
              </Link>
            </Stack>
          </Card>
        )
      }
    </Box>
  )
}