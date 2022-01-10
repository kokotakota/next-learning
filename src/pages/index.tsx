import { GetServerSideProps } from "next"
import { useForm } from "react-hook-form"
import { Container, Grid, TextField, Stack, Item, Link } from '@mui/material'

interface Props {
  test: string
}

export default function Page ({ test }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <>
      <Grid container spacing={2} sx={{ pt: 2, px: 4 }}>
        <Grid item xs={4} >
          <Link href="form">
            フォーム・バリデーション
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="hook/state">
            hook
          </Link>
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