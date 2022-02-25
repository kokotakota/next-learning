import { GetServerSideProps } from "next"
import { useForm, SubmitHandler } from "react-hook-form"
import { Container, Grid, TextField, Button } from '@mui/material'

interface Props {
  test: string
}

interface Inputs {
  email: string
  password: string
  confirmPassword: string
  name: string
  phone: string
  age: number
}

export default function Page ({ test }: Props) {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <>
      <Grid container spacing={2} sx={{ pt: 2, px: 4 }}>
        <Grid item xs={4}>
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
        </Grid>
        <Grid item xs={4}>
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
        </Grid>
        <Grid item xs={4}>
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
        </Grid>
        <Grid item xs={4}>
          <TextField
          fullWidth
            label="名前"
            defaultValue=""
            helperText={errors.name ? errors.name.message : '' }
            error={Boolean(errors.name)}
            inputProps={
              register("name", {
                required: '必須入力です',
                maxLength: {
                  value: 20,
                  message: '20文字以内で入力してください',
                }
              })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="電話番号"
            defaultValue=""
            helperText={errors.phone ? errors.phone.message : '' }
            error={Boolean(errors.phone)}
            inputProps={
              register("phone", {
                required: '必須入力です',
                pattern: {
                  value: /^[0-9]+$/,
                  message: '数値を入力してください',
                },
              })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="年齢"
            defaultValue=""
            helperText={errors.age ? errors.age.message : '' }
            error={Boolean(errors.age)}
            inputProps={
              register("age", {
                required: '必須入力です',
                pattern: {
                  value: /^[0-9]+$/,
                  message: '整数で入力してください',
                },
                min: {
                  value: 0,
                  message: '0以上の数字を入力してください',
                },
                max: {
                  value: 200,
                  message: '200以下の数字を入力してください',
                }
              })
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ pt: 2, px: 4 }}>
        <Grid item xs={4}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            submit
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }): Promise<{ props: Props }> => {
  return {
    props: {
      test: 'テスト'
    }
  }
}