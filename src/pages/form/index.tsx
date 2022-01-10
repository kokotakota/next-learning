import { GetServerSideProps } from "next"
import { useForm } from "react-hook-form"
import { Container, Grid, TextField, Button } from '@mui/material'

interface Props {
  test: string
}

export default function Page ({ test }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <>
      <Grid container spacing={2} sx={{ pt: 2, px: 4 }}>
        <Grid item xs={4}>
          {errors.name?.type}
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="名前"
            defaultValue=""
            helperText={errors.name ? errors.name.message : '' }
            error={Boolean(errors.name)}
            inputProps={register("name", { required: true, maxLength: 20, pattern: /^[0-9]+$/ })}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="電話番号"
            defaultValue=""
            helperText="ヘルパー"
            inputProps={register("phone")}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="年齢"
            defaultValue=""
            helperText="ヘルパー"
            inputProps={register("age")}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            作成
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